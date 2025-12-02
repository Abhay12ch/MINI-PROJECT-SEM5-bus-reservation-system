const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Initialize Twilio
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

// Email Templates
const emailTemplates = {
  bookingConfirmation: (data) => ({
    subject: `Booking Confirmed - ${data.busName} | Booking ID: ${data.bookingId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .detail-label { font-weight: bold; color: #666; }
          .detail-value { color: #333; }
          .highlight { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .qr-code { text-align: center; margin: 20px 0; font-size: 24px; letter-spacing: 5px; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚌 Booking Confirmed!</h1>
            <p>Your journey has been successfully booked</p>
          </div>
          <div class="content">
            <p>Dear ${data.passengerName},</p>
            <p>Thank you for choosing our bus service. Your booking has been confirmed.</p>
            
            <div class="booking-details">
              <h3 style="color: #667eea; margin-top: 0;">Journey Details</h3>
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span class="detail-value">${data.bookingId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Bus:</span>
                <span class="detail-value">${data.busName} (${data.busNumber})</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">From:</span>
                <span class="detail-value">${data.from} - ${data.departureTime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">To:</span>
                <span class="detail-value">${data.to} - ${data.arrivalTime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Journey Date:</span>
                <span class="detail-value">${data.journeyDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Seat Number(s):</span>
                <span class="detail-value">${data.seatNumbers}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Total Fare:</span>
                <span class="detail-value">₹${data.totalFare}</span>
              </div>
            </div>

            <div class="highlight">
              <strong>⚠️ Important:</strong> Please carry a valid ID proof and this booking confirmation during your journey.
            </div>

            <div class="qr-code">
              ||||  ||  ||||  ||  ||||
            </div>

            <div style="text-align: center;">
              <p><strong>Need Help?</strong></p>
              <p>Contact us: 1800-180-2877 | support@busreservation.com</p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>&copy; 2025 Bus Reservation System. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  bookingCancellation: (data) => ({
    subject: `Booking Cancelled - Refund Initiated | Booking ID: ${data.bookingId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .refund-info { background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Cancelled</h1>
          </div>
          <div class="content">
            <p>Dear ${data.passengerName},</p>
            <p>Your booking has been cancelled as per your request.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Booking ID:</strong> ${data.bookingId}</p>
              <p><strong>Bus:</strong> ${data.busName}</p>
              <p><strong>Journey Date:</strong> ${data.journeyDate}</p>
              <p><strong>Amount:</strong> ₹${data.totalFare}</p>
            </div>

            <div class="refund-info">
              <h3 style="color: #28a745; margin-top: 0;">💰 Refund Information</h3>
              <p><strong>Refund Amount:</strong> ₹${data.refundAmount || data.totalFare}</p>
              <p><strong>Processing Time:</strong> 5-7 business days</p>
              <p>The refund will be credited to your original payment method.</p>
            </div>

            <p>If you have any questions, please contact our support team.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Bus Reservation System. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  passwordReset: (data) => ({
    subject: 'Password Reset Request - Bus Reservation System',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .reset-code { background: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #667eea; border-radius: 8px; margin: 20px 0; border: 2px dashed #667eea; }
          .warning { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Dear ${data.userName},</p>
            <p>We received a request to reset your password. Use the code below to reset your password:</p>
            
            <div class="reset-code">
              ${data.resetCode}
            </div>

            <p style="text-align: center; color: #666;">This code will expire in 10 minutes.</p>

            <div class="warning">
              <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email and your password will remain unchanged.
            </div>

            <p>For security reasons, never share this code with anyone.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Bus Reservation System. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  journeyReminder: (data) => ({
    subject: `Journey Reminder - Tomorrow at ${data.departureTime}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .reminder-box { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
          .checklist { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Journey Reminder</h1>
            <p>Your bus departs tomorrow!</p>
          </div>
          <div class="content">
            <p>Dear ${data.passengerName},</p>
            
            <div class="reminder-box">
              <h3 style="margin-top: 0;">🚌 Your Journey Details</h3>
              <p><strong>Bus:</strong> ${data.busName}</p>
              <p><strong>From:</strong> ${data.from} at ${data.departureTime}</p>
              <p><strong>To:</strong> ${data.to}</p>
              <p><strong>Date:</strong> ${data.journeyDate}</p>
              <p><strong>Seat(s):</strong> ${data.seatNumbers}</p>
            </div>

            <div class="checklist">
              <h3 style="color: #667eea;">📋 Travel Checklist</h3>
              <ul>
                <li>✓ Carry a valid ID proof</li>
                <li>✓ Keep your booking confirmation handy</li>
                <li>✓ Reach the boarding point 15 minutes early</li>
                <li>✓ Keep emergency contact numbers saved</li>
              </ul>
            </div>

            <p style="text-align: center;">
              <strong>Boarding Point:</strong> ${data.boardingPoint || data.from}<br>
              <strong>Need Help?</strong> Call 1800-180-2877
            </p>
          </div>
          <div class="footer">
            <p>Have a safe journey!</p>
            <p>&copy; 2025 Bus Reservation System. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// SMS Templates
const smsTemplates = {
  bookingConfirmation: (data) => 
    `Bus Booking Confirmed!\nBooking ID: ${data.bookingId}\nBus: ${data.busName}\n${data.from} to ${data.to}\nDate: ${data.journeyDate}\nSeats: ${data.seatNumbers}\nFare: Rs.${data.totalFare}\nCarry valid ID proof. Contact: 1800-180-2877`,

  bookingCancellation: (data) => 
    `Booking Cancelled\nBooking ID: ${data.bookingId}\nRefund of Rs.${data.refundAmount || data.totalFare} will be processed in 5-7 days.\nContact: 1800-180-2877`,

  passwordReset: (data) => 
    `Your password reset code is: ${data.resetCode}\nValid for 10 minutes.\nIf you didn't request this, ignore this message.`,

  journeyReminder: (data) => 
    `Journey Reminder!\nYour bus ${data.busName} departs tomorrow at ${data.departureTime} from ${data.from}.\nSeats: ${data.seatNumbers}\nReach 15 mins early. Carry ID proof.`
};

// Send Email Function
const sendEmail = async (to, templateName, data) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('SendGrid not configured. Email not sent.');
      return { success: false, message: 'SendGrid not configured' };
    }

    if (!process.env.SENDGRID_FROM_EMAIL) {
      console.log('SendGrid FROM email not configured.');
      return { success: false, message: 'SendGrid FROM email not configured' };
    }

    const template = emailTemplates[templateName](data);
    
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: template.subject,
      html: template.html
    };

    await sgMail.send(msg);
    console.log(`Email sent to ${to} - Template: ${templateName}`);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SendGrid Error:', error.response.body);
    }
    return { success: false, message: error.message };
  }
};

// Send SMS Function
const sendSMS = async (to, templateName, data) => {
  try {
    if (!twilioClient) {
      console.log('Twilio not configured. SMS not sent.');
      return { success: false, message: 'Twilio not configured' };
    }

    if (!process.env.TWILIO_PHONE_NUMBER) {
      console.log('Twilio phone number not configured.');
      return { success: false, message: 'Twilio phone number not configured' };
    }

    // Format phone number to E.164 format
    let formattedPhone = to;
    if (!to.startsWith('+')) {
      // Assume Indian number if no country code
      formattedPhone = '+91' + to.replace(/\D/g, '');
    }

    const message = smsTemplates[templateName](data);

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });

    console.log(`SMS sent to ${formattedPhone} - Template: ${templateName}`);
    return { success: true, message: 'SMS sent successfully', sid: result.sid };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, message: error.message };
  }
};

// Send Both Email and SMS
const sendNotification = async (email, phone, templateName, data) => {
  const results = {
    email: null,
    sms: null
  };

  // Send email if email is provided
  if (email) {
    results.email = await sendEmail(email, templateName, data);
  }

  // Send SMS if phone is provided
  if (phone) {
    results.sms = await sendSMS(phone, templateName, data);
  }

  return results;
};

module.exports = {
  sendEmail,
  sendSMS,
  sendNotification,
  emailTemplates,
  smsTemplates
};
