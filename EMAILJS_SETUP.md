# EmailJS Setup for HOLY-MARKET

This guide will help you set up EmailJS to send company approval requests to evolutionmediasa@gmail.com.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, click on "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.)
3. Connect your email account and grant permissions
4. Note the Service ID (it will look like `service_xxxxxxxxx`)

## Step 3: Create Email Template

1. In your EmailJS dashboard, click on "Email Templates"
2. Click "Create New Template"
3. Use the following template:

**Subject:**
```
HOLY-MARKET Company Approval Request - {{business_name}}
```

**Body:**
```
HOLY-MARKET Company Approval Request

Business Information:
- Business Name: {{business_name}}
- Owner Name: {{owner_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- WhatsApp: {{whatsapp_number}}
- City: {{city}}
- Category: {{category}}
- Website: {{website}}
- Location: {{location}}
- Country: {{country}}

Business Description:
{{description}}

Faith Information:
- Church Name: {{church_name}}
- Christian Duration: {{christian_duration}}
- Church Involvement: {{church_involvement}}

Submission Date: {{submission_date}}

Please review this application and respond to the applicant at: {{from_email}}
```

4. Note the Template ID (it will look like `template_xxxxxxxxx`)

## Step 4: Get Your Public Key

1. In your EmailJS dashboard, go to "Account" > "General"
2. Copy your Public Key (it will look like a long string)

## Step 5: Update Configuration

1. Open `services/emailService.ts`
2. Replace the placeholder values:
   ```typescript
   private readonly SERVICE_ID = 'your_service_id'; // Replace with your Service ID
   private readonly TEMPLATE_ID = 'your_template_id'; // Replace with your Template ID
   private readonly PUBLIC_KEY = 'your_public_key'; // Replace with your Public Key
   ```

## Step 6: Test the Setup

1. Run the HOLY-MARKET app
2. Go to "Setup Company Profile"
3. Fill out the form completely
4. Click "Submit for Approval"
5. Check your email at evolutionmediasa@gmail.com

## Troubleshooting

### If emails are not being sent:
1. Check your EmailJS dashboard for error logs
2. Verify your email service connection
3. Ensure your email account has granted permissions to EmailJS
4. Check the console logs in your app for error messages

### Rate Limits:
- EmailJS free tier allows 200 emails per month
- Each company approval request counts as 1 email

## Alternative Setup (Without EmailJS)

If you prefer not to use EmailJS, you can:

1. Set up your own email server
2. Use services like SendGrid, Mailgun, or AWS SES
3. Create a simple API endpoint to handle email sending
4. Store submissions in a database for manual processing

The app will still work with the fallback method that logs email content to the console for testing purposes.
