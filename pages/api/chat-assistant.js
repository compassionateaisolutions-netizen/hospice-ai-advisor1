// pages/api/chat-assistant.js
// Uses OpenAI Assistants API to run your custom GPT directly on your website

const ASSISTANT_ID = 'asst_PnRjwOpCl1o6LGSQnQeEejs5'

// Polyfill fetch for Node.js if not available
if (!globalThis.fetch) {
  const nodeFetch = require('node-fetch')
  globalThis.fetch = nodeFetch
}

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
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    }

    let thread_id = threadId

    // Create a new thread if one doesn't exist
    if (!thread_id) {
      const threadResponse = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers,
        body: JSON.stringify({})
      })

      if (!threadResponse.ok) {
        throw new Error(`Failed to create thread: ${threadResponse.status}`)
      }

      const threadData = await threadResponse.json()
      thread_id = threadData.id
    }

    // Add message to thread
    const messageContent = [
      {
        type: 'text',
        text: message
      }
    ]

    // Add images if present
    if (files && files.length > 0) {
      const imageFiles = files.filter(f => f.isImage)
      const pdfFiles = files.filter(f => f.isPDF)

      // Add image data to message
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

      // Add PDF info as text
      if (pdfFiles.length > 0) {
        messageContent.push({
          type: 'text',
          text: `\n\nUploaded PDF files: ${pdfFiles.map(f => f.name).join(', ')}`
        })
      }
    }

    // Post message to thread
    const addMessageResponse = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/messages`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          role: 'user',
          content: messageContent
        })
      }
    )

    if (!addMessageResponse.ok) {
      throw new Error(`Failed to add message: ${addMessageResponse.status}`)
    }

    // Run the assistant
    const runResponse = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/runs`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID,
          model: 'gpt-4-turbo' // Use the model your assistant uses
        })
      }
    )

    if (!runResponse.ok) {
      throw new Error(`Failed to run assistant: ${runResponse.status}`)
    }

    const runData = await runResponse.json()
    const runId = runData.id

    // Poll for completion (with timeout)
    let completed = false
    let assistantMessage = ''
    let attempts = 0
    const maxAttempts = 120 // 60 seconds with 500ms intervals

    while (!completed && attempts < maxAttempts) {
      // Wait a bit before checking
      await new Promise(resolve => setTimeout(resolve, 500))

      // Check run status
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

        // Extract text content
        if (lastMessage.content && lastMessage.content.length > 0) {
          const textContent = lastMessage.content.find(c => c.type === 'text')
          if (textContent) {
            // Extract just the text value, not the whole object
            assistantMessage = typeof textContent.text === 'string' ? textContent.text : textContent.text?.value || textContent.text
          }
        }
      } else if (statusData.status === 'failed' || statusData.status === 'cancelled') {
        throw new Error(`Assistant run ${statusData.status}`)
      }

      attempts++
    }

    if (!completed) {
      throw new Error('Assistant response timeout')
    }

    if (!assistantMessage) {
      throw new Error('No response from assistant')
    }

    // Return response with thread ID for conversation continuity
    res.status(200).json({
      message: assistantMessage,
      threadId: thread_id
    })
  } catch (error) {
    console.error('Assistant API Error:', error)
    res.status(500).json({
      message: 'Sorry, I encountered an error. Please try again.',
      error: error.message
    })
  }
}
