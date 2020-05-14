import 'aframe';
import 'aframe-meshline-component';
import 'aframe-extras';
import 'aframe-star-system-component';
// import 'aframe-animation-component'
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './components/zoomCamera';
import './components/clickDrag';
import './components/mouseEnterLeave';
import { SnackbarProvider, withSnackbar} from 'notistack';
// import './components/StarSystem'
import Button from '@material-ui/core/Button';
import { BrowserRouter } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
// import oauth2Context from './utils/SecurityContext.js'
import FinalLogin from './FinalLogin';

const MyApp = withSnackbar(FinalLogin);

// for development
ReactDOM.render(<BrowserRouter basename="/real-games">
    <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        autoHideDuration={2000}
        action={(
            <Button onClick={() => alert('hewllo world') }>
                {'Alert'}
            </Button>
        )}>
        <MyApp />
    </SnackbarProvider>
</BrowserRouter>, document.getElementById('root'));

// for deployment
// const config = require('./utils/config');
// oauth2Context.verifyToken();
// if (oauth2Context.isAuthenticated) {
//     console.log('token', oauth2Context.accessToken)
//     console.log("token details", oauth2Context.tokenInfo);
//     config.username = oauth2Context.tokenInfo.user_name
//     config.token = oauth2Context.accessToken
//     ReactDOM.render(<SnackbarProvider maxSnack={3}>
//         <MyApp/>
//     </SnackbarProvider>, document.getElementById('root'));
// } else {
//     oauth2Context.redirect();
// }



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
