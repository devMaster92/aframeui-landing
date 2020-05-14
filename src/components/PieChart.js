// Import Required Libraries

import React, { Component } from "react";
import Highcharts from "highcharts";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  componentDidMount() {
    // Function to Load the Chart

    this.loadWindroseChart(this.props.data);
  }

  componentDidUpdate() {
    // Function to Load the Chart

    this.loadWindroseChart(this.props.data);
  }

  loadWindroseChart(data) {
    // Options for the Pie Chart (Visit HighCharts Documentation for more information)
    Highcharts.chart(this.refs.pies, {
      chart: {
        backgroundColor: "rgb(210, 219, 224)",
        plotBackgroundColor: "rgb(210, 219, 224)",
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        animation: false
      },
      title: {
        text: "Market share based on units sold"
      },
      tooltip: {},
      colors: ["#2F32D1", "#7DAD24", "#F2B705", "#A60303", "#A6038B"],

      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          animation: false
        },
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                "black"
            }
          }
        }
      },

      series: [this.props.data]
    });
  }

  render() {
    // Self Explanatory
    return (
      <div
        style={{
          backgroundColor: "rgb(210, 219, 224)",
          paddingTop: "20px",
          // minWidth: "240px",
          //maxWidth: "500px",
          margin: "0 auto",
          height: "300px"
        }}
        ref='pies'
      />
    );
  }
}

export default PieChart;
