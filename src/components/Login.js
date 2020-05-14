// Import required Libraries

import React, { Component } from "react";
var CryptoJS = require("crypto-js");
const config = require("../utils/config");

class Login extends Component {
  constructor() {
    super();
    this.state = {
      // default state where the username and password fields are empty
      username: "",
      password: "",
      loggedIn: false,
      matrixInterval: null,
      firstRenders: -1
    };
    window.sessionStorage.removeItem("username");
  }

  updateValue(e) {
    // Function to update the Username and Password
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  componentDidMount() {
    if (!this.state.loggedIn) this.renderMatrix();
    document.addEventListener("keypress", e => {
      let key = e.which;

      if (key === 13) {
        this.doLogin();
      }
    });
  }

  doLogin() {
    // Function to authenticate login
    const data = this.state;
    data.password = CryptoJS.AES.encrypt(
      // Encrypting the password while sending it to the orchestrator
      this.state.password,
      "worldCup!"
    ).toString();

    return fetch(config.api.url + "login", {
      // Send the username and password to the orchestrator for authentication
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        // If response is OK, set config.username
        config.username = data.username;
        this.setState({ loggedIn: true });
      } else {
        // display wrong password or username if authentication is unsuccessful
        document.getElementById("unsuccessful").style.display = "block";
      }
      return response.json();
    });
  }

  resetFields() {
    // Reset the username and password
    this.setState({ username: "", password: "" });
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("unsuccessful").style.display = "none";
  }

  renderMatrix() {
    // Render the matrix canvas on the login page
    const self = this;
    const c = document.getElementById("matrixCanvas");
    const ctx = c.getContext("2d");

    c.height = window.innerHeight;
    c.width = window.innerWidth;

    let letters =
      "12#anoopπµΣστΦφΩ#sameerπµΣστΦφΩ#maheshπµΣστΦφΩ#kattaπµΣστΦφΩ#DebπµΣστΦφΩ#smitπµΣστΦφΩ#vishnuπµΣστΦφΩ#satyaπµΣστΦφΩΘ#yashuπµΣστΦφΩ";
    letters = letters.split("");
    const font_size = 12;
    const columns = c.width / font_size; //number of columns for the rain
    //an array of drops - one per column
    const drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (let x = 0; x < columns; x++) drops[x] = 1;

    //drawing the characters
    function draw() {
      //Black BG for the canvas
      //translucent BG to show trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "#4399ff";
      ctx.font = font_size + "px arial";
      //looping over drops
      for (let i = 0; i < drops.length; i++) {
        //a random character to print
        let text = letters[i % letters.length];
        // let text = names[Math.floor(i % names.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975) {
          drops[i] = 0;
          if (self.state.firstRenders === -1) {
            self.setState({
              firstRenders: 0
            });
          }
        }

        //incrementing Y coordinate
        drops[i]++;
      }
      if (self.state.firstRenders === -1) {
        setTimeout(draw, 20);
      } else if (self.state.firstRenders === 0) {
        const interval = setInterval(draw, 75);
        self.setState({
          matrixInterval: interval,
          firstRenders: 1
        });
      }
    }

    setTimeout(draw, 20);
  }
  collapse(e) {
    e.currentTarget.parentElement.classList.toggle("collapsed");
  }
  render() {
    // Self Explanatory
    const state = this.state;
    if (state.loggedIn) {
      if (state.matrixInterval !== null) {
        clearInterval(state.matrixInterval);
      }
      return this.props.children;
    } else
      return (
        <div
          style={{ zIndex: "1000000000000000000000" }}
          className='login-screen'
        >
          <canvas id='matrixCanvas' />
          <div className='left-panel'>
            <p>Welcome to</p>

            <img alt='Real Games' src='realgames.png' />
          </div>
          <div className='right-panel'>
            <div className='login-container'>
              <a
                href='https://qa.ird.mu-sigma.com/gitbook/Real_Games/_book/#architecture'
                target='_blank'
                rel='noopener noreferrer'
                style={{ float: "right", textDecoration: "none" }}
              >
                ⓘ
              </a>
              <div className='logo_sigma'>
                <img alt='logo' src='mu-sigma-logo.png' />
              </div>

              <div className='margin-5'>
                <div>Sign in with InD credentials</div>
              </div>

              <div className='margin-5'>
                <input
                  id='username'
                  className='input'
                  type='text'
                  name='username'
                  placeholder='Username'
                  onChange={this.updateValue.bind(this)}
                  value={state.username}
                />
                <input
                  id='password'
                  className='input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={this.updateValue.bind(this)}
                  value={state.password}
                />
                <div
                  style={{ display: "none", color: "red" }}
                  id='unsuccessful'
                >
                  Wrong Username or Password
                </div>
              </div>
              <div className='margin-5' />
              <div className='margin-5'>
                <div className='btn' onClick={this.doLogin.bind(this)}>
                  Login
                </div>
                <div className='btn' onClick={this.resetFields.bind(this)}>
                  Reset
                </div>
              </div>
              <div className='version'>
                <a
                  href='https://qa.ird.mu-sigma.com/gitbook/Real_Games/_book/ReleaseInfo.html#version-190701'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  19.07.01
                </a>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Login;
