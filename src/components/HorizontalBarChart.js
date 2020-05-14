// Import the required Libraries

import React, { Component } from "react";
import Highcharts from "highcharts";

class HorizontalbarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // default data
      title: null,
      colors: ["#2F32D1", "#7DAD24", "#F2B705", "#A60303", "#A6038B"] // default colors
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.data,
      colors: this.props.colors
    });
  }

  componentDidUpdate(oldProps) {
    this.loadBarChart(); // Function for loading the bar chart
  }

  loadBarChart() {
    if (this.props.data.length > 0) {
      // If there is data
      Highcharts.chart(this.refs.horizontalBar, {
        chart: {
          // Chart Options
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "bar",
          backgroundColor: this.props.color || "#D2DBE0"
        },
        title: {
          // Title Options
          text: this.props.title || this.state.title,
          style: {
            fontSize: "0.8vw",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }
        },
        credits: {
          enabled: false
        },
        tooltip: {
          // Tooltip Options
          enabled: this.props.tooltip,
          valueSuffix: "%"
        },
        colors: this.state.colors,
        plotOptions: {
          series: {
            animation: false // Remove Animation
          },
          bar: {
            dataLabels: {
              enabled: !this.props.tooltip,
              format: this.props.label,
              style: {
                color: "#4f412e",
                fontSize: "0.7vw"
              }
            },
            colorByPoint: true
          }
        },
        xAxis: {
          // xAxis Options
          type: "category",
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            style: {
              fontSize: "0.6vw",
              color: "#333333"
            }
          }
        },

        yAxis: {
          // yAxis Options
          title: {
            text: this.props.yTitle,
            style: {
              fontSize: "0.6vw",
              color: "#333333"
            }
          },
          labels: {
            enabled: this.props.tooltip,
            style: {
              fontSize: "0.5vw",
              color: "#333333"
            }
          }
        },
        series: [
          {
            data: this.props.data, // data which comes from props
            showInLegend: false
          }
        ]
      });
    }
  }

  render() {
    if (this.props.data.length > 0) {
      // If there is data
      return (
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            height: "100%",
            minHeight: "20vh",
            borderBottomLeftRadius: "5px"
          }}
          ref='horizontalBar'
        />
      );
    }

    // If there is no data
    else {
      return <div className='noSimText'>No data available for bar chart</div>;
    }
  }
}

export default HorizontalbarChart;
