// Import required Libraries

import React, { Component } from "react";
import Highcharts from "highcharts";
import CircularProgress from "@material-ui/core/CircularProgress";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] // default data
    };
  }

  componentDidMount() {
    const seriesData = [{ name: "data", data: [] }];
    for (let i = 1; i < this.props.data.length; i++) {
      seriesData[0].data.push(this.props.data[i][1]);
    }
    this.loadBarChart(seriesData);
  }

  componentDidUpdate() {
    // Format the data coming from props into the required format

    // Visit https://www.highcharts.com/demo/column-basic for more info on how to format the data

    const seriesData = [{ name: "data", data: [] }];
    for (let i = 1; i < this.props.data.length; i++) {
      seriesData[0].data.push(this.props.data[i][1]);
    }

    this.loadBarChart(seriesData); // Function to load the BarChart
  }

  loadBarChart(data) {
    // Load only if there is data
    if (data.length > 0) {
      // HighCharts column chart options (Visit https://www.highcharts.com/demo/column-basic)

      Highcharts.chart(this.refs.BarChart, {
        chart: {
          type: "column",
          height: "50%"
        },
        colors: [`${this.props.color}`],
        title: {
          text: `${this.props.title}`
        },
        xAxis: {
          categories: [],
          title: {
            text: `${this.props.xAxis}`
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "No of instances"
          }
        },
        credits: {
          enabled: false
        },
        tooltip: {
          enabled: true
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          column: {
            animation: false,
            borderWidth: 0
          },
          series: {
            groupPadding: 0
          }
        },
        series: data
      });
    }
  }

  render() {
    // Show bar chart if there is data

    if (this.props.data.length > 0) {
      return <div style={{ paddingTop: "10px" }} ref='BarChart' />;
    }

    // If there is no data and simulation is started
    else if (sessionStorage.getItem("simStarted") === "true") {
      return (
        <div className='graphLoader'>
          <CircularProgress size={80} />
        </div>
      );
    }

    // If simulation hasn't started, show the following text
    else {
      return (
        <div className='noSimText'>
          Start simulation in order to view results
        </div>
      );
    }
  }
}

export default BarChart;
