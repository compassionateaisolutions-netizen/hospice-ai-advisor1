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

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message' })
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('Missing OPENAI_API_KEY')
      return res.status(500).json({ error: 'API key not configured' })
    }

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v2'
    }

    let thread_id = threadId

    // Step 1: Create thread if needed
    if (!thread_id) {
      console.log('Creating new thread...')
      const threadRes = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })

      if (!threadRes.ok) {
        const err = await threadRes.text()
        throw new Error(`Thread creation failed: ${threadRes.status} - ${err}`)
      }

      const threadData = await threadRes.json()
      thread_id = threadData.id
      console.log('Thread created:', thread_id)
    }

    // Step 2: Upload files if present (PDFs, images, etc.)
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

    // Step 3: Add message to thread with file attachments
    console.log('Adding message to thread...')

    const messagePayload = {
      role: 'user',
      content: message
    }

    if (uploadedFileIds.length > 0) {
      messagePayload.attachments = uploadedFileIds.map(f => ({
        file_id: f.id,
        tools: [{ type: 'file_search' }]
      }))
      console.log(`Attaching ${uploadedFileIds.length} files to message`)
    }

    const msgRes = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/messages`,
      {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(messagePayload)
      }
    )

    if (!msgRes.ok) {
      const err = await msgRes.text()
      throw new Error(`Message failed: ${msgRes.status} - ${err}`)
    }

    console.log('Message added')

    // Step 4: Run assistant
    console.log('Running assistant...')
    const runRes = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/runs`,
      {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID,
          tools: [{ type: 'file_search' }]
        })
      }
    )

    if (!runRes.ok) {
      const err = await runRes.text()
      throw new Error(`Run failed: ${runRes.status} - ${err}`)
    }

    const runData = await runRes.json()
    const run_id = runData.id
    console.log('Run started:', run_id)

    // Step 5: Poll for completion (longer timeout for file processing)
    console.log('Polling for response...')
    let completed = false
    let attempts = 0
    const maxAttempts = 300 // 150 seconds for large files

    while (!completed && attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 500))

      const statusRes = await fetch(
        `https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`,
        { method: 'GET', headers: { ...headers, 'Content-Type': 'application/json' } }
      )

      if (!statusRes.ok) {
        throw new Error(`Status check failed: ${statusRes.status}`)
      }

      const statusData = await statusRes.json()

      if (statusData.status === 'completed') {
        completed = true
        console.log('✓ Run completed')
      } else if (statusData.status === 'failed' || statusData.status === 'cancelled') {
        throw new Error(`Run ${statusData.status}`)
      }

      attempts++
    }

    if (!completed) {
      throw new Error('Response timeout')
    }

    // Step 6: Get response
    console.log('Fetching response...')
    const msgsRes = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/messages?limit=1`,
      { method: 'GET', headers: { ...headers, 'Content-Type': 'application/json' } }
    )

    if (!msgsRes.ok) {
      throw new Error(`Messages fetch failed: ${msgsRes.status}`)
    }

    const msgsData = await msgsRes.json()
    const lastMsg = msgsData.data[0]

    let responseText = ''
    if (lastMsg?.content?.[0]?.type === 'text') {
      responseText = lastMsg.content[0].text.value || lastMsg.content[0].text
    }

    if (!responseText) {
      throw new Error('No response text received')
    }

    console.log('✓ Response received')
    res.status(200).json({
      message: responseText,
      threadId: thread_id,
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
