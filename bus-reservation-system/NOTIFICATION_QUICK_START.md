# Quick Start: Setting Up Notifications

## ⚡ Fast Setup (5 minutes)

### Option 1: SendGrid (Email Only) - Recommended for Testing

1. **Create Account**
   - Go to: https://sendgrid.com/
   - Click "Sign Up" and create a free account
   - Verify your email

2. **Get API Key**
   - Log in to SendGrid dashboard
   - Go to: Settings → API Keys
   - Click "Create API Key"
   - Name it: "Bus Reservation"
   - Permission: "Full Access"
   - Click "Create & View"
   - **Copy the key** (shown only once!)

3. **Verify Sender**
   - Go to: Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Fill in your details:
     ```
     From Name: Bus Reservation System
     From Email: your-email@gmail.com
     Reply To: your-email@gmail.com
     ```
   - Click "Create"
   - Check your email and click verification link

4. **Update .env File**
   ```env
   SENDGRID_API_KEY=SG.your_actual_api_key_here
   SENDGRID_FROM_EMAIL=your-email@gmail.com
   ```

5. **Test It**
   ```bash
   cd backend
   node test-notifications.js
   ```

### Option 2: Twilio (SMS Only)

1. **Create Account**
   - Go to: https://www.twilio.com/
   - Click "Sign up" (free trial)
   - Complete verification

2. **Get Credentials**
   - From dashboard, copy:
     - Account SID
     - Auth Token

3. **Get Phone Number**
   - Go to: Phone Numbers → Buy a number
   - Select country and SMS capability
   - Purchase (free with trial credits)

4. **Verify Test Number** (Trial accounts only)
   - Go to: Phone Numbers → Verified Caller IDs
   - Add your phone number
   - Enter verification code received via SMS

5. **Update .env File**
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+15551234567
   ```

### Option 3: Both Services (Production Ready)

Complete both Option 1 and Option 2 above.

## 🧪 Testing

### Test Configuration
```bash
cd backend
node test-notifications.js
```

### Test with Real Booking
1. Configure at least one service (SendGrid or Twilio)
2. Restart backend server: `npm start`
3. Create a booking through the frontend
4. Check your email/phone for notification
5. Cancel the booking and verify cancellation notification

### Test Password Reset
1. Go to login page
2. Click "Forgot Password"
3. Enter your email
4. Check email/SMS for reset code

## 🔧 Configuration Examples

### Development (.env)
```env
# For testing with your personal email/phone
SENDGRID_API_KEY=SG.your_test_key
SENDGRID_FROM_EMAIL=test@gmail.com
TWILIO_ACCOUNT_SID=ACtest123
TWILIO_AUTH_TOKEN=testtoken123
TWILIO_PHONE_NUMBER=+15551234567
```

### Production (.env)
```env
# For live deployment
SENDGRID_API_KEY=SG.your_production_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
TWILIO_ACCOUNT_SID=ACprod456
TWILIO_AUTH_TOKEN=prodtoken456
TWILIO_PHONE_NUMBER=+91xxxxxxxxxx
```

## 💡 Tips

1. **Free Tiers**
   - SendGrid: 100 emails/day (forever free)
   - Twilio: $15 trial credit

2. **For Students/Testing**
   - Just configure SendGrid (easier, no phone verification)
   - Use your personal email
   - Perfect for demo/presentation

3. **For Production**
   - Configure both services
   - Use business domain email
   - Get verified phone number

4. **If You See "Not Configured"**
   - It's OK! App works without notifications
   - Bookings will still be created
   - Notifications just won't be sent

## 🚀 Ready to Use!

Once configured, notifications will automatically send for:
- ✅ New bookings
- ✅ Booking cancellations
- ✅ Password resets

No code changes needed - it just works! 🎉

## 🆘 Quick Troubleshooting

**Email not arriving?**
- Check spam folder
- Verify sender email in SendGrid
- Ensure API key is correct

**SMS not arriving?**
- Verify phone number in Twilio (trial accounts)
- Check phone format: +91xxxxxxxxxx
- Ensure sufficient credits

**"Not configured" message?**
- Check .env file has the variables
- Restart backend server after adding variables
- Check for typos in variable names

## 📚 More Information

See `NOTIFICATION_SYSTEM_GUIDE.md` for complete documentation including:
- Detailed setup instructions
- Template customization
- Cost optimization
- Security best practices
- Troubleshooting guide
- Advanced features
