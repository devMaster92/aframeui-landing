import React, { Component } from "react";
import "../css/DataScienceTabs.css";
import Highcharts from "highcharts";
import streamgraph from "highcharts-streamgraph";
import CircularProgress from "@material-ui/core/CircularProgress";

streamgraph(Highcharts);

class StreamGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidUpdate() {
    if (sessionStorage.getItem("simStarted") === "true") {
      this.loadStreamGraphChart(this.props);
    }
  }

  componentDidMount() {
    this.loadStreamGraphChart(this.props);
    this.props.subscribe_ns(this.props.ns_value, data => {
      for (let i = 0; i < data.length; i++) {
        data[i].data = data[i].data.sort(this.Comparator);
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

  loadStreamGraphChart(data) {
    if (this.state.data.length > 0) {
      let seriesData = this.state.data;

      let categories = [];

      Highcharts.chart(this.refs.streamgraph, {
        series: seriesData,

        chart: {
          type: "streamgraph",
          marginBottom: 30,
          zoomType: "x",
          animation: true
        },

        colors: [
          "#1f77b4",
          "#aec7e8",
          "#ff7f0e",
          "#ffbb78",
          "#2ca02c",
          "#98df8a",
          "#d62728",
          "#ff9896",
          "#9467bd",
          "#9467bd",
          "#8c564b",
          "#c49c94",
          "#e377c2",
          "#f7b6d2",
          "#7f7f7f",
          "#c7c7c7",
          "#bcbd22",
          "#dbdb8d",
          "#17becf",
          "#9edae5"
        ],

        title: {
          floating: true,
          align: "left",
          text: ""
        },
        subtitle: {
          floating: true,
          align: "left",
          y: 30,
          text: ""
        },
        credits: {
          enabled: false
        },
        xAxis: {
          // type: 'category',
          // crosshair: true,
          categories: categories,
          labels: {
            align: "left",
            reserveSpace: false,
            rotation: 0
          },
          tickInterval: 2,
          lineWidth: 2,
          tickWidth: 0,
          showLastLabel: true,
          showFirstLabel: true
        },

        yAxis: {
          visible: true,
          startOnTick: true,
          endOnTick: true,
          labels: {
            enabled: false
          },
          title: {
            text: "Occurrences"
          }
        },

        legend: {
          enabled: true,
          layout: "vertical",
          verticalAlign: "top",
          floating: false,
          align: "right"
        },

        plotOptions: {
          series: {
            animation: false,
            label: {
              minFontSize: 5,
              maxFontSize: 15,
              style: {
                color: "rgba(255,255,255,0.75)"
              }
            }
          }
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe_ns(this.props.ns_value, data => {
      // console.log("unmount", data);
    });
  }
  render() {
    if (this.state.data.length > 0) {
      return (
        <div>
          <div
            style={{ paddingTop: "10px" }}
            id={`streamgraph${this.state.rand_value}`}
            ref='streamgraph'
          />
          <div
            style={{
              color: "#666666",
              "font-size": "12px",
              "font-family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              position: "absolute",
              left: "35%"
            }}
          >
            Hour of the day
          </div>
        </div>
      );
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

export default StreamGraph;
