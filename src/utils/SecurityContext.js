import { Oauth2SecurityContext } from '@phoenix/security-context';
const config = require('./config.js')
const oauth2Context = new Oauth2SecurityContext({
    appname: 'Real_Games',
    phoenixServicesBaseUrl: 'https://qa.ird.mu-sigma.com/phoenix',
    appBaseUrl: `${config.orcUrl}`,
    loginUrl: `${config.orcUrl}auth/login`,
    appBasePath: '',
    oauthServiceProxy: "/oauth-service",
    cookieValidation: false,
    clientId: "Real_Games_client"
  });
export default  oauth2Context