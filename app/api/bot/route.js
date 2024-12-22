import fetch from 'node-fetch';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      throw new Error('Bot token or chat ID not configured.');
    }

    const text = `New Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    console.log(text, message, name, botToken, chatId);

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    const result = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API response:', result);
      throw new Error(`Telegram API Error: ${result.description}`);
    }

    return new Response(JSON.stringify({ message: 'Message sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return new Response(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
  }
}
