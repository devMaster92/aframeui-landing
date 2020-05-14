import React from "react";
// import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import CircularProgress from "@material-ui/core/CircularProgress";

// import $ from "jquery";

// import "./index.css";

const chartInstances = [
  {
    topic: "brand_choice_vs_segment",
    from: "Segment Name",
    to: "Brand Choice"
  },
  {
    topic: "beverage_category_vs_drinking_moment",
    from: "Drinking Moment",
    to: "Beverages"
  },
  {
    topic: "brand_choice_vs_drinking_moment",
    from: "Drinking Moment",
    to: "Brand Choice"
  }
]

const chartEvents = [
  {
    eventName: "select",
    callback({ chartWrapper }) {
      // console.log("Selected ", chartWrapper.getChart().getSelection());
      // console.log(chartWrapper.getChart());
    }
  }
];

class SankeyChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  // componentDidMount() {
  //   $("#mychart")
  //     .children("svg")
  //     .children("g")
  //     .children("path")
  //     .each(function () {
  //       $(this).attr("fill-opacity", 1);
  //     });
  // }
  componentWillUnmount() {
    // console.log("unmounting sankeychart", this.props.ns_value);
    this.props.unsubscribe_ns(this.props.ns_value, data => {
      // console.log('unmount', data)
    });
  }
  componentDidMount() {
    // console.log("mounted sankeychart", this.props.ns_value);
    this.props.subscribe_ns(this.props.ns_value, data => {
      // console.log('sankey_data', data)
      this.setState({
        data: data
      });
    });
  }
  render() {
    // console.log('in sankey', this.props.ns_value)

    if (this.state.data.length > 1) {
      return (
        <div>
            <div
              style={{
                color: "#666666",
                "font-size": "1vw",
                "font-family":
                  "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                position: "absolute",
                top: "30vh",
                transform: "rotate(-90deg)",
                left: "-0.5vw"
              }}
            >
              {chartInstances.find(o => o.topic === this.props.ns_value).from}
            </div>

          <div
            className='SankeyChart'
            style={{ marginLeft: "15%", marginTop: "10%" }}
          >
            <Chart
              width={"80%"}
              height={"450px"}
              chartType='Sankey'
              options={{
                sankey: {
                  link: {
                    color: {
                      fill: "#ddd", // Color of the link.
                      "fill-opacity": 0.1 // Transparency of the link.
                      // stroke: 'black',  // Color of the link border.
                      // strokeWidth: 1    // Thickness of the link border (default 0).
                    }
                  },
                  node: {
                    interactivity: true,
                    label: {
                      fontName: "Helvetica",
                      fontSize: 14,
                      color: "black",
                      italic: false
                    }
                  }
                }
              }}
              loader={<div>Loading Chart</div>}
              data={this.state.data}
              rootProps={{ "data-testid": "1" }}
              chartEvents={chartEvents}
            />
          </div>
            <div
              style={{
                color: "#666666",
                "font-size": "1vw",
                "font-family":
                  "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                position: "absolute",
                top: "30vh",
                right: "4.5vw",
                transform: "rotate(-90deg)"
              }}
            >
              {chartInstances.find(o => o.topic === this.props.ns_value).to}
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

export default SankeyChart;
