import React, { Component } from "react";
import Highcharts from "highcharts";
import CircularProgress from "@material-ui/core/CircularProgress";

class Revenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      yAxis: 'Revenue'
    };
  }

  componentDidMount() {
    this.loadRevenue(this.state.data);

    this.props.subscribe_ns(this.props.ns_value, data => {
      let yAxis = this.props.ns_value.includes('revenue') ? 'Revenue' : 'Units Sold';
      for (let i = 0; i < data.length; i++) {
        if (data[i].data) {
          data[i].data = data[i].data.sort(this.Comparator);
        }
      }
      this.setState({
        data: data,
        yAxis: yAxis
      });
    });
  }

  Comparator(a, b) {
    if (parseInt(a[0]) < parseInt(b[0])) return -1;
    if (parseInt(a[0]) > parseInt(b[0])) return 1;
    return 0;
  }

  componentDidUpdate() {
    // if (sessionStorage.getItem("simStarted") === "true") {yAxis
    //      data:data,
    this.loadRevenue(this.state.data);
    //
    // }
  }

  loadRevenue(data) {
    if (this.state.data.length > 0) {
      // let categories = [];
      Highcharts.chart(this.refs.Revenue, {
        title: {
          text: "Your Brand vs Competitors"
        },
        xAxis: {
          title: {
            text:
              sessionStorage.getItem("currentTick") <= "26" ? "Hours" : "Days"
          }
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: this.state.yAxis
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },

        plotOptions: {
          series: {
            animation: false,
            label: {
              connectorAllowed: false
            },
            pointStart: sessionStorage.getItem("currentTick") <= "26" ? 0 : 1
          }
        },

        series: this.state.data,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      });
    }
  }

  render() {
    if (this.state.data.length > 0) {
      return <div style={{ paddingTop: "10px" }} ref='Revenue' />;
    } else if (sessionStorage.getItem("simStarted") === "true") {
      return (
        <div className='graphLoader'>
          <CircularProgress size={80} />
        </div>
      );
    } else {
      return (
        <div className='noSimText'>
          Start simulation in order to view results
        </div>
      );
    }
  }
}

export default Revenue;
