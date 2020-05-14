const registerOAuthRedirects = require('@phoenix/phnx-node-oauth/oauth-redirects');

module.exports = function(app) {
    registerOAuthRedirects(app, {
        clientId: "Real_Games_client", //Client ID that you registered your UI as
        clientSecret: "Real_Games", //Client secret that you gave while registering
        scopes: ["read", "write", "delete"], //Scopes that you gave while registering
        appBaseUrl: "http://localhost:3002", //Base URL where your application is hosted on. This along with the basepath above forms your URL. This is env sensitive
        appBasePath: "", //Proxy if you have any, or leave it empty string ""
        phoenixServicesBaseUrl: "https://qa.ird.mu-sigma.com/phoenix", //Base phoenix URLs, this example one is for the QA instance of phoenix services
        oauthServiceProxy: '/oauth-service',
        redirectRoute: "/"
    });
  };