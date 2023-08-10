/*
 * https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#creatingcred
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
    var token;
    
    // Check if the token is present in the URL to make sure we have not already completed the authentication
    var urlParts = new URLSearchParams(window.location.hash);
    console.log(urlParts);
    if(urlParts.get("access_token")) {
      token = urlParts.get("access_token");
      localStorage.setItem("token", token);
      console.log("Token received.");

      // Clear in progress flag (isInProgress)
      localStorage.removeItem("isInProgress");
      console.log("Authentication completed.");
      return;
    }

    // Check if token already exists and is not expired
    token = localStorage.getItem("token");
    console.log(token);
    if(token && !isTokenExpired(token)) {
      console.log("Token already exists. Skipping authentication.");
      return;
    }

    // Check if authentication has been initiated and is in progress
    var isInProgress = localStorage.getItem("isInProgress");
    if(isInProgress === "true") {
      console.log("Authentication in progress...");
      return;
    }

    // Mark authentication as in progress
    localStorage.setItem("isInProgress", "true");

    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '602335226495-psmg90rl7i66pctfokhf77odr92n335d.apps.googleusercontent.com',
                  'redirect_uri': 'http://localhost:5500/test.html',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                  'include_granted_scopes': 'true',
                  'state': 'pass-through value'};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

// Function to split returned portion of URL into pieces that can be accessed by name (key)
function parseURL() {
  var urlFragment = window.location.hash.substring(1);
  var splitURL = new URLSearchParams(urlFragment);

  return splitURL;
}

// Function to get the access token from the split URL
function getToken() {
  var token = parseURL().get("access_token");
  return token;
}

// Function to check if token is expired
function isTokenExpired() {
  var expiry = parseURL().get("expires_in");
  var currentTime = Math.floor(Date.now() / 1000); // get current time in seconds

  return expiry <= currentTime; 
}