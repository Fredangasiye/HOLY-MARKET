# Vercel Deployment Guide

## Environment Variables Required

You need to set these environment variables in your Vercel project settings:

### Frontend Environment Variables (VITE_*)
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

### Backend Environment Variables
- `SUPABASE_SERVICE_KEY` - Your Supabase service role key (for backend operations)
- `DATABASE_URL` - Your PostgreSQL database connection string
- `PAYSTACK_SECRET_KEY` - Your Paystack secret key for payments

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the correct name and value
5. Make sure to set them for "Production" environment

## Common Issues and Solutions

### 1. Blank Screen After Google Sign Up
- **Cause**: Missing Supabase environment variables
- **Solution**: Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set

### 2. Sign In/Up Not Responding
- **Cause**: Supabase client not properly configured
- **Solution**: Check that all environment variables are correctly set

### 3. API Errors
- **Cause**: Missing backend environment variables
- **Solution**: Ensure `SUPABASE_SERVICE_KEY`, `DATABASE_URL`, and `PAYSTACK_SECRET_KEY` are set

### 4. CORS Errors
- **Cause**: CORS configuration not matching your domain
- **Solution**: The API is configured to use `VERCEL_URL` automatically

## Testing Your Deployment

1. After setting environment variables, redeploy your project
2. Check the browser console for any errors
3. Test the authentication flow
4. Verify API endpoints are working

## Local Development vs Production

- **Local**: Uses `.env` file
- **Production**: Uses Vercel environment variables
- Make sure all variables are set in both environments 