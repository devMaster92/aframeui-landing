// Import the required Libraries

import React, { Component } from "react";
import Highcharts from "highcharts";
import CircularProgress from "@material-ui/core/CircularProgress";

class FixedColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Default data
      mappings: {
        // Mapping from the data from the orchestrator to the data on the graph
        printmedia: "Print Media",
        billboard: "Billboard",
        digitalmedia: "Digital Media",
        radio: "Radio",
        tv: "Television"
      },
      categories: [], // Categories (Advertisement Channels)
      title: null,
      colors: ["#89c2f5", "#3f5185"] // Colors for the fixed column chart
    };
  }
  componentDidMount() {
    // subscribe_ns() is a socket function which comes from GoldenView through props

    this.props.subscribe_ns("channel_ad_reach", data => {
      // Function to convert the data into the required format (Visit https://www.highcharts.com/demo/column-placement)
      var d = [];
      var b = Object.keys(data["ChannelReach"]);
      var c = Array.from(b);

      var temp = {};
      temp["name"] = "Channel Reach";
      temp["color"] = this.state.colors[1];
      temp["pointPadding"] = 0.3;
      var data1 = [];
      for (var i = 0; i < b.length; i++) {
        let temp_ch = sessionStorage.getItem("TotalAgentsS")
          ? parseInt(sessionStorage.getItem("TotalAgentsS"))
          : 250;

        data1.push((data["ChannelReach"][b[i]] * 100) / temp_ch);
        c[i] = this.state.mappings[c[i]];
      }
      temp["data"] = data1;
      d.push(temp);

      var temp2 = {};
      temp2["name"] = "Ad Reach";
      temp2["color"] = this.state.colors[0];
      temp2["pointPadding"] = 0.4;
      var data2 = [];
      for (var j = 0; j < b.length; j++) {
        let temp_ad = sessionStorage.getItem("TotalAgentsS")
          ? parseInt(sessionStorage.getItem("TotalAgentsS"))
          : 250;
        data2.push((data["AdReach"][b[j]] * 100) / temp_ad);
      }
      temp2["data"] = data2;
      d.push(temp2);

      this.setState({
        data: d,
        categories: c
      });
    });
  }

  componentDidUpdate(oldProps) {
    this.loadBarChart();
    // Function to Load the Fixed ColumnChart (Please don't get confused because the name of the function is loadBarChart(). We are loading Fixed)
  }

  loadBarChart() {
    // Options for FixedColumnChart
    if (this.state.data.length > 0) {
      Highcharts.chart(this.refs.fixedcolumn, {
        chart: {
          type: "column"
        },
        credits: {
          enabled: false
        },
        title: {
          text: "Promotion Reach"
        },
        xAxis: {
          categories: this.state.categories
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal"
                },
                yAxis: {
                  labels: {
                    align: "left",
                    x: 0,
                    y: -5
                  },
                  title: {
                    text: null
                  }
                },
                subtitle: {
                  text: null
                },
                credits: {
                  enabled: false
                }
              }
            }
          ]
        },

        yAxis: {
          min: 0,
          title: {
            text: "Percentage"
          },
          max: 100,
          labels: {
            format: `{value}%`
          }
        },
        legend: {
          shadow: false
        },
        tooltip: {
          shared: true,
          valueSuffix: "%"
        },
        plotOptions: {
          series: {
            animation: false
          },
          column: {
            grouping: false,
            shadow: false,
            borderWidth: 0
          }
        },
        series: this.state.data
      });
    }
  }

  render() {
    // If there is data
    if (this.state.data.length > 0) {
      return (
        <div
          style={{ width: "100%", margin: "0 auto", minHeight: "500px" }}
          ref='fixedcolumn'
        />
      );
    }

    // If there is no data  but the simulation has started
    else if (sessionStorage.getItem("simStarted") === "true") {
      return (
        <div className='graphLoader'>
          <CircularProgress size={80} />
        </div>
      );
    }

    // If there is no data and the simulation hasn't started yet
    else {
      return (
        <div className='noSimText'>
          Start simulation in order to view results
        </div>
      );
    }
  }
}

export default FixedColumnChart;
