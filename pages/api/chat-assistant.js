// pages/api/chat-assistant.js
// OpenAI Assistants API with proper file upload support for PDFs and documents

const ASSISTANT_ID = 'asst_PnRjwOpCl1o6LGSQnQeEejs5'

let cachedAssistantConfig = null
let assistantFetchPromise = null

async function loadAssistantConfig(apiKey) {
  if (!ASSISTANT_ID) {
    return null
  }

  if (cachedAssistantConfig) {
    return cachedAssistantConfig
  }

  if (!assistantFetchPromise) {
    assistantFetchPromise = (async () => {
      try {
        const res = await fetch(`https://api.openai.com/v1/assistants/${ASSISTANT_ID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2'
          }
        })

        if (!res.ok) {
          const errText = await res.text()
          throw new Error(`Failed to retrieve assistant config: ${res.status} - ${errText}`)
        }

        const data = await res.json()
        cachedAssistantConfig = {
          model: data?.model || null,
          instructions: data?.instructions || null,
          tools: Array.isArray(data?.tools) ? data.tools : []
        }

        return cachedAssistantConfig
      } catch (err) {
        console.warn('Unable to load assistant configuration:', err.message)
        throw err
      } finally {
        assistantFetchPromise = null
      }
    })()
  }

  try {
    return await assistantFetchPromise
  } catch (_err) {
    return null
  }
}

function base64ToBuffer(base64String) {
  const base64Data = base64String.includes(',') 
    ? base64String.split(',')[1] 
    : base64String
  return Buffer.from(base64Data, 'base64')
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, files, threadId, fileIds: existingFileIdsRaw } = req.body

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required and must be a non-empty string' })
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('Missing OPENAI_API_KEY')
      return res.status(500).json({ error: 'API key not configured' })
    }

  // Upload files if present (PDFs, images, etc.)
  const uploadedFileIds = []

    if (files && files.length > 0) {
      console.log(`Uploading ${files.length} files...`)

      for (const file of files) {
        try {
          if (!file.isPDF && !file.isImage) {
            console.log(`Skipping non-PDF/image file: ${file.name}`)
            continue
          }

          console.log(`Uploading ${file.name}...`)

          const fileBuffer = base64ToBuffer(file.content)

          // Create multipart form data manually
          const boundary = '----FormBoundary' + Date.now()
          let body = ''

          body += `--${boundary}\r\n`
          body += `Content-Disposition: form-data; name="purpose"\r\n\r\n`
          body += `assistants\r\n`

          body += `--${boundary}\r\n`
          body += `Content-Disposition: form-data; name="file"; filename="${file.name}"\r\n`
          body += `Content-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`

          const bodyStart = Buffer.from(body)
          const bodyEnd = Buffer.from(`\r\n--${boundary}--\r\n`)
          const fullBody = Buffer.concat([bodyStart, fileBuffer, bodyEnd])

          const uploadRes = await fetch('https://api.openai.com/v1/files', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': `multipart/form-data; boundary=${boundary}`
            },
            body: fullBody
          })

          if (!uploadRes.ok) {
            const errText = await uploadRes.text()
            console.warn(`Upload failed for ${file.name}: ${uploadRes.status} - ${errText}`)
            continue
          }

          const uploadedFile = await uploadRes.json()
          if (uploadedFile.id) {
            uploadedFileIds.push({
              id: uploadedFile.id,
              name: file.name
            })
            console.log(`✓ Uploaded: ${file.name} (ID: ${uploadedFile.id})`)
          }
        } catch (err) {
          console.warn(`Error uploading ${file.name}:`, err.message)
        }
      }

      console.log(`Successfully uploaded ${uploadedFileIds.length} files`)
    }

    // Build Responses API payload to mimic ChatGPT behaviour
    const assistantConfig = await loadAssistantConfig(apiKey)

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    }

    const userContent = [{ type: 'input_text', text: message }]

    const assistantTools = Array.isArray(assistantConfig?.tools)
      ? assistantConfig.tools.map(tool => ({ ...tool }))
      : []

    // Sanitize file_search tools: the Responses API requires vector_store_ids. If the assistant
    // configuration lacks them, drop the tool entirely to avoid 400 errors. We'll reformat the
    // tool if vector_store_ids live under the nested file_search object.
    const tools = assistantTools.reduce((acc, rawTool) => {
      if (!rawTool || typeof rawTool !== 'object') {
        return acc
      }

      if (rawTool.type !== 'file_search') {
        acc.push(rawTool)
        return acc
      }

      const vectorIds = Array.isArray(rawTool.vector_store_ids)
        ? rawTool.vector_store_ids
        : Array.isArray(rawTool?.file_search?.vector_store_ids)
          ? rawTool.file_search.vector_store_ids
          : []

      if (vectorIds.length === 0) {
        console.warn('Dropping assistant file_search tool without vector_store_ids to prevent API errors')
        return acc
      }

      const { file_search: _legacyConfig, ...rest } = rawTool

      const sanitized = {
        type: 'file_search',
        vector_store_ids: vectorIds,
        ...rest
      }

      acc.push(sanitized)
      return acc
    }, [])

    const incomingFileIds = Array.isArray(existingFileIdsRaw)
      ? existingFileIdsRaw
          .filter((id) => typeof id === 'string' && id.trim().length > 0)
          .map((id) => id.trim())
      : []

    const newFileIds = uploadedFileIds.map((file) => file.id)
    const allFileIds = Array.from(new Set([...incomingFileIds, ...newFileIds]))

    if (allFileIds.length > 0) {
      for (const fileId of allFileIds) {
        userContent.push({ type: 'input_file', file_id: fileId })
      }
    }

    const privacyStatement = 'At Compassionate Care Advisor, protecting patient privacy is our highest priority. The system does not store, retain, or share any patient information. All data provided during an assessment is used solely for determining hospice eligibility based on established clinical criteria and decision trees.\n\nTo maintain confidentiality and comply with HIPAA standards, please ensure that any information entered is de-identified — meaning it should not include names, dates of birth, addresses, or any other personally identifiable information.\n\nThe Compassionate Care Advisor processes only the minimum information necessary to evaluate hospice criteria and immediately discards all data after the assessment is complete.'

  const instructionsFromAssistant = assistantConfig?.instructions ? `${assistantConfig.instructions}\n\n` : ''

  const hospiceGuidance = `Always act as the Compassionate Care Advisor. When a user uploads clinical PDFs or images, you must:

1. Read the entire document set. Reference key evidence with page numbers in the format (p. X) or (pp. X–Y).
2. Capture objective data in a "Key Clinical Findings" section. Include diagnoses, recent hospital course, vitals, weight trends, labs (INR, albumin, creatinine, bilirubin, etc.), symptoms, ascites/paracenteses, encephalopathy, infections, and any specialist notes. If data are missing, state "Not reported".
3. Produce a "Hospice Eligibility Review" that maps the findings against disease-specific CMS criteria (liver, cardiac, pulmonary, renal, neuro, malignancy, HIV) and secondary domains (Palliative Performance Scale, ADLs, nutritional decline, co-morbid burden, psychosocial factors). Explicitly call out each criterion that is satisfied.
4. Include a "Documentation Quality & Gaps" section noting missing key labs, consults, or imaging that would strengthen the record.
5. Finish with a "Conclusion" that clearly states whether the patient meets hospice eligibility, how urgent the referral is, and recommended next steps for the care team.
6. Bring in relevant context from the Compassionate Care Advisor knowledge base (clinical guidelines, regulatory expectations, best practices) to justify the assessment when appropriate.
7. If the files cannot be processed or lack sufficient data, say so plainly and request the specific items needed (e.g., updated labs, PPS score, imaging).

Use the following response structure unless the user explicitly requests a different format:
- Start with a single line status banner using emojis exactly as follows:
  - "✅ Hospice Eligibility Determination: MET" when criteria are satisfied.
  - "⚠️ Hospice Eligibility Determination: UNCERTAIN" when evidence is incomplete or borderline.
  - "❌ Hospice Eligibility Determination: NOT MET" when criteria are not satisfied.
- Provide sections in this order with level-two Markdown headings (e.g., "## Primary Criteria"). Within each section use bullet lists that mirror ChatGPT formatting with clear parenthetical notes for thresholds, and indent sub-bullets with two spaces for clarity.
  1. Primary Criteria (disease-specific checkpoints and whether each threshold is met).
  2. Secondary Criteria (supporting disease findings such as ascites, encephalopathy, etc.).
  3. Supportive Prognostic Indicators (nutrition, PPS, ADLs, clinical trajectory). Include values and explicit statements when criteria are not met or "Not reported".
  4. Comorbid Conditions (bullet list summarizing relevant diagnoses influencing prognosis).
  5. Documentation Quality & Gaps (bullet list of missing data, recommended records to obtain).
  6. Conclusion & Recommendations (succinct next steps, referral urgency, family communication guidance).
- Use horizontal dividers of three dashes ("---") between major sections to mimic ChatGPT-style separators.
- Retain concise, evidence-linked sentences. When citing evidence from files, append references like (p. 4) at the end of the bullet.

Keep the tone clinical yet compassionate. Avoid hedging language unless the evidence is incomplete. Do not repeat disclaimers unless the user asks about privacy.`

  const combinedInstructions = `${instructionsFromAssistant}${hospiceGuidance}\n\nWhen addressing questions about privacy, data handling, or the ability to process uploaded information, reassure the user using the following statement verbatim, unless context requires a shorter acknowledgment: "${privacyStatement}"`

    const payload = {
      model: assistantConfig?.model || 'gpt-4.1',
      instructions: combinedInstructions,
      ...(tools.length ? { tools } : {}),
      input: [
        {
          role: 'user',
          content: userContent
        }
      ],
  ...(threadId ? { conversation: { id: threadId } } : {})
    }

    payload.stream = true

    console.log('Responses payload tools:', JSON.stringify(tools))

    console.log('Sending request to Responses API...')

    const abortController = new AbortController()
    req.on('aborted', () => {
      abortController.abort()
    })

    const responseRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        ...headers,
        Accept: 'text/event-stream'
      },
      body: JSON.stringify(payload),
      signal: abortController.signal
    })

    if (!responseRes.ok) {
      const errText = await responseRes.text()
      throw new Error(`Responses API failed: ${responseRes.status} - ${errText}`)
    }

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')

    if (typeof res.flushHeaders === 'function') {
      res.flushHeaders()
    }

    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`)
      if (typeof res.flush === 'function') {
        res.flush()
      }
    }

    const reader = responseRes.body?.getReader()
    if (!reader) {
      throw new Error('Unable to read streaming response from OpenAI')
    }

    const decoder = new TextDecoder('utf-8')
    let buffer = ''
    let conversationId = threadId || null
    let streamErrored = false

    try {
      let done = false
      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (readerDone) {
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split('\n\n')
        buffer = events.pop() || ''

        for (const event of events) {
          const trimmed = event.trim()
          if (!trimmed.startsWith('data:')) {
            continue
          }

          const dataStr = trimmed.replace(/^data:\s*/, '')

          if (!dataStr) {
            continue
          }

          if (dataStr === '[DONE]') {
            done = true
            break
          }

          try {
            const parsed = JSON.parse(dataStr)

            switch (parsed.event) {
              case 'response.output_text.delta': {
                const delta = parsed.data?.delta || ''
                if (delta) {
                  sendEvent({ event: 'delta', textDelta: delta })
                }
                break
              }
              case 'response.completed': {
                conversationId = parsed.data?.response?.conversation_id || conversationId
                break
              }
              case 'response.refusal.delta': {
                const refusalText = parsed.data?.delta || ''
                if (refusalText) {
                  sendEvent({ event: 'delta', textDelta: refusalText })
                }
                break
              }
              case 'response.error': {
                const errMessage = parsed.data?.error?.message || 'Assistant returned an error.'
                sendEvent({ event: 'error', error: errMessage })
                done = true
                break
              }
              case 'response.output_text.done':
              case 'response.created':
              case 'response.model.delta':
              case 'response.model.done':
              case 'ping':
                // Ignore non-text events
                break
              default:
                break
            }
          } catch (parseErr) {
            console.warn('Failed to parse Assistants stream event:', parseErr)
          }
        }
      }
    } catch (relayError) {
      streamErrored = true
      console.error('Stream relay error:', relayError)
      sendEvent({ event: 'error', error: relayError?.message || 'Stream relay failed.' })
    } finally {
      if (!streamErrored) {
        const metaPayload = {
          event: 'meta',
          threadId: conversationId || threadId || null,
          filesUploaded: uploadedFileIds.length
        }

        if (allFileIds.length > 0) {
          metaPayload.fileIds = allFileIds
        }

        sendEvent(metaPayload)
      }

      res.write('data: [DONE]\n\n')
      res.end()
    }

    return

  } catch (error) {
    console.error('ERROR:', error.message)
    res.status(500).json({
      error: error.message || 'Unknown error',
      message: 'Sorry, I encountered an error. Please try again.'
    })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb'
    }
  }
}
