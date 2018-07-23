const express = require("express");
const next = require("next");
const request = require("request");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

async function subscribe({ email }) {
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

app
    .prepare()
    .then(() => {
        const server = express();

        server.use(express.json());

        server.post('/api/v1/public/subscribe', async (req, res) => {
            const { email } = req.body;
            if (!email) {
              res.json({ error: 'Email is required' });
              return;
            }
          
            try {
              await subscribe({ email });
              res.json({ subscribed: 1 });
              console.log(email);
            } catch (err) {
              res.json({ error: err.message || err.toString() });
            }
          });

        server.get("/blog/:slug", (req, res) => {
            const actualPage = "/blog";
            const queryParams = { slug: req.params.slug, apiRoute: "post" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/page/:slug", (req, res) => {
            const actualPage = "/page";
            const queryParams = { slug: req.params.slug, apiRoute: "page" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/category/:slug", (req, res) => {
            const actualPage = "/category";
            const queryParams = { slug: req.params.slug };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/_preview/:id/:wpnonce", (req, res) => {
            const actualPage = "/preview";
            const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log("> The Falcon is live at http://localhost:3000");
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
