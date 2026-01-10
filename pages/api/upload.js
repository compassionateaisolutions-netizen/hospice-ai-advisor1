// Simplified upload handler for Vercel deployment
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // TEMPORARY (production gating): patient information uploads are not enabled yet.
  // Return the exact support message on any upload attempt on the live site.
  // Local/dev behavior stays unchanged so you can keep testing locally.
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production'
  if (isProd) {
    return res.status(403).json({
      error: 'patient_upload_not_enabled',
      message: "You don’t have access to this feature yet. Please reach out to our Customer Support team, and they’ll be happy to help you enable patient information uploads."
    })
  }

  try {
    // Simple file info processing without actual file storage
    // This works around Vercel's read-only filesystem limitations
    
    // For now, we'll acknowledge the upload and provide analysis capability
    // In the future, this could integrate with cloud storage services
    
    res.status(200).json({
      message: 'File received for analysis',
      content: 'File uploaded successfully. The AI can now analyze your document for hospice eligibility criteria, compliance requirements, and clinical indicators.',
      success: true
    })

  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload processing failed' })
  }
}