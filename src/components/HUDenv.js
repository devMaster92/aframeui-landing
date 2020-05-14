// Import Required Libraries

import React, { Component } from "react";
import "../css/App.css";
import ReactTooltip from "react-tooltip";

// This is the temperature HUD that is being used on both the environment side and the markeing side
class HUDenv extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      temp: 20
    };
  }

  componentDidMount() {
    // subscribe_ns() is a socket function which comes from App.js through props
    this.props.subscribe_ns("HUD_data", data => {
      this.setState({
        temp: parseFloat(data.temperature).toFixed(2) // Temperature in Celcius
      });
    });
  }

  render() {
    return (
      <div
        style={{ width: "13%", borderRight: "2px solid #344955" }}
        id='tempdiv'
      >
        <div id='divname' />

        <img
          data-tip
          data-for='temptool'
          alt='temperature'
          style={{
            position: "absolute",
            width: "3vw",
            left: "2%",
            bottom: "10%",
            cursor: "default"
          }}
          src='thermometer_.svg'
        />

        <div
          data-tip
          data-for='temptool'
          style={{
            position: "absolute",
            left: "35%",
            top: "32%",
            fontSize: "2vw",
            cursor: "default"
          }}
          ref='eat'
        >
          {this.state.temp}°C
        </div>

        <div
          style={{
            width: "fit-content",
            fontSize: "0.8vw",
            top: "78%",
            left: "32%",
            cursor: "default",
            position: " absolute"
          }}
        >
          Temperature
        </div>

        <ReactTooltip // Tootip when hovered on the temperature
          class='temperaturetooltip'
          id='temptool'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  Average temperature of states
                </span>{" "}
                across the US
              </div>
            </div>
          )}
          effect='solid'
          place={"top"}
          border={true}
          type={"light"}
        />
      </div>
    );
  }
}

export default HUDenv;
