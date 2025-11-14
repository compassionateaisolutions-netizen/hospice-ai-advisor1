import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function ChatBubble({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Open chat" className="fixed right-6 bottom-6 bg-indigo-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-indigo-700">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 3.866-4.03 7-9 7-1.02 0-1.99-.105-2.9-.304L3 21l1.304-5.1A9.954 9.954 0 013 12c0-3.866 4.03-7 9-7s9 3.134 9 7z" />
      </svg>
    </button>
  )
}

const markdownComponents = {
  h2: ({ children }) => (
    <h2 className="text-lg font-semibold text-gray-900 mt-4 mb-2 flex items-center gap-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-gray-900 mt-3 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-800 leading-relaxed mb-3 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-2 text-gray-800">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 space-y-2 text-gray-800">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
  hr: () => <hr className="my-4 border-t border-gray-200" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-200 pl-3 text-gray-700 italic">
      {children}
    </blockquote>
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
  const [threadId, setThreadId] = useState(null) // Store thread ID for conversation continuity
  const [fileIds, setFileIds] = useState([])
  const endRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!endRef.current) return

    const chatContainer = endRef.current.closest('#chat-window')
    if (!chatContainer) return

    // Reset scroll to top so users see the start of the latest assistant reply
    chatContainer.scrollTo({ top: 0, behavior: 'smooth' })
  }, [messages])

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files)
    // Accept both PDFs and images
    const validFiles = files.filter(file => {
      const isValidType = file.type.includes('pdf') || file.type.includes('image')
      const isValidSize = file.size <= 50 * 1024 * 1024 // 50MB limit for PDFs
      return isValidType && isValidSize
    })

    if (validFiles.length === 0) {
      alert('Please upload valid PDF or image files (under 50MB)')
      return
    }

    setIsUploading(true)
    
    try {
      // Process each file - convert to base64
      const filePromises = validFiles.map(async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            resolve({
              name: file.name,
              type: file.type,
              size: file.size,
              content: e.target.result, // base64 data URL
              isImage: file.type.includes('image'),
              isPDF: file.type.includes('pdf')
            })
          }
          reader.readAsDataURL(file)
        })
      })

      const uploadedFileData = await Promise.all(filePromises)
      setUploadedFiles(prev => [...prev, ...uploadedFileData])
      
      // Create analysis message
      const fileList = uploadedFileData.map(f => f.name).join(', ')
      const pdfFiles = uploadedFileData.filter(f => f.isPDF)
      const imageFiles = uploadedFileData.filter(f => f.isImage)
      
      let fileAnalysisMessage = `I have uploaded ${uploadedFileData.length} file(s) for analysis: ${fileList}. `
      
      if (pdfFiles.length > 0) {
        fileAnalysisMessage += `PDF files: ${pdfFiles.map(f => f.name).join(', ')}. `
      }
      if (imageFiles.length > 0) {
        fileAnalysisMessage += `Images: ${imageFiles.map(f => f.name).join(', ')}. `
      }
      
      fileAnalysisMessage += `Please provide a comprehensive hospice eligibility assessment based on this patient information, including specific clinical indicators, documentation quality, and CMS compliance evaluation.`
      
      // Add user message
      const fileMessage = {
        id: Date.now(),
        from: 'user',
        text: fileAnalysisMessage,
        files: uploadedFileData
      }
      
      setMessages(prev => [...prev, fileMessage])
      
      // Send for analysis with all file content
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
    
    // VALIDATION: Ensure we have something to send
    const hasMessage = actualMessage && String(actualMessage).trim().length > 0
    const potentialFiles = fileData || (uploadedFiles.length > 0 ? [...uploadedFiles] : undefined)
    const hasFiles = Array.isArray(potentialFiles) && potentialFiles.length > 0
    
    if (!hasMessage && !hasFiles) {
      return // Don't send empty messages without files
    }
    
    const actualFiles = potentialFiles
    
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
      // Call the Assistants API endpoint
      const finalMessage = hasMessage ? String(actualMessage).trim() : 'Please analyze the uploaded file(s)'
      
      const response = await fetch('/api/chat-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: finalMessage,
          files: actualFiles,
          threadId: threadId, // Pass current thread for conversation continuity
          fileIds: fileIds.length > 0 ? fileIds : undefined
        }),
      })

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error('Failed to parse response:', parseError)
        throw new Error(`Failed to parse API response: ${response.statusText}`)
      }
      
      console.log('API Response:', { status: response.status, data })
      
      if (!response.ok) {
        // Extract error message from response
        const errorMsg = data?.error || data?.message || `API Error: ${response.status}`
        console.error('API Error Details:', errorMsg)
        throw new Error(errorMsg)
      }
      
      // Update thread ID for subsequent messages
      if (data.threadId) {
        setThreadId(data.threadId)
      }

      if (Array.isArray(data.fileIds)) {
        setFileIds(data.fileIds)
      }
      
      // Handle both message formats (nested or direct)
      const messageText = typeof data.message === 'string' 
        ? data.message 
        : data.message?.value || data.message
      
      setMessages((m) => [...m, { 
        id: Date.now() + 1, 
        from: 'bot', 
        text: messageText 
      }])
    } catch (error) {
      console.error('Chat error details:', error)
      
      let errorMessage = error?.message || 'Sorry, I encountered an error. Please try again.'
      console.error('Final error message shown to user:', errorMessage)
      
      setMessages((m) => [...m, { 
        id: Date.now() + 1, 
        from: 'bot', 
        text: errorMessage
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
                <div className="w-8 h-8 bg-white/20 rounded overflow-hidden flex items-center justify-center">
                  <Image src="/logo.svg" alt="Compassionate Care logo" width={32} height={32} className="object-contain" />
                </div>
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
                <div className={`${m.from === 'user' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-gray-900 border border-gray-200 shadow-sm'} max-w-[85%] p-4 rounded-xl leading-relaxed`}> 
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={m.from === 'user' ? undefined : markdownComponents}
                  >
                    {m.text}
                  </ReactMarkdown>
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
