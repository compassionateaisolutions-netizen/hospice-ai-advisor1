// pages/api/chat-assistant.js
// Uses OpenAI Assistants API with file uploads

const ASSISTANT_ID = 'asst_PnRjwOpCl1o6LGSQnQeEejs5'

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { message, files, threadId } = req.body

  // Input validation
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'Invalid message format' })
  }

  if (message.length > 4000) {
    return res.status(400).json({ message: 'Message too long. Please keep it under 4000 characters.' })
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        message: 'API configuration error. Please check server settings.'
      })
    }

    const apiKey = process.env.OPENAI_API_KEY
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v2'
    }

    let thread_id = threadId

    // Create a new thread if one doesn't exist
    if (!thread_id) {
      const threadResponse = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })

      if (!threadResponse.ok) {
        throw new Error(`Failed to create thread: ${threadResponse.status}`)
      }

      const threadData = await threadResponse.json()
      thread_id = threadData.id
    }

    // Upload files if present and get file IDs
    const uploadedFileIds = []
    
    if (files && files.length > 0) {
      console.log(`Uploading ${files.length} files...`)
      
      for (const file of files) {
        if (file.isPDF && file.content) {
          try {
            // Convert base64 to binary
            const base64Data = file.content.split(',')[1] || file.content
            const binaryBuffer = Buffer.from(base64Data, 'base64')
            
            // Create FormData equivalent using string boundary
            const boundary = '----WebKitFormBoundary' + Math.random().toString(16).slice(2)
            const multipartBody = 
              `--${boundary}\r\n` +
              `Content-Disposition: form-data; name="purpose"\r\n\r\n` +
              `assistants\r\n` +
              `--${boundary}\r\n` +
              `Content-Disposition: form-data; name="file"; filename="${file.name}"\r\n` +
              `Content-Type: application/pdf\r\n\r\n`
            
            const bodyStart = Buffer.from(multipartBody)
            const bodyEnd = Buffer.from(`\r\n--${boundary}--\r\n`)
            const fullBody = Buffer.concat([bodyStart, binaryBuffer, bodyEnd])
            
            const uploadResponse = await fetch('https://api.openai.com/v1/files', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': `multipart/form-data; boundary=${boundary}`
              },
              body: fullBody
            })
            
            if (!uploadResponse.ok) {
              const errorText = await uploadResponse.text()
              console.warn(`Failed to upload ${file.name}:`, errorText)
              continue
            }
            
            const uploadedFile = await uploadResponse.json()
            if (uploadedFile.id) {
              uploadedFileIds.push({
                id: uploadedFile.id,
                name: file.name
              })
              console.log(`Successfully uploaded: ${file.name} (ID: ${uploadedFile.id})`)
            }
          } catch (uploadError) {
            console.warn(`Error uploading ${file.name}:`, uploadError.message)
          }
        }
      }
    }

    // Build message content with images and file references
    const messageContent = [
      {
        type: 'text',
        text: message
      }
    ]

    // Add images if present
    if (files && files.length > 0) {
      const imageFiles = files.filter(f => f.isImage)
      imageFiles.forEach(file => {
        if (file.content) {
          messageContent.push({
            type: 'image_url',
            image_url: {
              url: file.content
            }
          })
        }
      })
    }

    // Build message payload with file attachments
    const messagePayload = {
      role: 'user',
      content: messageContent
    }

    // Add file attachments if any were uploaded
    if (uploadedFileIds.length > 0) {
      messagePayload.attachments = uploadedFileIds.map(file => ({
        file_id: file.id,
        tools: [{ type: 'file_search' }]
      }))
      console.log(`Attaching ${uploadedFileIds.length} files to message`)
    }

    // Post message to thread
    const addMessageResponse = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/messages`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messagePayload)
      }
    )

    if (!addMessageResponse.ok) {
      const errorText = await addMessageResponse.text()
      throw new Error(`Failed to add message: ${addMessageResponse.status} - ${errorText}`)
    }

    console.log('Message added to thread')

    // Run the assistant with file search enabled
    const runResponse = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/runs`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID
        })
      }
    )

    if (!runResponse.ok) {
      const errorText = await runResponse.text()
      throw new Error(`Failed to run assistant: ${runResponse.status} - ${errorText}`)
    }

    const runData = await runResponse.json()
    const runId = runData.id
    console.log(`Assistant run started: ${runId}`)

    // Poll for completion
    let completed = false
    let assistantMessage = ''
    let attempts = 0
    const maxAttempts = 240 // 120 seconds with 500ms intervals (increased for file processing)

    while (!completed && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 500))

      const statusResponse = await fetch(
        `https://api.openai.com/v1/threads/${thread_id}/runs/${runId}`,
        {
          method: 'GET',
          headers
        }
      )

      if (!statusResponse.ok) {
        throw new Error(`Failed to check run status: ${statusResponse.status}`)
      }

      const statusData = await statusResponse.json()
      console.log(`Run status: ${statusData.status}`)

      if (statusData.status === 'completed') {
        completed = true

        // Get messages from thread
        const messagesResponse = await fetch(
          `https://api.openai.com/v1/threads/${thread_id}/messages?limit=1`,
          {
            method: 'GET',
            headers
          }
        )

        if (!messagesResponse.ok) {
          throw new Error(`Failed to get messages: ${messagesResponse.status}`)
        }

        const messagesData = await messagesResponse.json()
        const lastMessage = messagesData.data[0]

        if (lastMessage.content && lastMessage.content.length > 0) {
          const textContent = lastMessage.content.find(c => c.type === 'text')
          if (textContent) {
            assistantMessage = typeof textContent.text === 'string' 
              ? textContent.text 
              : textContent.text?.value || textContent.text
          }
        }
      } else if (statusData.status === 'failed' || statusData.status === 'cancelled') {
        throw new Error(`Assistant run ${statusData.status}: ${JSON.stringify(statusData.last_error)}`)
      }

      attempts++
    }

    if (!completed) {
      throw new Error('Assistant response timeout - request took too long')
    }

    if (!assistantMessage) {
      throw new Error('No response from assistant')
    }

    res.status(200).json({
      message: assistantMessage,
      threadId: thread_id
    })
  } catch (error) {
    console.error('Assistant API Error:', error.message)
    res.status(500).json({
      message: 'Sorry, I encountered an error. Please try again.',
      error: error.message
    })
  }
}
