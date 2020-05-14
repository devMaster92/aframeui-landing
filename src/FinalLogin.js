import React from "react";
import "./css/App.css";
import Login from "./components/Login.js";
import { Route, Switch, Redirect } from "react-router-dom";
// import App from "./App";
import MyApp from "./components/MyApp";

// import GlobalEvents from './utils/global-events'

// const MyApp = withSnackbar(FinalLogin);

class FinalLogin extends React.Component {
  render() {
    return (
      <div className='Header'>
        <Login>
          <Switch>
            <Route exact path='/' component={MyApp} />
            {/* <Route path="/app" component={App}/> */}
            <Redirect to='/' />
          </Switch>
        </Login>
      </div>
    );
  }
}

export default FinalLogin;
