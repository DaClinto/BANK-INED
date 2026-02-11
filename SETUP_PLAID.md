# Plaid Setup for Horizon Banking

## ✅ Your Configuration

Your Plaid secret has been configured in `.env.local`:
```
PLAID_SECRET=MOB74TWMSK6O32Y5FCX5ZOBPJJOEXB75
```

## 🔧 Next Steps

### 1. Get Your Plaid Client ID

1. Go to [Plaid Dashboard](https://dashboard.plaid.com)
2. Sign in or create an account
3. Navigate to **Team Settings → Keys**
4. Copy your **Client ID** (not the secret - you already have that)

### 2. Update Environment Variables

Add your Client ID to `.env.local`:

```env
PLAID_CLIENT_ID=your_actual_client_id_here
```

### 3. Test the Configuration

Start the development server:
```bash
npm run dev
```

Then test the Plaid connection:
```bash
curl http://localhost:3000/api/plaid/test
```

You should see a response like:
```json
{
  "success": true,
  "message": "Plaid client is configured correctly",
  "institutions_count": 5,
  "sample_institutions": [...]
}
```

### 4. Test Bank Connection

1. Navigate to `http://localhost:3000/accounts`
2. Click "Connect Account"
3. Use sandbox test credentials:
   - **Username**: `user_good`
   - **Password**: `pass_good`
   - **Bank**: First Platypus Bank

## 🏦 Sandbox Test Banks

| Bank | Username | Password |
|------|----------|----------|
| First Platypus Bank | user_good | pass_good |
| Second Platypus Bank | user_good | pass_good |
| Third Platypus Bank | user_good | pass_good |

## 🚀 Production Setup

When ready for production:

1. **Request production access** in Plaid dashboard
2. **Update environment variables**:
   ```env
   PLAID_ENV=production
   PLAID_CLIENT_ID=your_production_client_id
   PLAID_SECRET=your_production_secret
   ```
3. **Configure webhooks** for real-time updates
4. **Set up proper error handling** and monitoring

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid client_id"**: Double-check your Client ID
2. **"Invalid secret"**: Ensure the secret matches exactly
3. **"Environment mismatch"**: Make sure PLAID_ENV matches your keys
4. **"Network error"**: Check your internet connection

### Debug Mode

Enable debug logging by adding to your `.env.local`:
```env
DEBUG=plaid:*
```

## 📞 Support

- Check the Plaid Dashboard for API status
- Review error logs in your terminal
- Ensure all environment variables are set correctly

---

**Ready to test?** Once you add your Client ID, the Plaid integration will be fully functional!
