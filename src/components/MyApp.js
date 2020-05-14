// Import Required Libraries

import React from "react";
import "../css/App.css";
import App from "../App";
import { SnackbarProvider, withSnackbar } from "notistack";
const Myapp = withSnackbar(App);

// Wrapper for App.js for using the SnackBar

class MyApp extends React.Component {
  render() {
    return (
      <div>
        <SnackbarProvider maxSnack={3} preventDuplicate autoHideDuration={2000} >
          <Myapp />
        </SnackbarProvider>
      </div>
    );
  }
}

export default MyApp;
