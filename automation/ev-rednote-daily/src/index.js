const Groq = require('groq-sdk');
const nodemailer = require('nodemailer');

async function generateRednoteDrafts() {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = 'Generate 5 engaging Xiaohongshu (Rednote) post drafts for an EV car technician content creator in San Francisco. Each post should: have a catchy title with emojis, be written in a mix of Chinese and English (Chinglish style), be 100-150 words, include 5-8 hashtags, cover topics like EV repair tips, life in SF, behind-the-scenes at the shop, or funny work stories. Sound authentic and relatable to young Chinese-speaking audiences. Number each post 1 through 5 with the title on the first line.';

  console.log('Generating Rednote drafts with Groq...');
  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
  });
  const drafts = completion.choices[0].message.content;
  console.log('Drafts generated!');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Your Daily Rednote Drafts - ' + today,
    text: 'Hi Lucy!\n\nHere are your 5 Rednote drafts for ' + today + ':\n\n' + drafts + '\n\n----\nHappy posting!\nYour Daily Rednote Bot',
  });

  console.log('Drafts emailed to ' + process.env.RECIPIENT_EMAIL);
}

generateRednoteDrafts().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
