// Import Required Libraries

import React, { Component } from "react";
import "../css/App.css";
import GlobalEvents from "../utils/global-events";
import config from "../utils/config";
import { abbreviateNumber } from "../utils/helperFunction";

// Promotion HUD on the marketing Side
class HUDpromotion extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // default state
      current_spends: 0,
      burn_rate_text: 0,
      spends_percentage: "60%",
      promotion_hud_imagery: "linear_color_promotion.svg",
      burn_rate_imagery: "engine_oil_edited.svg",
      liveSpends: (sessionStorage.getItem("currentTick") + 1) / 7
    };
  }

  updateHUD() {
    fetch(config.api.url + "spends", {
      // API to get the spends each tick
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
        // Calculating the spend per tick

        let sum;

        const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
        sum = sumValues(data);

        sessionStorage.setItem("cur_burn_rate", sum);
        sessionStorage.setItem(
          "cur_spends",
          parseFloat(this.state.current_spends)
        );
        this.setState({
          burn_rate_text: sum
        });
      });
  }

  componentDidMount() {
    // Update the HUD if promotion is Updated

    if (sessionStorage.getItem("PromotionUpdated") === "true") {
      this.updateHUD();
    }
    GlobalEvents.on("PromotionUpdated", this.updateHUD.bind(this));
    this.props.subscribe_ns("simulation_status", () => {
      if (sessionStorage.getItem("cur_spends") > 0) {
        let current_spends = sessionStorage.getItem("cur_spends");
        this.setState({
          current_spends: current_spends
        });
      }
    });
  }

  render() {
    // Self Explanatory
    return (
      <div id='promotionDiv'>
        <div
          style={{ textAlign: "center", cursor: "default" }}
          className='promotionMainText'
          id='divname'
        >
          Promotion :{" "}
          {"$" +
            abbreviateNumber(
              (parseFloat(this.state.burn_rate_text) * 1e2) / 1e2
            ).toFixed(2) +
            "/wk"}
        </div>

        <div class='promotionContent'>
          <div class='promotionHUDIcon'>
            <img
              alt='promotion'
              style={{ width: "90%" }}
              src={this.state.promotion_hud_imagery}
            />
          </div>
          <div class='promotionContentText'>
            <div className='currentSpends'>
              <div className='currentSpendsText'>
                {"$" +
                  (isNaN(abbreviateNumber(this.state.current_spends))
                    ? 0
                    : abbreviateNumber(
                        parseFloat(this.state.current_spends).toFixed(2)
                      ))}
              </div>
            </div>
            <div className='totalSpendsText'>Total Spends</div>
          </div>
        </div>
      </div>
    );
  }
}

export default HUDpromotion;
