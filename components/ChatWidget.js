import { useState, useRef, useEffect } from 'react'

function ChatBubble({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Open chat" className="fixed right-6 bottom-6 bg-indigo-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-indigo-700">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 3.866-4.03 7-9 7-1.02 0-1.99-.105-2.9-.304L3 21l1.304-5.1A9.954 9.954 0 013 12c0-3.866 4.03-7 9-7s9 3.134 9 7z" />
      </svg>
    </button>
  )
}

export default function ChatWidget({ embedded = false }) {
  const [open, setOpen] = useState(embedded) // Start open if embedded
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "👋 Hi! I'm the Compassionate Care Advisor.\n\nI use AI to help hospice providers identify patient eligibility, forecast future qualification, and ensure the right care at the right time.\n\nYou can also upload PDFs and images for analysis!\n\nHow can I help you today?" }
  ])
  const [input, setInput] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const endRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    // Only scroll within the chat container, not the whole page
    if (endRef.current) {
      const chatContainer = endRef.current.closest('#chat-window')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }
  }, [messages])

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files)
    const validFiles = files.filter(file => {
      const isValidType = file.type.includes('pdf') || file.type.includes('image')
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB limit
      return isValidType && isValidSize
    })

    if (validFiles.length === 0) {
      alert('Please upload valid PDF or image files under 10MB')
      return
    }

    setIsUploading(true)
    
    try {
      // Process each file and extract actual content
      const filePromises = validFiles.map(async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = async (e) => {
            const result = e.target.result
            
            if (file.type.includes('image')) {
              // For images, send base64 data for GPT-4V analysis
              resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                content: result, // base64 data URL
                isImage: true
              })
            } else if (file.type.includes('pdf')) {
              // For PDFs, we'll send the base64 and let the API handle extraction
              resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                content: result, // base64 data URL
                isPDF: true
              })
            }
          }
          reader.readAsDataURL(file)
        })
      })

      const uploadedFileData = await Promise.all(filePromises)
      setUploadedFiles(prev => [...prev, ...uploadedFileData])
      
      // Create analysis message with actual file content
      const fileAnalysisMessage = `I have uploaded ${uploadedFileData.length} file(s) for hospice eligibility analysis: ${uploadedFileData.map(f => f.name).join(', ')}. Please provide a comprehensive hospice eligibility assessment based on the actual content of these documents, including specific clinical indicators, documentation quality, and CMS compliance evaluation.`
      
      // Add user message
      const fileMessage = {
        id: Date.now(),
        from: 'user',
        text: fileAnalysisMessage,
        files: uploadedFileData
      }
      
      setMessages(prev => [...prev, fileMessage])
      
      // Send for analysis with actual file content
      await send(fileAnalysisMessage, uploadedFileData)
      
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload files. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadedFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeFile = (fileIndex) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== fileIndex))
  }

  const send = async (messageText = null, fileData = null) => {
    const actualMessage = messageText || input
    const actualFiles = fileData || (uploadedFiles.length > 0 ? [...uploadedFiles] : undefined)
    
    if (!actualMessage.trim() && !actualFiles) return
    
    // Only add user message if it's a manual send (not automatic from file upload)
    if (!messageText) {
      const userMsg = { 
        id: Date.now(), 
        from: 'user', 
        text: actualMessage || 'Analyzing uploaded files...',
        files: actualFiles
      }
      setMessages((m) => [...m, userMsg])
      setInput('')
      setUploadedFiles([])
    }

    try {
      // Call the API endpoint with both text and files
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: actualMessage,
          files: actualFiles 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setMessages((m) => [...m, { 
        id: Date.now() + 1, 
        from: 'bot', 
        text: data.message 
      }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((m) => [...m, { 
        id: Date.now() + 1, 
        from: 'bot', 
        text: 'Sorry, I encountered an error. Please try again.' 
      }])
    }
  }

  return (
    <div>
      {!embedded && !open && <ChatBubble onClick={() => setOpen(true)} />}

      {(open || embedded) && (
        <div className={embedded 
          ? "w-full bg-white flex flex-col" 
          : "fixed right-6 bottom-6 w-80 md:w-96 bg-white border rounded-lg shadow-lg flex flex-col overflow-hidden z-50"
        }>
          {!embedded && (
            <div className="flex items-center justify-between px-4 py-3 bg-indigo-600 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center font-semibold">CA</div>
                <div>
                  <div className="font-semibold">Hospice AI Advisor</div>
                  <div className="text-xs opacity-80">Ask me about fraud reduction & eligibility</div>
                </div>
              </div>
              <div>
                <button onClick={() => setOpen(false)} className="text-white/90 hover:text-white">✕</button>
              </div>
            </div>
          )}

          <div className={`p-4 overflow-y-auto ${embedded ? 'h-96' : 'h-64'}`} id="chat-window">
            {messages.map((m) => (
              <div key={m.id} className={`mb-3 flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.from === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'} max-w-[80%] p-3 rounded-lg`}>
                  <div>{m.text}</div>
                  {m.files && m.files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {m.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs opacity-80">
                          <span>📎</span>
                          <span>{file.name}</span>
                          <span>({(file.size / 1024).toFixed(1)}KB)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-4 border-t bg-gray-50">
            {/* File Upload Area */}
            {uploadedFiles.length > 0 && (
              <div className="mb-3 p-2 bg-gray-100 rounded-lg">
                <div className="text-xs text-gray-600 mb-2">Uploaded files:</div>
                <div className="space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <span>📎</span>
                        <span>{file.name}</span>
                        <span className="text-gray-500">({(file.size / 1024).toFixed(1)}KB)</span>
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="flex gap-2">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    send()
                  }
                }} 
                onFocus={(e) => {
                  // Prevent page scrolling when input gains focus
                  e.target.scrollIntoView = () => {}
                }}
                className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder={embedded ? "Ask about hospice eligibility, fraud detection, or regulations..." : "Type your question..."} 
              />
              
              {/* File Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-gray-500 text-white px-3 py-3 rounded-lg hover:bg-gray-600 font-medium disabled:opacity-50 flex items-center justify-center"
                title="Upload PDF or Image"
              >
                {isUploading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                )}
              </button>

              <button 
                onClick={send} 
                disabled={isUploading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
              >
                Send
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.gif,.bmp,.webp"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  )
}
