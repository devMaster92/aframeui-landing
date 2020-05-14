// Import the required Libraries

import React, { Component } from "react";
import "../css/App.css";
import StarRatings from "react-star-ratings";
import GlobalEvents from "../utils/global-events";
import config from "../utils/config";
import * as helperFunctions from "../utils/helperFunction";
import ReactTooltip from "react-tooltip";

function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

// HUD for the product details on the Marketing Side

class HUDproduct extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // Default state for the Product HUD
      mappings: {
        // Mapping from the products in the data to the real names
        Coffee: "Coffee",
        Tea: "Tea",
        Carbonation: "Soft Drinks",
        Fruit: "Fruit Juice",
        Milk: "Milk",
        Water: "Water"
      },
      beverage_category: "Coffee",
      health: 7,
      taste: 9,
      pleasure: 9,
      image: "coffee.svg" // Fetch image name from the api and use it from the public folder
    };
  }

  updateHUD() {
    fetch(config.api.url + "product", {
      // API to fetch the product details
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
          beverage_category: helperFunctions.convertToTitleCase(data.category),
          health: data.health,
          taste: data.taste,
          pleasure: data.pleasure,
          image: data.product_image
        });
      });
  }

  componentDidMount() {
    GlobalEvents.on("price_rerender", this.updateHUD.bind(this)); // Update product on component re render
    if (sessionStorage.getItem("ProductUpdated") === "true") {
      // Update the HUD whenever product is submitted
      this.updateHUD();
    }
  }

  render() {
    // Self Explanatory
    return (
      <div id='proddiv'>
        <div
          className='productMainText'
          style={{ textAlign: "center", cursor: "default" }}
          id='divname'
        >
          Product : {this.state.mappings[this.state.beverage_category]}
        </div>
        <div className='productHUDContent'>
          <div className='productContentIcon'>
            <img
              alt='product'
              style={{
                position: "absolute",
                height: "3vw",
                left: "0%",
                bottom: "12%",
                cursor: "default"
              }}
              src={this.state.image}
            />
          </div>
          <div className='productContentText'>
            <div className='productHUDRatingLabels'>
              <div
                className='productHUDRatingsLabelsTxt'
                data-tip
                data-for='healthtip'
                style={{
                  fontSize: "0.8vw",
                  cursor: "default"
                }}
              >
                Health
              </div>
              <div
                className='productHUDRatingsLabelsTxt'
                data-tip
                data-for='tastetip'
                style={{
                  fontSize: "0.8vw",
                  cursor: "default"
                }}
              >
                Taste
              </div>
              <div
                className='productHUDRatingsLabelsTxt'
                data-tip
                data-for='pleasuretip'
                style={{
                  width: "fit-content",
                  fontSize: "0.8vw",
                  cursor: "default"
                }}
              >
                Pleasure
              </div>
            </div>
            <div className='productHUDRatings'>
              <StarRatings
                rating={convertRange(this.state.health, [1, 14], [0, 5])}
                starRatedColor='#344955'
                starEmptyColor='darkgrey'
                starDimension='1vw'
                starSpacing='0.001vw'
              />
              <StarRatings
                style={{
                  position: "absolute",
                  left: "55%"
                }}
                rating={convertRange(this.state.taste, [1, 12], [0, 5])}
                starRatedColor='#344955'
                starEmptyColor='darkgrey'
                starDimension='1vw'
                starSpacing='0.001vw'
              />
              <StarRatings
                style={{
                  position: "absolute",
                  left: "55%"
                }}
                rating={convertRange(this.state.pleasure, [2, 11], [0, 5])}
                starRatedColor='#344955'
                starEmptyColor='darkgrey'
                starDimension='1vw'
                starSpacing='0.001vw'
              />
            </div>
          </div>
        </div>

        <ReactTooltip
          class='temperaturetooltip'
          id='healthtip'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                On a scale of 0-11, the overall wellbeing(physical and mental)
                the beverage provides to the customer
              </div>
            </div>
          )}
          effect='solid'
          place={"top"}
          border={true}
          type={"light"}
        />
        <ReactTooltip
          class='temperaturetooltip'
          id='tastetip'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                General perception of taste among the consumers on a scale of
                0-11
              </div>
            </div>
          )}
          effect='solid'
          place={"top"}
          border={true}
          type={"light"}
        />
        <ReactTooltip
          class='temperaturetooltip'
          id='pleasuretip'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                How addictive the drink is based on the presence of ingredients
                like dopamine. Measured on a scale of 0-11
              </div>
            </div>
          )}
          effect='solid'
          place={"top"}
          border={true}
          type={"light"}
        />
      </div>
    );
  }
}

export default HUDproduct;
