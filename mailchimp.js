import request from 'request';

export async function subscribe({ email }) {
  const data = {
    email_address: email,
    status: 'subscribed',
  };

  const listId = 'cd650760a2';
  const API_KEY = '8b4f1c7b38b0f65530ba85f7faafc8fc-us2';

  await new Promise((resolve, reject) => {
    request.post(
      {
        uri: `https://us2.api.mailchimp.com/3.0/lists/${listId}/members/`,
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${Buffer.from(`apikey:${API_KEY}`).toString('base64')}`,
        },
        json: true,
        body: data,
      },
      (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      },
    );
  });
}