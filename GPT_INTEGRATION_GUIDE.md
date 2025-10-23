# GPT Integration Guide for Compassionate Care Advisor

This guide shows you how to integrate your custom GPT with the chatbot on your website.

## Current Setup

The chatbot is currently set up with mock responses in `components/ChatWidget.js`. You need to replace the mock functionality with real API calls to your custom GPT.

## Integration Options

### Option 1: OpenAI API (Recommended)
If your custom GPT is built with OpenAI's API:

1. **Get your API key** from OpenAI Dashboard
2. **Create an API route** in your Next.js app
3. **Update the chatbot** to call your API

### Option 2: Custom API Endpoint
If you have your own API endpoint:

1. **Update the fetch URL** in the chatbot
2. **Modify request/response format** as needed

### Option 3: ChatGPT Plugin/GPT Store
If your GPT is published in the GPT Store:

1. **Use OpenAI's API** with your custom GPT ID
2. **Implement authentication** if required

## Step-by-Step Implementation

### Step 1: Create API Route

Create `pages/api/chat.js`:

```javascript
// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    // Option A: OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4', // or your custom model
        messages: [
          {
            role: 'system',
            content: 'You are the Compassionate Care Advisor, an AI assistant specializing in hospice care, fraud detection, and eligibility prediction.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    res.status(200).json({ message: botMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Sorry, I encountered an error. Please try again.' });
  }
}
```

### Step 2: Update ChatWidget Component

In `components/ChatWidget.js`, replace the mock `send` function:

```javascript
const send = async () => {
  if (!input.trim()) return
  const userMsg = { id: Date.now(), from: 'user', text: input }
  setMessages((m) => [...m, userMsg])
  setInput('')

  try {
    // Call your API endpoint
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMsg = { 
      id: Date.now() + 1, 
      from: 'bot', 
      text: data.message 
    };
    setMessages((m) => [...m, botMsg]);
  } catch (error) {
    console.error('Error:', error);
    const errorMsg = { 
      id: Date.now() + 1, 
      from: 'bot', 
      text: 'Sorry, I encountered an error. Please try again.' 
    };
    setMessages((m) => [...m, errorMsg]);
  }
}
```

### Step 3: Environment Variables

Create `.env.local` file in your project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Step 4: Install Dependencies

Add the required packages:

```bash
npm install openai
```

## Alternative: Direct OpenAI Integration

If you prefer client-side integration (less secure):

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const send = async () => {
  // ... existing code ...
  
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are the Compassionate Care Advisor...' },
        { role: 'user', content: input }
      ],
      model: 'gpt-4',
    });

    const botMsg = { 
      id: Date.now() + 1, 
      from: 'bot', 
      text: completion.choices[0].message.content 
    };
    setMessages((m) => [...m, botMsg]);
  } catch (error) {
    // Handle error
  }
}
```

## Security Considerations

1. **Never expose API keys** in client-side code
2. **Use server-side API routes** for secure API calls
3. **Implement rate limiting** to prevent abuse
4. **Add authentication** if needed
5. **Validate user inputs** before sending to GPT

## Testing

1. **Test with simple messages** first
2. **Check error handling** works properly
3. **Verify API costs** and usage limits
4. **Test on different devices** and browsers

## Next Steps

1. Choose your integration method
2. Set up your API credentials
3. Implement the code changes
4. Test thoroughly
5. Deploy to production

## Need Help?

- Check the current `components/ChatWidget.js` file for the exact location to make changes
- Look at `pages/api/` folder structure for API route examples
- Test API calls using browser dev tools or Postman first

## File Locations to Modify

- `components/ChatWidget.js` - Update the `send` function
- `pages/api/chat.js` - Create this file for API endpoint
- `.env.local` - Add your API keys here
- `package.json` - Add any new dependencies