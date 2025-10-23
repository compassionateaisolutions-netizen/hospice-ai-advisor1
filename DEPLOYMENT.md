# Hospice Advisor - Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
1. Your OpenAI API key
2. GitHub account
3. Vercel account (free)

### Deployment Steps

1. **Push to GitHub** (already done if you're reading this)
2. **Go to [vercel.com](https://vercel.com) and sign up/login**
3. **Click "Import Git Repository"**
4. **Select this repository**
5. **Configure Environment Variables:**
   - `OPENAI_API_KEY` = your OpenAI API key
   - `OPENAI_MODEL` = gpt-4 (optional)
   - `OPENAI_MAX_TOKENS` = 500 (optional)
   - `OPENAI_TEMPERATURE` = 0.7 (optional)

6. **Click Deploy**
7. **Your site will be live at:** `hospice-advisor-[random].vercel.app`

## 🌐 Custom Domain Setup (hospiceadvisor.com)

### Step 1: Buy Domain
- Go to [Namecheap](https://namecheap.com) or [Google Domains](https://domains.google.com)
- Search for `hospiceadvisor.com`
- Purchase the domain (~$12/year)

### Step 2: Add Domain to Vercel
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add `hospiceadvisor.com` and `www.hospiceadvisor.com`
4. Vercel will provide DNS records

### Step 3: Update DNS
1. Go to your domain registrar's DNS settings
2. Add the DNS records Vercel provided
3. Wait 24-48 hours for propagation

## 📊 Monitoring & Maintenance

### OpenAI API Usage
- Monitor usage at [OpenAI Platform](https://platform.openai.com/usage)
- Set up billing alerts
- Consider usage limits

### Website Analytics
- Add Google Analytics (optional)
- Monitor Vercel analytics
- Track user engagement

## 🔒 Security Checklist

✅ Environment variables set in Vercel (not in code)
✅ .env.local not committed to Git
✅ HTTPS enabled (automatic with Vercel)
✅ API rate limiting configured
✅ Input validation enabled

## 🆘 Troubleshooting

**Chat not working?**
- Check OpenAI API key in Vercel environment variables
- Verify API key has billing enabled
- Check Vercel function logs

**Domain not working?**
- Verify DNS records are correct
- Wait for DNS propagation (24-48 hours)
- Check SSL certificate status

## 📞 Support

Need help? Check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)