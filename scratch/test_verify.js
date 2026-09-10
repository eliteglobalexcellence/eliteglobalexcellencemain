const nodemailer = require('nodemailer');

async function checkAuth() {
  const user = 'eliteglobalexcellence@gmail.com';
  const passClean = 'lwacvypgqfeuqf';

  console.log('--- CHECKING PORT 587 STARTTLS (lwacvypgqfeuqf) ---');
  try {
    const t1 = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
      auth: { user, pass: passClean },
      tls: { rejectUnauthorized: false }
    });
    const res1 = await t1.verify();
    console.log('VERIFY PORT 587 SUCCESS:', res1);
  } catch (e1) {
    console.error('VERIFY PORT 587 ERROR:', e1.message);
  }
}

checkAuth();

