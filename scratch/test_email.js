const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testEmail() {
  try {
    const res = await fetch('http://localhost:3000/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toEmail: 'sajidshah232@gmail.com',
        recipientName: 'Sajid Shah',
        registrationId: 'EGEW18-TEST',
        workshopTitle: 'Test Workshop Email Instant Dispatch',
        date: '15 October 2026',
        time: '8:00 PM MYT',
        mode: 'Online (Zoom)',
        whatsappLink: 'https://chat.whatsapp.com/EGEWorkshopAI2026',
      }),
    });
    const data = await res.json();
    console.log('API Response:', data);
  } catch (e) {
    console.error('Test Email Exception:', e);
  }
}

testEmail();
