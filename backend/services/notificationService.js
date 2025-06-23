const nodemailer = require('nodemailer')
const twilio = require('twilio')
const process = require('process')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}

// Initialize Twilio client only if credentials are provided
let twilioClient = null
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  try {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    )
  } catch (error) {
    console.warn('Twilio initialization failed:', error.message)
  }
} else {
  console.warn('Twilio credentials not provided. SMS functionality will be disabled.')
}

const sendSMS = (to, text) => {
  if (!twilioClient) {
    console.warn('SMS service not available. Twilio credentials not configured.')
    return
  }
  
  twilioClient.messages
    .create({
      body: text,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
    .then((message) => console.log('SMS sent:', message.sid))
    .catch((error) => console.error('Error sending SMS:', error))
}

const sendNotification = (type, to, subject, text) => {
  if (type === 'email') {
    sendEmail(to, subject, text)
  } else if (type === 'sms') {
    sendSMS(to, text)
  }
}

module.exports = { sendNotification }
