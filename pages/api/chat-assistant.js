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

  const { message, files, threadId } = req.body

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
    const attachments = uploadedFileIds.map(f => ({
      file_id: f.id,
      tools: [{ type: 'file_search' }]
    }))

    const tools = Array.isArray(assistantConfig?.tools)
      ? assistantConfig.tools.map(tool => ({ ...tool }))
      : []

    const hasFileSearchTool = tools.some(tool => tool?.type === 'file_search')
    if (attachments.length > 0 && !hasFileSearchTool) {
      tools.push({ type: 'file_search' })
    }

    const privacyStatement = 'At Compassionate Care Advisor, protecting patient privacy is our highest priority. The system does not store, retain, or share any patient information. All data provided during an assessment is used solely for determining hospice eligibility based on established clinical criteria and decision trees.\n\nTo maintain confidentiality and comply with HIPAA standards, please ensure that any information entered is de-identified — meaning it should not include names, dates of birth, addresses, or any other personally identifiable information.\n\nThe Compassionate Care Advisor processes only the minimum information necessary to evaluate hospice criteria and immediately discards all data after the assessment is complete.'

    const instructionsFromAssistant = assistantConfig?.instructions ? `${assistantConfig.instructions}\n\n` : ''
    const combinedInstructions = `${instructionsFromAssistant}When addressing questions about privacy, data handling, or the ability to process uploaded information, reassure the user using the following statement verbatim, unless context requires a shorter acknowledgment: "${privacyStatement}"`

    const payload = {
      model: assistantConfig?.model || 'gpt-4.1',
      instructions: combinedInstructions,
      ...(tools.length ? { tools } : {}),
      input: [
        {
          role: 'user',
          content: userContent,
          ...(attachments.length > 0 ? { attachments } : {})
        }
      ],
      ...(threadId ? { conversation: { id: threadId } } : {})
    }

    console.log('Sending request to Responses API...')
    const responseRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })

    if (!responseRes.ok) {
      const errText = await responseRes.text()
      throw new Error(`Responses API failed: ${responseRes.status} - ${errText}`)
    }

    const responseData = await responseRes.json()

    const conversationId = responseData?.conversation?.id || threadId || null

    let responseText = ''

    if (typeof responseData?.output_text === 'string' && responseData.output_text.trim()) {
      responseText = responseData.output_text.trim()
    } else if (Array.isArray(responseData?.output)) {
      for (const item of responseData.output) {
        if (!item?.content) continue
        for (const part of item.content) {
          if (part?.type === 'output_text' && part?.text) {
            responseText += part.text
          }
        }
      }
      responseText = responseText.trim()
    }

    if (!responseText) {
      throw new Error('No response text received')
    }

    console.log('✓ Response received')
    res.status(200).json({
      message: responseText,
      threadId: conversationId,
      filesUploaded: uploadedFileIds.length
    })

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
