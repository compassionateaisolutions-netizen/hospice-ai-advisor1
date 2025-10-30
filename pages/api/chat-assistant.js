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
        const errorData = await threadResponse.text()
        throw new Error(`Failed to create thread: ${threadResponse.status} - ${errorData}`)
      }

      const threadData = await threadResponse.json()
      thread_id = threadData.id
      console.log(`Created thread: ${thread_id}`)
    }

    // Build message content
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

    // Prepare message payload
    const messagePayload = {
      role: 'user',
      content: messageContent
    }

    console.log(`Sending message to thread ${thread_id}`)

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
      const errorData = await addMessageResponse.text()
      throw new Error(`Failed to add message: ${addMessageResponse.status} - ${errorData}`)
    }

    console.log('Message added successfully')

    // Run the assistant
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
      const errorData = await runResponse.text()
      throw new Error(`Failed to run assistant: ${runResponse.status} - ${errorData}`)
    }

    const runData = await runResponse.json()
    const runId = runData.id
    console.log(`Assistant run started: ${runId}`)

    // Poll for completion
    let completed = false
    let assistantMessage = ''
    let attempts = 0
    const maxAttempts = 240 // 120 seconds with 500ms intervals

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

      if (statusData.status === 'completed') {
        completed = true
        console.log('Run completed')

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
        throw new Error(`Assistant run ${statusData.status}: ${JSON.stringify(statusData.last_error || {})}`)
      }

      attempts++
    }

    if (!completed) {
      throw new Error('Assistant response timeout')
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
    console.error('Full error:', error)
    
    res.status(500).json({
      message: 'Sorry, I encountered an error. Please try again.',
      error: error.message
    })
  }
}
