// Import Required Libraries

import React, { Component } from "react";
import "../css/App.css";
import * as helperFunctions from "../utils/helperFunction";
import ReactTooltip from "react-tooltip";

// This is the first HUD on the Environment Side

class HUDagent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: {
        // default data
        eat: { current: 0 },
        drink: { current: 0 },
        sleep: { current: 0 }
      },
      listening: false
    };
  }

  componentDidMount() {
    // subscribe_ns() is a socket function which comes from App.js through props

    this.props.subscribe_ns("HUD_data", data => {
      this.setState({
        data: data
      });
    });
  }

  render() {
    return (
      // Self Explanatory
      <div id='Agentdiv'>
        <div style={{ cursor: "default" }} id='divname'>
          Activity Count By Hour
        </div>

        <img
          data-tip
          data-for='eatingtip'
          alt='cutlery'
          style={{
            position: "absolute",
            width: "2vw",
            left: "8%",
            bottom: "10.5%",
            cursor: "default"
          }}
          src='cutlery_.svg'
        />

        <div
          data-tip
          data-for='eatingtip'
          style={{
            position: "absolute",
            left: "17%",
            top: "32%",
            fontSize: "2vw",
            cursor: "default"
          }}
          ref='eat'
        >
          {helperFunctions.abbreviateNumber(
            parseInt(this.state.data.eat.current)
          )}
        </div>

        <div
          style={{
            position: "absolute",
            left: "16%",
            top: "65%",
            fontSize: "0.8vw",
            cursor: "default",
            paddingTop: 10
          }}
        >
          Eating
        </div>

        <img
          data-tip
          data-for='drinkingtip'
          alt='lemonade'
          style={{
            width: "3vw",
            height: "3vw",
            position: "absolute",
            bottom: "10.5%",
            left: "44%",
            cursor: "default"
          }}
          src='drink_.svg'
        />

        <div
          data-tip
          data-for='drinkingtip'
          style={{
            position: "absolute",
            left: "53%",
            top: "32%",
            fontSize: "2vw",
            cursor: "default"
          }}
          ref='drink'
        >
          {helperFunctions.abbreviateNumber(
            parseInt(this.state.data.drink.current)
          )}
        </div>

        <div
          style={{
            position: "absolute",
            left: "51%",
            top: "65%",
            fontSize: "0.8vw",
            paddingTop: 10,
            cursor: "default"
          }}
        >
          Drinking
        </div>

        <img
          data-tip
          data-for='sleepingtip'
          alt='slumber'
          style={{
            width: "3vw",
            height: "3vw",
            position: "absolute",
            bottom: "10.5%",
            left: "77%",
            cursor: "default"
          }}
          src='bedtime_.svg'
        />

        <div
          data-tip
          data-for='sleepingtip'
          style={{
            position: "absolute",
            left: "88%",
            top: "32%",
            fontSize: "2vw",
            cursor: "default"
          }}
          ref='sleep'
        >
          {helperFunctions.abbreviateNumber(
            parseInt(this.state.data.sleep.current)
          )}
        </div>
        <div
          style={{
            position: "absolute",
            left: "86%",
            top: "65%",
            fontSize: "0.8vw",
            paddingTop: 10,
            cursor: "default"
          }}
        >
          Sleeping
        </div>

        <ReactTooltip
          class='eatingtip'
          id='eatingtip'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                Number of agents
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  {" "}
                  eating
                </span>{" "}
                at the current hour across the US
              </div>
            </div>
          )}
          effect='solid'
          place={"top"}
          border={true}
          type={"light"}
        />

        <ReactTooltip
          class='drinkingtip'
          id='drinkingtip'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                Number of agents
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  {" "}
                  drinking
                </span>{" "}
                at the current hour across the US
              </div>
            </div>
          )}
          effect='solid'
          place={"top"}
          border={true}
          type={"light"}
        />

        <ReactTooltip
          class='sleepingtip'
          id='sleepingtip'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                Number of agents
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  {" "}
                  sleeping
                </span>{" "}
                at the current hour across the US
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

export default HUDagent;
