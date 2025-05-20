const nodemailer = require('nodemailer');

exports.sendDraftToBusiness = async (toEmail, originalMsg, draftReply, confidence) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Moaawen.ai" <${process.env.EMAIL_USER}>`,
    to: `ezedinyoussef@gmail.com`,
    subject: `Low Confidence Reply from Moaawen.ai`,
    text: `
Original customer message:
${originalMsg}

AI-generated draft reply (confidence: ${confidence}%):
${draftReply}
    `
  };

  await transporter.sendMail(mailOptions);
};
