/*
 * https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#creatingcred
 * Create form to request access token from Google's OAuth 2.0 server.
 */


/* 
function checkAuth() {
    var token = localStorage.getItem("token");
    var tokenTimestamp = localStorage.getItem("tokenTimestamp");

    // Check if the token is present in the URL and then check if it is still valid
    var urlParts = new URLSearchParams(window.location.search);
    if (urlParts.has("access_token")) {
      if(!isTokenExpired()) {
        token = urlParts.get("access_token");
        tokenTimestamp = Math.floor(Date.now() / 1000);
      }
      token = urlParts.get("access_token");
      tokenTimestamp = Math.floor(Date.now() / 1000); // get current time in seconds
      localStorage.setItem("token", token);
      localStorage.setItem("tokenTimestamp", tokenTimestamp);
      console.log("Token received.");
    } else if(!token || isTokenExpired(tokenTimestamp)) {
      console.log("Token already exists. Skipping authentication.");
      return;
    }

    signIn();
}
*/

function signIn() {
  console.log("Redirecting...");
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '602335226495-psmg90rl7i66pctfokhf77odr92n335d.apps.googleusercontent.com',
                'redirect_uri': 'http://localhost:5500/auth_test.html',
                'response_type': 'token',
                'scope': 'https://storage.googleapis.com/storage/v1/b/broad-dsde-methods-long-reads/o/',
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
  localStorage.setItem("token", token);
  return token;
}

function generateIGV(token_value) {
    var igvDiv = document.getElementById("igv_div");
    console.log(token_value);
    var options =
    {
        oauthToken: token_value,
        locus: 'Pf3D7_03_v3:500000',
        reference: {
            "id": "pfalciparum",
            "name": "P. falciparum",
            "fastaURL": "gs://broad-dsde-methods-long-reads/resources/references/plasmodb_release-61/Pfalciparum3D7/fasta/data/PlasmoDB-61_Pfalciparum3D7_Genome.fasta",
            "indexURL": "gs://broad-dsde-methods-long-reads/resources/references/plasmodb_release-61/Pfalciparum3D7/fasta/data/PlasmoDB-61_Pfalciparum3D7_Genome.fasta.fai",
            "tracks": [
                {
                    "name": "Genes",
                    "url": "gs://broad-dsde-methods-long-reads/resources/references/pfalciparum3D7/PlasmoDB-46_Pfalciparum3D7.gff",
                    "order": 1000000
                }]
            }
    };
  
    igv.createBrowser(igvDiv, options);
}

// Function to check if token is expired
function isTokenExpired(tokenTimestamp) {
  var expirySeconds = parseInt(parseURL().get("expires_in"));
  var currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

  if(!tokenTimestamp) {
    // tokenTimestamp is null, consider the token as expired
    return true;
  }

  var elapsedSeconds = currentTime - tokenTimestamp;
  console.log(elapsedSeconds);
  console.log(expirySeconds);


  return elapsedSeconds >= expirySeconds; 
}

