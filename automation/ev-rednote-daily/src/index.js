const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodemailer = require('nodemailer');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateWithRetry(model, prompt, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      if (i < retries - 1) {
        const waitSec = 90;
        console.log('API error on attempt ' + (i + 1) + '/' + retries + '. Waiting ' + waitSec + 's before retry...');
        console.log('Error:', err.message || String(err));
        await sleep(waitSec * 1000);
      } else {
        throw err;
      }
    }
  }
}

async function generateRednoteDrafts() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = 'Generate 5 engaging Xiaohongshu (Rednote) post drafts for an EV car technician content creator in San Francisco. Each post should: have a catchy title with emojis, be written in a mix of Chinese and English (Chinglish style), be 100-150 words, include 5-8 hashtags, cover topics like EV repair tips, life in SF, behind-the-scenes at the shop, or funny work stories. Sound authentic and relatable to young Chinese-speaking audiences. Number each post 1 through 5 with the title on the first line.';

  console.log('Generating Rednote drafts with Gemini...');
  const drafts = await generateWithRetry(model, prompt);
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
