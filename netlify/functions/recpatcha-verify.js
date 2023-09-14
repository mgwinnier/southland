const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { token } = JSON.parse(event.body);

  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: '6LcWrCYoAAAAAH0CfgFaBBBa3wpDah4kxMu0KGHe', // Replace with your reCAPTCHA secret key
        response: token,
      },
    });

    const { success } = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify({ success }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};


