const axios = require('axios');

exports.handler = async (event, context) => {
  const token = event.body.token;

  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: '6LcWrCYoAAAAAH0CfgFaBBBa3wpDah4kxMu0KGHe',
        response: token,
      },
    });

    const isSuccess = response.data.success;
    if (isSuccess) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: response.data['error-codes'] }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};