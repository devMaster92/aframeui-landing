// Import the required Libraries

import React, { Component } from "react";
import "../css/App.css";
import GlobalEvents from "../utils/global-events";
import config from "../utils/config";

// This is the pricing HUD present on the Marketing side

class HUDpricing extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      // default state shown on the HUD
      price: 2.35,
      profit_margin: 286
    };
  }

  updateHUD() {
    fetch(config.api.url + "pricingsubmitted", {
      // API to get the price and profit margin which is submitted on the Pricing Widget
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
          price: parseFloat(data.cost_to_customer.replace("$", "")).toFixed(2),
          profit_margin: data.profit_margin
        });
      });
  }

  updateHUD2() {
    fetch(config.api.url + "pricing", {
      // HUD to get pricing data when the HUD switches from one tab to another
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
          price: parseFloat(
            1 +
              parseFloat(data.manufacturing_cost.replace("$", "")) +
              Math.ceil(
                (1 + parseFloat(data.manufacturing_cost.replace("$", ""))) * 0.3
              )
          ).toFixed(2),
          profit_margin: Math.ceil(
            100 / parseFloat(data.manufacturing_cost.replace("$", ""))
          )
        });
      });
  }

  componentDidMount() {
    // Update HUD whenever price is updated or the component is re rendered

    GlobalEvents.on("pricing_updated", this.updateHUD.bind(this));
    GlobalEvents.on("price_rerender", this.updateHUD2.bind(this));
    if (sessionStorage.getItem("priceUpdated") === "true") {
      this.updateHUD();
    }
  }

  render() {
    // Self Explanatory
    return (
      <div data-tip data-for='soclose' id='pricediv'>
        <div style={{ textAlign: "center", cursor: "default" }} id='divname'>
          Pricing : ${this.state.price}
        </div>

        <div className='pricingHUDContent'>
          <div className='pricingContentIcon'>
            <img
              alt='pricing'
              className='pricingContentIconImg'
              style={{}}
              src='profit_.svg'
            />
          </div>
          <div className='pricingContentText'>
            <div style={{}}>
              <div
                style={{
                  fontSize: "1.8vw",
                  position: "relative",
                  bottom: "-8%",
                  cursor: "default"
                }}
              >
                {this.state.profit_margin}%
              </div>
              <div
                className='pricingContentSubText'
                style={{ fontSize: "0.8vw", cursor: "default" }}
              >
                Profit Margin
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HUDpricing;
