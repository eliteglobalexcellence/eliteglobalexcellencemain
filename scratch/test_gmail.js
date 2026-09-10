const nodemailer = require('nodemailer');

const smtpUser = 'eliteglobalexcellence@gmail.com';
const smtpPass = 'uybz qyly aumq dlck';
const cleanPass = smtpPass.trim().replace(/^["']|["']$/g, '').replace(/\s+/g, '');

console.log('Testing Nodemailer with user:', smtpUser, 'and pass length:', cleanPass.length);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtpUser,
    pass: cleanPass,
  },
});

transporter.sendMail({
  from: `"Elite Global Excellence" <${smtpUser}>`,
  to: 'sajidshah232@gmail.com',
  subject: 'Test Workshop Email Instant Dispatch',
  text: 'This is a test email from Elite Global Excellence.',
}, (err, info) => {
  if (err) {
    console.error('Nodemailer Error:', err);
  } else {
    console.log('Nodemailer Success:', info.response);
  }
});
