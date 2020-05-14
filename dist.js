const express = require("express");
const auth = require("http-auth");
// const registerOAuthRedirects = require('./oauth-redirects.js');

var app = express();

app.use("*", (req, res, next) => {
  // console.log(req.originalUrl);
  req.url = req.url.replace(/\/+/gi, "/");
  next();
});

// registerOAuthRedirects(app, {
//     clientId: "Real_Games_client", //Client ID that you registered your UI as
//     clientSecret: "Real_Games", //Client secret that you gave while registering
//     scopes: ["read", "write", "delete"], //Scopes that you gave while registering
//     appBaseUrl: `https://dev.ird.mu-sigma.com/`, //Base URL where your application is hosted on. This along with the basepath above forms your URL. This is env sensitive
//     appBasePath: "/real-games", //Proxy if you have any, or leave it empty string ""
//     phoenixServicesBaseUrl: "https://qa.ird.mu-sigma.com/phoenix", //Base phoenix URLs, this example one is for the QA instance of phoenix services
//     oauthServiceProxy: '/oauth-service',
//     redirectRoute: "/"
// });

const basic = auth.basic(
  {
    realm: "Web."
  },
  function(username, password, callback) {
    callback(username === "musigma" && password === "Crunchdata!");
  }
);
//    app.use(auth.connect(basic));
app.use("*/*.gltf", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
app.use("/", express.static("./build"));
app.use("/real-games/", express.static("./build"));
app.listen(3001);

// console.log('listening on 3001');
