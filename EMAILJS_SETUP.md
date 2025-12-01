# EmailJS Setup Instructions

To enable email functionality for the contact form, you need to set up EmailJS:

## Step 1: Create an EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (free tier allows 200 emails/month)

## Step 2: Create an Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account (khmtutoring1@gmail.com)
5. Copy the **Service ID** (you'll need this)

## Step 3: Create an Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Student Grade: {{grade}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "General" in EmailJS dashboard
2. Copy your **Public Key** (also called API Key)

## Step 5: Update the Contact Form
1. Open `src/pages/Contact.tsx`
2. Find these lines (around line 40-42):
   ```typescript
   const serviceId = "YOUR_SERVICE_ID";
   const templateId = "YOUR_TEMPLATE_ID";
   const publicKey = "YOUR_PUBLIC_KEY";
   ```
3. Replace with your actual values:
   ```typescript
   const serviceId = "service_xxxxxxx";
   const templateId = "template_xxxxxxx";
   const publicKey = "xxxxxxxxxxxxx";
   ```

## Alternative: Use Environment Variables (Recommended for Production)
1. Create a `.env` file in the root directory
2. Add:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. Update Contact.tsx to use:
   ```typescript
   const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
   const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
   const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
   ```

## Testing
1. Fill out the contact form on your website
2. Submit it
3. Check khmtutoring1@gmail.com inbox for the email

## Troubleshooting
- Make sure all three IDs are correctly entered
- Check EmailJS dashboard for error logs
- Verify your email service is connected and active
- Free tier has rate limits (200 emails/month)

