// pages/api/chat.js
export default async function handler(req, res) {
  // Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message, files } = req.body;

  // Input validation
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'Invalid message format' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ message: 'Message too long. Please keep it under 1000 characters.' });
  }

  // Validate files if provided
  if (files && (!Array.isArray(files) || files.length > 5)) {
    return res.status(400).json({ message: 'Too many files. Maximum 5 files allowed.' });
  }

  // Basic rate limiting (simple implementation)
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  
  // In production, you'd want to use a proper rate limiting solution like Redis

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        message: 'API configuration error. Please check server settings.' 
      });
    }

    // OpenAI API integration with custom GPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are the Compassionate Care Advisor, an AI assistant specializing in hospice care patient eligibility and care planning. 

Your expertise includes:
- Hospice eligibility criteria assessment based on CMS guidelines
- Patient qualification forecasting using medical indicators
- Documentation requirements for hospice admission
- Regulatory compliance and Medicare guidelines
- Care planning optimization and timing recommendations
- Clinical indicators for 6-month prognosis determination
- Fraud detection and prevention in hospice care
- Family support and education guidance
- Analysis of medical documents, images, and patient records

You have access to comprehensive knowledge about:
- CMS hospice regulations and billing requirements
- Clinical pathways for different diagnoses
- Documentation best practices for compliance
- Quality metrics and reporting standards
- Appropriate vs inappropriate admissions criteria
- Medical document analysis and interpretation

When users upload files (PDFs, images), analyze them for:
- Patient eligibility indicators
- Clinical documentation quality
- Compliance with hospice criteria
- Missing documentation elements
- Regulatory compliance issues

Always provide helpful, accurate, and compassionate responses while maintaining professional healthcare standards.
Focus on patient-centered care while ensuring regulatory compliance.
When discussing patient eligibility, reference specific clinical indicators and CMS criteria.
Ask clarifying questions when you need more context about a patient's condition.

Keep responses concise but informative, and prioritize patient safety and appropriate care timing.`
          },
          {
            role: 'user',
            content: files && files.length > 0 
              ? `${message}\n\nI have uploaded ${files.length} file(s) for analysis:\n${files.map(f => `- ${f.name} (${f.type}): ${f.content}`).join('\n')}`
              : message
          }
        ],
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 500,
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    res.status(200).json({ message: botMessage });
   
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Sorry, I encountered an error. Please try again.' 
    });
  }
}