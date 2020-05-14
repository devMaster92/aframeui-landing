// Import required Libraries

import React, { Component } from "react";
import "../css/Pricing.css";
import config from "../utils/config";
import GlobalEvents from "../utils/global-events";
import SpiderChart from "./SpiderChart";
import HorizontalBarChart from "./HorizontalBarChart";
import CircularProgress from "@material-ui/core/CircularProgress";

let chartColor = ["#2F32D1", "#7DAD24", "#F2B705", "#A60303", "#A6038B"];

function convertRange(value, r1, r2) {
  // Function to convert taste ,pleasure and health to stars
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // default state
      retail_cost: 1,
      manufacture_cost: 0.35,
      retail_margin: 30,
      value: 1,
      bevcat: "Coffee",
      cat_length: 2,
      compData: [],
      priceData: []
    };
  }

  getBevData() {
    // Function to get Beverage data
    let price_data = JSON.parse(sessionStorage.getItem("priceData"));

    fetch(config.api.url + "competitor", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        Authorization: `${config.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        let categories = [];

        for (let i = 0; i < data["Product_attributes"].length; i++) {
          categories.push(data["Product_attributes"][i]["brandName"]);
        }

        let cat_length = categories.length - 1;
        if (price_data) {
          this.setState({
            retail_cost: price_data.profit_value,
            cat_length: cat_length,
            bevcat: data["beveragecategory"]
          });
        } else {
          this.setState({
            cat_length: cat_length,
            bevcat: data["beveragecategory"]
          });
        }
      });
  }

  getCompData() {
    // Function to get Competitor data
    fetch(config.api.url + "competitor", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        Authorization: `${config.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        let temp_health = { name: "Health" };
        let temp_taste = { name: "Taste" };
        let temp_pleasure = { name: "Pleasure" };
        for (let i = 0; i < data["Product_attributes"].length; i++) {
          // temp_health[data['Product_attributes'][i]['brandName']] = data['Product_attributes'][i]['health']
          // temp_taste[data['Product_attributes'][i]['brandName']] = data['Product_attributes'][i]['taste']
          // temp_pleasure[data['Product_attributes'][i]['brandName']] = data['Product_attributes'][i]['pleasure']
          temp_health[
            data["Product_attributes"][i]["brandName"]
          ] = convertRange(
            data["Product_attributes"][i]["health"],
            [-4, 11], // On a scale of 0 to 11
            [0, 11]
          ).toFixed(2);
          temp_taste[data["Product_attributes"][i]["brandName"]] = convertRange(
            data["Product_attributes"][i]["taste"],
            [-4, 11], // On a scale of 0 to 11
            [0, 11]
          ).toFixed(2);
          temp_pleasure[
            data["Product_attributes"][i]["brandName"]
          ] = convertRange(
            data["Product_attributes"][i]["pleasure"],
            [-4, 11], // On a scale of 0 to 11
            [0, 11]
          ).toFixed(2);
        }
        let temp_price = [];
        data.Product_attributes.forEach(o => {
          temp_price.push({
            y: o.price,
            name: o.brandName
          });
        });

        this.setState({
          compData: [temp_health, temp_pleasure, temp_taste],
          priceData: temp_price
        });
      });
  }

  incrementValue() {
    // Increment the profit Margin
    let value = parseFloat(document.getElementById("priceNumberStepper").value);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById("priceNumberStepper").value = value;
    this.setState({
      retail_cost: parseFloat(value)
    });
  }

  decrementValue() {
    // Decrement the profit margin
    let value = parseFloat(document.getElementById("priceNumberStepper").value);
    value = isNaN(value) ? 0 : value;
    value--;
    document.getElementById("priceNumberStepper").value = value;
    this.setState({
      retail_cost: parseFloat(value)
    });
  }

  submitPrice() {
    // Submit price to the orchestrator
    const self = this;
    self.props.showNotification("Updating Price");
    fetch(
      config.api.url + "pricing",
      {
        method: "POST",
        headers: {
          Authorization: `${config.token}`,
          Accept: "application/json",

          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          cost_to_customer: `$${(
            parseFloat(this.state.retail_cost) +
            parseFloat(this.state.manufacture_cost) +
            Math.ceil(
              (parseFloat(this.state.retail_cost) +
                parseFloat(this.state.manufacture_cost)) *
                0.3
            )
          ).toFixed(2)}`,

          manufacturing_cost: `$${this.state.manufacture_cost}`,

          profit_margin: `${Math.ceil(
            (this.state.retail_cost * 100) / this.state.manufacture_cost
          )}`
        })
      },
      { mode: "cors" }
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        sessionStorage.setItem("priceUpdated", "true");
        self.props.showNotification("Price Updated", { variant: "success" });
        sessionStorage.setItem(
          "priceData",
          JSON.stringify({
            profit_value: this.state.retail_cost
          })
        );
        this.getBevData();
        this.getCompData();
        GlobalEvents.trigger("pricing_updated");
        GlobalEvents.trigger("changeWidget", "promotion");
      })
      .catch(err => {
        console.error(err);
        self.props.showNotification("Price could not updated", {
          variant: "error"
        });
      });
  }

  getManfCost() {
    // Get the manufacturing cost from the orchestrator
    setTimeout(() => {
      fetch(config.api.url + "pricing", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
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
            manufacture_cost:
              (parseFloat(data.manufacturing_cost.replace("$", "")) * 1e2) / 1e2
          });
        });
    }, 200);
  }

  componentDidMount() {
    GlobalEvents.on("price_rerender", this.getManfCost.bind(this));
    setTimeout(() => {
      sessionStorage.getItem("ProductUpdated") && this.getManfCost();
      this.getBevData();
      this.getCompData();
    }, 10);

    if (sessionStorage.getItem("simCompleted") === "true") {
      // If simulation is completed
      if (this.refs.submit) {
        this.refs["submit"].style.background = "#c1c1c1";
        this.refs["submit"].style.pointerEvents = "none";
        this.refs["PricingWidget"].style.pointerEvents = "none";
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (sessionStorage.getItem("simCompleted") === "true") {
      if (this.refs.submit) {
        this.refs["submit"].style.background = "#c1c1c1";
        this.refs["submit"].style.pointerEvents = "none";
        this.refs["PricingWidget"].style.pointerEvents = "none";
      }
    }
  }

  handleChangeValue(e) {
    // Function to get the value when changing the profit margin
    this.setState({ retail_cost: parseFloat(e.target.value) });
  }

  render() {
    // self explanatory
    if (this.state.compData.length > 0) {
      return (
        <div
          className='container_price'
          id='container_price'
          ref='PricingWidget'
        >
          <div id='competitorDetails' className='competitorValues'>
            <div className='compTitle'>Competitor Prices and Attributes</div>
            <div className='compCharts'>
              <div className='compBarChart'>
                <HorizontalBarChart
                  data={
                    this.state.priceData.length > 0 ? this.state.priceData : []
                  }
                  colors={chartColor}
                  yTitle={"Price"}
                  // eslint-disable-next-line
                  label={"${y}"}
                  tooltip={false}
                  title={null}
                  key={`${new Date()}`}
                />
              </div>
              <div className='compSpiderChart'>
                <SpiderChart
                  compData={this.state.compData}
                  colors={chartColor}
                />
              </div>
            </div>
          </div>

          <div className='priceInfo'>
            <div className='retailerSummary'>
              <table style={{ width: "100%" }}>
                <caption>Price Break up</caption>
                <tr>
                  <td>
                    <div className={"td_style_pricing"}>
                      <img alt='td_image' src={"business-and-finance.svg"} />{" "}
                      <p>Manufacturing Cost</p>
                    </div>
                  </td>
                  <td>${parseFloat(this.state.manufacture_cost).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>
                    <div className={"td_style_pricing"}>
                      <img alt='td_image' src={"profit_.svg"} /> <p>Profit</p>
                    </div>
                  </td>
                  <td>${parseFloat(this.state.retail_cost)}</td>
                </tr>
                <tr>
                  <td>
                    <div className={"td_style_pricing"}>
                      <img alt='td_image' src={"retail.svg"} />{" "}
                      <p>Cost to Retailer</p>
                    </div>
                  </td>
                  <td>
                    $
                    {(
                      parseFloat(this.state.retail_cost) +
                      parseFloat(this.state.manufacture_cost)
                    ).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={"td_style_pricing"}>
                      <img alt='td_image' src={"tag.svg"} /> <p>Margin (30%)</p>
                    </div>
                  </td>
                  <td>
                    $
                    {Math.ceil(
                      (parseFloat(this.state.retail_cost) +
                        parseFloat(this.state.manufacture_cost)) *
                        0.3
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={"td_style_pricing"}>
                      <img alt='td_image' src={"customers.svg"} />{" "}
                      <p>Cost to Customer</p>
                    </div>
                  </td>
                  <td>
                    $
                    {(
                      parseFloat(this.state.retail_cost) +
                      parseFloat(this.state.manufacture_cost) +
                      Math.ceil(
                        (parseFloat(this.state.retail_cost) +
                          parseFloat(this.state.manufacture_cost)) *
                          0.3
                      )
                    ).toFixed(2)}
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className='summary'>
            <div className='quantity buttons_added'>
              <input
                type='button'
                value='Profit Margin in $'
                title={"Profit on the cost incurred by retailer"}
                className='priceTitle'
              />
              <input
                type='button'
                onClick={this.decrementValue.bind(this)}
                value='-'
                className='minus'
              />
              <input
                type='number'
                id='priceNumberStepper'
                defaultValue={this.state.retail_cost}
                onChange={this.handleChangeValue.bind(this)}
                step='0.1'
                min={0}
                maxLength='2'
                max={this.state.manufacture_cost * 10}
                title='value'
                className='input-text qty text'
              />
              <input
                type='button'
                onClick={this.incrementValue.bind(this)}
                value='+'
                className='plus'
              />
            </div>
            <input
              type='button'
              id='submitPrice'
              className='submitPrice'
              value='Submit'
              ref='submit'
              onClick={this.submitPrice.bind(this)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className='graphLoader'>
          <CircularProgress size={80} />
        </div>
      );
    }
  }
}

export default Pricing;
