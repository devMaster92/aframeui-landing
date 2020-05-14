// Import Required Libraries

import React, { Component } from "react";
import "../css/ActivityCount.css";
import BarChart from "./BarChart";
import CircularProgress from "@material-ui/core/CircularProgress";

class ActivityCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] // default data
    };
  }
  componentDidMount() {
    // subscribe_ns() is a socket function which comes from Goldenview.js through props

    this.props.subscribe_ns("activity_distribution", data => {
      this.setState({
        SleepData: data.SleepFlag,
        EatData: data.EatFlag,
        DrinkData: data.DrinkFlag
      });
    });
  }

  componentDidUpdate() {}

  render() {
    // Renders three HighCharts Bar Charts using the BarChart Component (One for each agent state)

    if (this.state.SleepData) {
      return (
        // eat state

        <div className='ActivityControl'>
          <div className='eat'>
            <BarChart
              data={this.state.EatData}
              title={"Agent Eating Behaviour"}
              //   eslint-disable-next-line
              xAxis={"No of times agents" + " eat in a day"}
              color={"#E25759"}
            />
          </div>
          <br />
          {/* sleep state */}
          <div className='sleep'>
            <BarChart
              data={this.state.SleepData}
              title={"Agent Sleeping Behaviour"}
              //   eslint-disable-next-line
              xAxis={"No of hours agents" + " sleep in a day"}
              color={"#75B7B2"}
            />
          </div>
          <br />

          {/* drink state */}

          <div className='drink'>
            <BarChart
              data={this.state.DrinkData}
              //   eslint-disable-next-line
              title={"Agent Drinking" + " Behaviour"}
              //   eslint-disable-next-line
              xAxis={"No of times agents" + " drink in a day"}
              color={"#F28E2B"}
            />
          </div>
        </div>
      );

      // If simulation hasn't started yet, use Material loader
    } else if (sessionStorage.getItem("simStarted") === "true") {
      return (
        <div className='graphLoader'>
          <CircularProgress size={80} />
        </div>
      );

      // If Simulation hasn't started yet, show the following text
    } else {
      return (
        <div className='noSimText'>
          Start simulation in order to view results
        </div>
      );
    }
  }
}

export default ActivityCount;
