// pages/api/chat-assistant.js
// OpenAI Assistants API with proper file upload support for PDFs and documents

const ASSISTANT_ID = 'asst_PnRjwOpCl1o6LGSQnQeEejs5'

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
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v2',
      'Content-Type': 'application/json'
    }

    const userContent = [{ type: 'input_text', text: message }]
    const attachments = uploadedFileIds.map(f => ({
      file_id: f.id,
      tools: [{ type: 'file_search' }]
    }))

    const payload = {
      model: ASSISTANT_ID,
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
    if (Array.isArray(responseData?.output)) {
      for (const item of responseData.output) {
        if (!item?.content) continue
        for (const part of item.content) {
          if (part?.type === 'output_text' && part?.text) {
            responseText += part.text
          }
        }
      }
    }

    responseText = responseText.trim()

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
