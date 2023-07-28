// source: https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest#oauth2
/* const {OAuth2Client} = require('google-auth-library');
const http = require('http');
const url = require('url');
const open = require('open');
const destroyer = require('server-destroy');

// Downloaded OAuth2 configuration JSON
const keys = require('./oauth2.keys.json')

// Creating a new OAuth2Client for authentication process
function getAuthenticatedClient() {
    return new Promise((resolve, reject) => {
      // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
      // which should be downloaded from the Google Developers Console.
      const oAuth2Client = new OAuth2Client(
        keys.web.client_id,
        keys.web.client_secret,
        "http://localhost:5500/auth_test2.html"
      );
  
      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      });
  
      // Open an http server to accept the oauth callback. In this simple example, the
      // only request to our webserver is to /oauth2callback?code=<code>
      const server = http
        .createServer(async (req, res) => {
          try {
            if (req.url.indexOf('/oauth2callback') > -1) {
              // acquire the code from the querystring, and close the web server.
              const qs = new url.URL(req.url, 'http://localhost:3000')
                .searchParams;
              const code = qs.get('code');
              res.end('Authentication successful! Please return to the console.');
              server.destroy();
  
              // Now that we have the code, use that to acquire tokens.
              const r = await oAuth2Client.getToken(code);
              // Make sure to set the credentials on the OAuth2 client.
              oAuth2Client.setCredentials(r.tokens);
              console.info('Tokens acquired.');
              resolve(oAuth2Client);
            }
          } catch (e) {
            reject(e);
          }
        })
        .listen(3000, () => {
          // open the browser to the authorize url to start the workflow
          open(authorizeUrl, {wait: false}).then(cp => cp.unref());
        });
      destroyer(server);
    });
  }
  
main().catch(console.error);

// Handling token events
const client = await auth.getClient();

client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
const res = await client.request({ url });
// The `tokens` event would now be raised if this was the first request

const tokens = await oauth2Client.getToken(code);
// Now `tokens` contains an access_token and an optional refresh_token. Save them.
oauth2Client.setCredentials(tokens);

// Generate the url that will be used for the consent dialog.
const authorizeUrl = oAuth2Client.generateAuthUrl({
    // To get a refresh token, you MUST set access_type to `offline`.
    access_type: 'offline',
    // set the appropriate scopes
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    // A refresh token is only returned the first time the user
    // consents to providing access.  For illustration purposes,
    // setting the prompt to 'consent' will force this consent
    // every time, forcing a refresh_token to be returned.
    prompt: 'consent'
  });

// after acquiring an oAuth2Client...
const tokenInfo = await oAuth2Client.getTokenInfo('my-access-token');
localStorage.setItem("token", tokenInfo);
console.log(tokenInfo); */

const { google } = require('googleapis');
const url = require('url');

// Downloaded OAuth2 configuration JSON
const keys = require('./oauth2.keys.json')

const oauth2Client = new google.auth.OAuth2(
    keys.web.client_id,
    keys.web.client_secret,
    "http://localhost:5500/auth_test2.html"
);

const scopes = [
    'https://www.googleapis.com/auth/drive.metadata/readonly'
];

// Generate a url that asks permissions for the Drive activity scope
const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true
  });

async function signIn() {
    // receive the callback from Google's OAuth 2.0 server
    if(req.url.startsWith('/oauth2callback')) {
        let q = url.parse(req.url, true).query;

        // get access tokens and refresh tokens (if access_type is offline)
        let { tokens } = await oauth2Client.getToken(q.code);
        localStorage.setItem("token_values", tokens);
        oauth2Client.setCredentials(tokens);
    }

    res.writeHead(301, { "Location": authorizationUrl });
}






