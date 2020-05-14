// Import required Libraries

import React from "react";
import "../css/App.css";
import config from "../utils/config";
import PieChart from "../components/PieChart";
import HorizontalbarChart from "./HorizontalBarChart";
import CircularProgress from "@material-ui/core/CircularProgress";

let chartColors = ["#344955"];

function SplitTime(numberOfHours) {
  // Function to split hours into days, hours
  var Days = Math.floor(numberOfHours / 24);
  var Remainder = numberOfHours % 24;
  var Hours = Math.floor(Remainder);
  var Minutes = Math.floor(60 * (Remainder - Hours));
  return { Days: Days, Hours: Hours, Minutes: Minutes };
}

// Component for End of Simulation Summary
class PricingDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //default state
      spends: 0,
      reach: 0,
      ticks: 0,

      units_sold: 0,

      segments_count: [],

      image: "coffee.svg",
      graphdata: { name: "Units Sold", data: [] },

      simSummary: {
        graph: {
          Competitor1: 10,
          Competitor2: 50,
          "Your Brand": 6
        },
        ticks: 0,
        agents: 200,
        profit: 20,
        product: {
          pricing: {
            ctc: 2,
            profit_margin: 60
          },
          specs: {
            health: 4,
            taste: 5,
            pleasure: 3
          }
        },
        beverage_cat: "tea"
      }
    };
  }

  componentDidMount() {
    this.updateHUD();
    this.fetchDetails();
    this.fetchSpends();
  }

  fetchSpends() {
    fetch(config.api.url + "spends", {
      // API to fetch the spends on each promotion
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `${config.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        let spends = 0;
        const sumValues = obj => Object.values(obj).reduce((a, b) => a + b); // Sum all the spends

        spends = sumValues(data);

        this.setState({
          spends: spends
        });
      });
  }

  fetchDetails() {
    fetch(config.api.url + "endinfo", {
      // Get the data for the end of simulation summary
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `${config.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        let graphdata = { name: "Units Sold", data: [], colorByPoint: true };
        let d = [];
        let units_sold = 0;
        let reach = data.reach.PromoReach;
        let data_segments = data["segments_count"];
        let data_segments_length = 0;

        if (data_segments.length >= 3) {
          data_segments_length = 3;
        } else {
          data_segments_length = data_segments.length;
        }

        data_segments.sort(function(a, b) {
          // Function to sort the array by the second value
          return b[1] - a[1];
        });

        if (Object.keys(data.graph).includes("Your Brand")) {
          // If there is no Your Brand in the array, your brand has the las t position
          units_sold = data.graph["Your Brand"];
        } else {
          units_sold = 0;
        }

        let ticks = data.ticks;

        Object.keys(data.graph).forEach(key => {
          let temp = { name: key, y: data.graph[key] };
          if (key === "Your Brand") {
            temp.sliced = true;
            temp.selected = true;
          }
          graphdata.data.push(temp); // Data for Pie Chart
        });

        for (let i = 0; i < data_segments_length; i++) {
          let temp = {};
          temp["name"] = data_segments[i][0];
          temp["y"] = data_segments[i][1];
          d.push(temp);
        }
        // console.log('graphdata',graphdata)
        this.setState({
          simSummary: data,
          graphdata: graphdata,
          segments_count: d,
          units_sold: units_sold,
          ticks: ticks,
          reach: reach
        });
      });
  }

  updateHUD() {
    // Update the image
    fetch(config.api.url + "product", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `${config.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          image: data.product_image
        });
      });
  }

  countComp = () => {
    // Count the number of competitors
    let result = 0;

    result = Object.keys(this.state.simSummary["graph"]).length;

    if (result === 0) {
      return false;
    } else {
      return true;
    }
  };

  calcPos = () => {
    // Calculate the position of Your Brand among all the brands
    // const self = this;
    let result = 0;
    //    let keys = Object.keys(this.state.simSummary['graph'])
    let values = Object.values(this.state.simSummary["graph"]);
    let keys = Object.keys(this.state.simSummary["graph"]);
    if (keys.includes("Your Brand") === false) {
      return values.length + 1;
    }
    values = values.sort(function(a, b) {
      return b - a;
    });
    for (var j = 0; j < values.length; j++) {
      if (this.state.simSummary["graph"]["Your Brand"] === values[j]) {
        result = j;
      }
    }

    return result + 1;
  };

  render() {
    // Self Explanatory
    let result = this.calcPos();
    let days = SplitTime(this.state.simSummary["ticks"])["Days"];
    let hours = SplitTime(this.state.simSummary["ticks"])["Hours"];
    let comps = this.countComp();

    if (this.state.simSummary.ticks === 0) {
      return (
        <div className='graphLoader'>
          <CircularProgress size={80} />
        </div>
      );
    } else {
      return (
        <div
          classname='mainsimdiv'
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            className='firstdiv'
            style={{
              height: "15%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "2%"
            }}
          >
            <div className='marketposdiv' style={{ width: "36%" }}>
              <div style={{ fontSize: "2.5vw" }}>
                {`#`}
                {result}
              </div>
              <div>Market Position</div>
            </div>

            <div
              style={{ marginRight: "4%", marginLeft: "11%" }}
              className='agentdatadiv'
            >
              <table
                background='#98a5ad57'
                style={{
                  display: "inline-block",
                  marginTop: "1vh",
                  border: "2px solid #344955",
                  borderRadius: "5px",
                  borderCollapse: "collapse"
                }}
              >
                <tbody>
                  <tr>
                    <td>Number of agents</td>
                    <td>{this.state.simSummary.agents}</td>
                  </tr>
                  <tr>
                    <td>Simulation duration</td>

                    {hours > 0 ? (
                      <td>{`${days} Day(s) ${hours} Hour(s)`}</td>
                    ) : (
                      <td>{`${days} Day(s)`}</td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {comps ? (
            <PieChart key={new Date()} data={this.state.graphdata} />
          ) : (
            <div>
              No product was bought either from Your Brand or the Competitors
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              margin: "0 7%",
              paddingBottom: "1%"
            }}
          >
            <div style={{ width: "50%" }}>
              Average Units Sold :{" "}
              {(
                this.state.units_sold / Math.floor(this.state.ticks / 24)
              ).toFixed(2)}
              /day
            </div>
            <div style={{ width: "50%", textAlign: "right" }}>
              Total Units Sold : {this.state.units_sold}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              borderBottom: "1px solid black",
              margin: "1% 7%",
              paddingTop: "1%"
            }}
          >
            <div style={{ width: "50%" }}>
              Promotional Spends : ${this.state.spends.toFixed(2)}
            </div>
            <div style={{ width: "50%", textAlign: "right" }}>
              Promotional Reach : {this.state.reach}/day
            </div>
          </div>

          {this.state.segments_count.length === 0 ? (
            <div style={{ height: "28%", padding: "5vw" }}>
              <div>Sorry, people didn't consume your product</div>
            </div>
          ) : (
            <div style={{ height: "28%" }}>
              <HorizontalbarChart
                title='Top segements who consumed your product'
                data={this.state.segments_count}
                colors={chartColors}
                tooltip={true}
                yTitle={"Percentage"}
                label={"{y}%"}
              />
            </div>
          )}
        </div>
      );
    }
  }
}

export default PricingDetails;
