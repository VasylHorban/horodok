import fetch from 'node-fetch';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN; // Ensure these are set in .env.local
    const chatId = process.env.TELEGRAM_CHAT_ID; // Ensure these are set in .env.local

    const text = `New Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message || '-'}`;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    console.log(telegramResponse, ' telegramResponse');

    if (!telegramResponse.ok) {
      throw new Error(`Telegram API Error: ${telegramResponse.statusText}`);
    }

    return new Response(JSON.stringify({ message: 'Message sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
