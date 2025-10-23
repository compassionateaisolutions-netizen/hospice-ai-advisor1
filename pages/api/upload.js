import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    })

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const [fields, files] = await form.parse(req)
    const file = Array.isArray(files.file) ? files.file[0] : files.file

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp']
    if (!allowedTypes.includes(file.mimetype)) {
      // Clean up uploaded file
      fs.unlinkSync(file.filepath)
      return res.status(400).json({ error: 'Invalid file type. Only PDF and image files are allowed.' })
    }

    // Generate a unique filename
    const timestamp = Date.now()
    const fileExtension = path.extname(file.originalFilename || file.newFilename)
    const newFilename = `${timestamp}-${Math.random().toString(36).substring(7)}${fileExtension}`
    const newFilePath = path.join(uploadDir, newFilename)

    // Move file to final location
    fs.renameSync(file.filepath, newFilePath)

    // Extract content based on file type
    let content = ''
    try {
      if (file.mimetype === 'application/pdf') {
        // For PDFs, we'll just indicate it's a PDF file
        // In a production environment, you'd use a PDF parsing library
        content = 'PDF document uploaded for analysis'
      } else if (file.mimetype.startsWith('image/')) {
        // For images, we'll indicate it's an image
        // In production, you might use OCR or image analysis
        content = 'Image uploaded for analysis'
      }
    } catch (error) {
      console.error('Content extraction error:', error)
      content = 'File uploaded for analysis'
    }

    // Return file information
    res.status(200).json({
      message: 'File uploaded successfully',
      url: `/uploads/${newFilename}`,
      filename: file.originalFilename || file.newFilename,
      mimetype: file.mimetype,
      size: file.size,
      content: content
    })

  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'File upload failed' })
  }
}