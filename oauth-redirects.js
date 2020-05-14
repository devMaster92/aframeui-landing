const ClientOAuth2 = require('client-oauth2');
// clientId, clientSecret, phoenixServicesBaseUrl = "https://qa.ird.mu-sigma.com/phoenix/", appBaseUrl = 'https://qa.ird.mu-sigma.com', scopes, redirectRoute = "/app", appBasePath, localRedirectUri = "https://localhost:3000", accessTokenRoute, authTokenRoute
module.exports = function addOAuthRedirects(app, options) {

    //Replace start and ed '/' with ''  
    var basePath = options.appBasePath.replace(/(^\/+|\/+$)/g, "");
    var redirectRoute = options.redirectRoute.replace(/(^\/+|\/+$)/g, "");

    var oauthServiceProxy = options.oauthServiceProxy || "/oauth-service"
    var accessTokenRoute = options.accessTokenRoute || (oauthServiceProxy + "/oauth/token");
    var authTokenRoute = options.authTokenRoute || (oauthServiceProxy + "/oauth/authorize");
    var redirectUri = options.appBaseUrl.replace(/\/+$/, "") + "/" + basePath + "/auth/callback";
    var getTokenUriPrefix = options.appBaseUrl.replace(/\/+$/, "") + "/" + basePath;
    var finalRedirectPath = options.finalRedirectPath;

    var phoenixAuth = new ClientOAuth2({
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        accessTokenUri: options.phoenixServicesBaseUrl.replace(/\/+$/, "") + accessTokenRoute,
        authorizationUri: options.phoenixServicesBaseUrl.replace(/\/+$/, "") + authTokenRoute,
        redirectUri: redirectUri,
        scopes: options.scopes
    });

    var authLogin = new RegExp(`\\/(${basePath})?\\/auth\\/login`);
    var authCallback = new RegExp(`\\/(${basePath})?\\/auth\\/callback`);
    var getTokenUrlRegex = new RegExp(`(${basePath}\\/)+`);

    app.get(authLogin, function(req, res) {
        var uri = phoenixAuth.code.getUri();
        console.log('to redirect',uri,'TimeStamp',new Date(),'Method',req.method)

        res.redirect(uri);
    });

    app.get(authCallback, function(req, res) {
        let getTokenUrl = getTokenUriPrefix + req.originalUrl.replace(/\/+/g, "/");
        getTokenUrl = getTokenUrl.replace(getTokenUrlRegex, "$1");
        phoenixAuth.code.getToken(getTokenUrl).then(function(user) {
            let r = finalRedirectPath || (getTokenUriPrefix + "/" + redirectRoute);
            return res.redirect( r + "?token=" + user.accessToken);
        }).catch(err => res.status(500).send("Internal server error \n" + err));
    });
};
