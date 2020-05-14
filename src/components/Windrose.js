import React, { Component } from "react";
// import './App.css';
import Highcharts from "highcharts";
import CircularProgress from "@material-ui/core/CircularProgress";
require("highcharts/highcharts-more.js")(Highcharts);

class Windrose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.loadWindroseChart(this.props);
    // this.props.subscribe_ns('activity_count_wind_rose', (data) => {
    //   this.setState({
    //     data: data
    //   })
    // })

    this.props.subscribe_ns("activity_count_wind_rose", data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].data) {
          data[i].data = data[i].data.sort(this.Comparator);
        }
      }
      this.setState({
        data: data
      });
    });
  }

  Comparator(a, b) {
    if (parseInt(a[0]) < parseInt(b[0])) return -1;
    if (parseInt(a[0]) > parseInt(b[0])) return 1;
    return 0;
  }

  componentDidUpdate() {
    if (sessionStorage.getItem("simStarted") === "true") {
      this.loadWindroseChart(this.props);
    }
  }

  loadWindroseChart(data) {
    // console.log('windrose',this.state.data);
    if (this.state.data.length > 0) {
      var categories = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23"
      ];
      Highcharts.chart(this.refs.windrose, {
        series: this.state.data,

        chart: {
          polar: true,
          type: "column",
          animation: false
        },
        data: {
          table: "freq"
        },
        colors: ["#E25759", "#75B7B2", "#F28E2B"],

        credits: {
          enabled: false
        },

        title: {
          text: "Activity count across 24 hours of the day"
        },

        subtitle: {
          // text: 'Click on legend to filter by activity'
        },

        pane: {
          size: "85%"
        },

        legend: {
          align: "right",
          verticalAlign: "top",
          y: 100,
          layout: "vertical"
        },

        xAxis: {
          tickmarkPlacement: "on",
          categories: categories
        },

        yAxis: {
          min: 0,
          endOnTick: false,
          showLastLabel: true,
          title: {
            // text: 'Frequency (%)'
          },
          labels: {
            formatter: function() {
              // return this.value + '%';
            }
          },
          reversedStacks: false
        },

        tooltip: {
          // formatter: function () {
          //   return this.x + '<br/>' + ' in series ' + this.series.name + " " + this.y.toFixed(2) + "%";
          // }
        },

        plotOptions: {
          series: {
            stacking: "normal",
            shadow: false,
            groupPadding: 0,
            pointPlacement: "on",
            animation: false
          }
        }
      });
    }
  }

  render() {
    if (this.state.data.length > 0) {
      return <div style={{ paddingTop: "10px" }} ref='windrose' />;
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

export default Windrose;
