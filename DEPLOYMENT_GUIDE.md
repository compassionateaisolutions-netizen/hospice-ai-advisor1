# Vercel Deployment Guide

## Pre-Deployment Checklist

Your Hospice AI Advisor website is ready for deployment! Follow these steps:

### ✅ What's Already Configured:

1. **Next.js 14.1.0** - Production-ready React framework
2. **Custom GPT Integration** - Uses OpenAI Assistants API
3. **File Upload Support** - PDF and image uploads with GPT-4V
4. **API Endpoints**:
   - `/api/chat-assistant.js` - Custom GPT via Assistants API (60s timeout)
   - `/api/chat.js` - Alternative GPT-4o endpoint (30s timeout)
   - `/api/upload.js` - File upload handler (30s timeout)
5. **CORS Headers** - All APIs properly configured
6. **Environment Variables** - Ready for Vercel secrets

---

## Deployment Steps

### Step 1: Set Up Vercel Environment Variables

On your Vercel project dashboard:

1. Go to **Settings → Environment Variables**
2. Add these variables:
   - `OPENAI_API_KEY` = Your OpenAI API key from `.env.local`
   - `OPENAI_MODEL` = `gpt-4o`
   - `OPENAI_MAX_TOKENS` = `1000`
   - `OPENAI_TEMPERATURE` = `0.7`

**Security Note:** Do NOT commit `.env.local` to GitHub (it's in `.gitignore` ✓)

### Step 2: Deploy to Vercel

Option A: **Via Git (Automatic)**
- Push latest code to GitHub main branch
- Vercel auto-deploys on push

```bash
git add . && git commit -m "Prepare for Vercel deployment" && git push origin main
```

Option B: **Via Vercel CLI**
```bash
npm install -g vercel
vercel deploy --prod
```

### Step 3: Custom Domain Setup

1. Go to your Vercel project: **Settings → Domains**
2. Add domain: `compassionateaicaresolutions.com`
3. Update DNS records at your registrar with Vercel's nameservers
4. Wait for DNS propagation (usually 24-48 hours)

### Step 4: Test Your Deployment

After deployment:

1. Visit your Vercel URL (e.g., `https://hospice-advisor.vercel.app`)
2. Test the chatbot:
   - ✅ Ask a question
   - ✅ Upload a patient PDF
   - ✅ Upload a patient image
   - ✅ Verify multi-turn conversations work

---

## How It Works on Vercel

### ChatBot Flow:
```
User Input/File Upload
    ↓
ChatWidget.js (React frontend)
    ↓
/api/chat-assistant.js (Serverless Function)
    ↓
OpenAI Assistants API
    ↓
Your Custom GPT (asst_8vaxKnJ0KbwzHdHyn1gguwIt)
    ↓
Response back to ChatWidget
    ↓
Display in browser
```

### Key Features:
- ✅ **Thread Continuity**: Multi-turn conversations maintained via `threadId`
- ✅ **File Uploads**: Images (base64) and PDFs (metadata) support
- ✅ **Timeout Handling**: 60-second limit for Assistants API calls
- ✅ **CORS Support**: API accessible from your domain and others
- ✅ **Scalable**: Vercel handles traffic automatically

---

## Environment Variables Reference

| Variable | Value | Purpose |
|----------|-------|---------|
| `OPENAI_API_KEY` | `sk-proj-...` | Authenticates with OpenAI API |
| `OPENAI_MODEL` | `gpt-4o` | Model for fallback chat endpoint |
| `OPENAI_MAX_TOKENS` | `1000` | Max response length |
| `OPENAI_TEMPERATURE` | `0.7` | Response creativity (0-1) |

---

## Monitoring & Troubleshooting

### Check Deployment Status:
- Vercel Dashboard → Deployments tab
- Look for green "Ready" status

### Check API Logs:
1. Vercel Dashboard → Functions tab
2. Select `pages/api/chat-assistant.js`
3. View recent invocations and errors

### Common Issues:

**Issue**: "API key error"
- **Fix**: Verify `OPENAI_API_KEY` is set in Vercel Environment Variables

**Issue**: "Timeout errors"
- **Fix**: Vercel free tier has 60s max. Upgrade to Pro for longer timeouts

**Issue**: "CORS errors"
- **Fix**: Already configured in `vercel.json` ✓

**Issue**: "Thread ID not working"
- **Fix**: Threads are stored per session. Refresh page to start new thread

---

## Next Steps

1. ✅ Add environment variables to Vercel
2. ✅ Deploy to Vercel (push to main or CLI)
3. ✅ Add custom domain (DNS records)
4. ✅ Test all functionality
5. ✅ Monitor for errors

---

## Support

For OpenAI API issues: https://platform.openai.com/account/billing/overview
For Vercel deployment help: https://vercel.com/docs
For Custom GPT management: https://chat.openai.com/gpts/my

---

**Your custom GPT is now running on your own website! 🎉**
