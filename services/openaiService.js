const axios = require('axios');

exports.getAIResponse = async (businessName, tone, faqs, userMessage) => {
 const prompt = `
You are Moaawen, a  customer support assistant for "${businessName}".
Respond in Arabic 

business info:
phone: 76962359
email: hdsfb@gmail.com
address: beirut, downtown

IMPORTANT: At the end of your answer, **always** write on a new line:
CONFIDENCE=XX
Where XX is a number between 0 and 100 that represents how confident you are in your reply.

If you're not sure, choose a value below 80.

FAQs:
${faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}
`;



  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4.1-nano',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: userMessage }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
};
