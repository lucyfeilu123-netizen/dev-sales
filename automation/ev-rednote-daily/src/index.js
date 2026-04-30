const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodemailer = require('nodemailer');

async function generateRednoteDrafts() {
  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Generate 5 engaging Xiaohongshu (Rednote / 小红书) post drafts for an EV car technician content creator based in San Francisco.

Each post should:
- Have a catchy title with emojis
- Be written in a mix of Chinese and English (Chinglish style is fine)
- Be 100-150 words
- Include 5-8 relevant hashtags (#小红书 #新能源 #电动车 style)
- Cover topics like: EV repair tips, life in SF, behind-the-scenes at the shop, car maintenance advice, or funny/relatable work stories
- Sound authentic, fun, and relatable to young Chinese-speaking audiences

Format each post clearly numbered 1 through 5, with the title on the first line.`;

  console.log('🤖 Generating Rednote drafts with Gemini...');
  const result = await model.generateContent(prompt);
  const drafts = result.response.text();
  console.log('✅ Drafts generated!');

  // Send via Gmail
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
    subject: `📝 Your Daily Rednote Drafts - ${today}`,
    text: `Hi Lucy! 🌸\n\nHere are your 5 Rednote drafts for ${today}:\n\n${drafts}\n\n---\nHappy posting! ♥️\nYour Daily Rednote Bot`,
  });

  console.log(`📧 Drafts emailed to ${process.env.RECIPIENT_EMAIL}`);
}

generateRednoteDrafts().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
