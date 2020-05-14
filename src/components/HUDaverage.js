// Import Required Libraries

import React, { Component } from "react";
import "../css/HUDaverage.css";
import ReactTooltip from "react-tooltip";

// Second HUD on the Environment side

class HUDaverage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      // deafult state data
      eat_24: 0,
      drink_24: 0,
      sleep_24: 0
    };
  }

  componentDidMount() {
    // Function to convert data into required format (Only executes after 24 hours)
    let counter = 1;
    this.props.subscribe_ns("HUD_data", data => {
      let eat =
        Object.keys(data.eat.all.total).filter(key => {
          return data.eat.all.total[key].name === "1";
        }).length > 0
          ? (
              data.eat.all.total[
                Object.keys(data.eat.all.total).filter(key => {
                  return data.eat.all.total[key].name === "1";
                })
              ].count /
              data.totalAgents /
              (data.currentTick / 24)
            ).toFixed(1)
          : 0;

      let sleep =
        Object.keys(data.sleep.all.total).filter(key => {
          return data.sleep.all.total[key].name === "1";
        }).length > 0
          ? (
              data.sleep.all.total[
                Object.keys(data.sleep.all.total).filter(key => {
                  return data.sleep.all.total[key].name === "1";
                })
              ].count /
              data.totalAgents /
              (data.currentTick / 24)
            ).toFixed(1)
          : 0;

      let drink =
        Object.keys(data.drink.all.total).filter(key => {
          return data.drink.all.total[key].name === "1";
        }).length > 0
          ? (
              data.drink.all.total[
                Object.keys(data.drink.all.total).filter(key => {
                  return data.drink.all.total[key].name === "1";
                })
              ].count /
              data.totalAgents /
              (data.currentTick / 24)
            ).toFixed(1)
          : 0;

      if (
        (data.currentTick % 23 === 0 && data.currentTick !== 0) ||
        (counter === 1 && data.currentTick > 24) || (sessionStorage.getItem('simCompleted') === 'true')
      ) {
        this.setState({
          eat_24: eat,
          drink_24: drink,
          sleep_24: sleep
        });
      }

      counter = counter + 1;
    });
  }

  render() {
    // Self Explanatory
    return (
      <div id='envdiv'>
        <div style={{ cursor: "default" }} id='divname'>
          Average Activity Occurrences
        </div>

        <img
          data-tip
          data-for='eatingavg'
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
          data-for='eatingavg'
          style={{
            position: "absolute",
            left: "19%",
            top: "32%",
            fontSize: "2vw",
            cursor: "default"
          }}
          ref='eat'
        >
          {this.state.eat_24}
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
          Times/Day
        </div>

        <img
          data-tip
          data-for='drinkingavg'
          alt='lemondae'
          style={{
            width: "3vw",
            height: "3vw",
            position: "absolute",
            bottom: "10.5%",
            cursor: "default",
            left: "45%"
          }}
          src='drink_.svg'
        />

        <div
          data-tip
          data-for='drinkingavg'
          style={{
            position: "absolute",
            left: "55%",
            top: "32%",
            fontSize: "2vw",
            cursor: "default"
          }}
          ref='drink'
        >
          {this.state.drink_24}
        </div>

        <div
          style={{
            position: "absolute",
            left: "52%",
            top: "65%",
            fontSize: "0.8vw",
            paddingTop: 10,
            cursor: "default"
          }}
        >
          Times/Day
        </div>

        <img
          data-tip
          data-for='sleepingavg'
          alt='slumber'
          style={{
            width: "3vw",
            height: "3vw",
            position: "absolute",
            bottom: "10.5%",
            cursor: "default",
            left: "78%"
          }}
          src='bedtime_.svg'
        />

        <div
          data-tip
          data-for='sleepingavg'
          style={{
            position: "absolute",
            left: "90%",
            top: "32%",
            fontSize: "2vw",
            cursor: "default"
          }}
          ref='sleep'
        >
          {this.state.sleep_24}
        </div>

        <div
          style={{
            position: "absolute",
            left: "87%",
            top: "65%",
            cursor: "default",
            fontSize: "0.8vw",
            paddingTop: 10
          }}
        >
          Hours/Day
        </div>

        <ReactTooltip
          class='eatingtip'
          id='eatingavg'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                Average number of times an agent
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  {" "}
                  eats
                </span>{" "}
                in a day across the US
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
          id='drinkingavg'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                Average number of times an agent
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  {" "}
                  drinks
                </span>{" "}
                in a day across the US
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
          id='sleepingavg'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                Average number of hours an agent
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  {" "}
                  sleeps
                </span>{" "}
                in a day across the US
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

export default HUDaverage;
