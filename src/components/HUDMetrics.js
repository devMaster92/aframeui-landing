// Import Required Libraries

import React, { Component } from "react";
import "../css/App.css";
import config from "../utils/config";
import * as helperFunctions from "../utils/helperFunction";
import ReactTooltip from "react-tooltip";

// First HUD on the marketing side
class HUDMetrics extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      // default state data
      sales_24: 0,
      revenue_24: 0,
      marketshare_24: 0,
      penetration_24: 0,
      unitprice: 1.2
    };
  }

  getUnitCost() {
    fetch(config.api.url + "pricingsubmitted", {
      // Fetch Price from API
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
          unitprice: parseFloat(data.cost_to_customer.replace("$", ""))
        });
      });
  }

  componentDidMount() {
    // subscribe_ns() is a socket function which comes from App.js through props

    this.props.subscribe_ns("HUD_data", data => {
      this.getUnitCost();

      // Function to Update the sales and revenue

      let sales =
        Object.keys(data.product.total).filter(key => {
          return data.product.total[key].name === "Your Brand";
        }).length > 0
          ? data.product.total[
              Object.keys(data.product.total).filter(key => {
                return data.product.total[key].name === "Your Brand";
              })
            ].count
          : 0;

      let revenue = Math.round(sales * (data.unitPrice ? data.unitPrice : 5));
      let marketshare =
        Object.keys(data.product.total).filter(key => {
          return data.product.total[key].name === "Your Brand";
        }).length > 0
          ? `${(
              (data.product.total[
                Object.keys(data.product.total).filter(key => {
                  return data.product.total[key].name === "Your Brand";
                })
              ].count /
                Object.keys(data.product.total).reduce((sum, key) => {
                  return sum + data.product.total[key].count;
                }, 0)) *
              100
            ).toFixed(1)}%`
          : 0;

      let penetration =
        Object.keys(data.penetration.product.total).filter(key => {
          return data.penetration.product.total[key].name === "Your Brand";
        }).length > 0
          ? `${(
              (data.penetration.product.total[
                Object.keys(data.penetration.product.total).filter(key => {
                  return (
                    data.penetration.product.total[key].name === "Your Brand"
                  );
                })
              ].uniqCount /
                data.totalAgents) *
              100
            ).toFixed(1)}%`
          : 0;

      this.setState({
        sales_24: sales,
        revenue_24: revenue,
        marketshare_24: marketshare,
        penetration_24: penetration
      });
    });
  }

  render() {
    // Self Explanatory
    return (
      <div id='marketdiv'>
        <div style={{ cursor: "default" }} id='divname2'>
          National Sales and Consumption
        </div>

        <div
          title='units sold'
          style={{
            fontSize: "0.8vw",
            position: "absolute",
            left: "12%",
            bottom: "5%",
            cursor: "default"
          }}
        >
          Units Sold
        </div>
        <div
          style={{
            fontSize: "0.8vw",
            position: "absolute",
            left: "35.4%",
            bottom: "5%",
            cursor: "default"
          }}
        >
          Revenue
        </div>
        <div
          style={{
            fontSize: "0.8vw",
            position: "absolute",
            left: "56.5%",
            bottom: "5%",
            cursor: "default"
          }}
        >
          Market Share
        </div>
        <div
          style={{
            fontSize: "0.8vw",
            position: "absolute",
            left: "81.5%",
            bottom: "5%",
            cursor: "default"
          }}
        >
          Market Penetration
        </div>

        <div
          data-tip
          data-for='overallsales'
          style={{
            position: "absolute",

            left: "5%",
            bottom: "12%"
          }}
        >
          <img
            alt='sales'
            style={{
              width: "3vw",
              cursor: "default"
            }}
            src='shopping-bag_.svg'
          />
        </div>

        <div
          data-tip
          data-for='overallsales'
          style={{
            position: "absolute",

            left: "14%",
            top: "30%",
            cursor: "default",

            fontSize: "2vw"
          }}
          ref='sales'
        >
          {helperFunctions.abbreviateNumber(this.state.sales_24)}
        </div>

        <img
          data-tip
          data-for='overallrevenue'
          alt='revenue'
          style={{
            width: "3vw",
            // height: '3vw',
            position: "absolute",
            bottom: "12%",
            cursor: "default",
            left: "28%"
          }}
          src='money.svg'
        />

        <div
          data-tip
          data-for='overallrevenue'
          style={{
            position: "absolute",
            left: "36%",
            top: "30%",
            cursor: "default",
            fontSize: "2vw"
          }}
          ref='drink'
        >
          ${helperFunctions.abbreviateNumber(this.state.revenue_24)}
        </div>

        <div
          data-tip
          data-for='marketing'
          style={{
            width: "3vw",

            position: "absolute",
            bottom: "8%",
            cursor: "default",
            left: "50%"
          }}
        >
          <img
            alt='market'
            style={{
              width: "3vw"
            }}
            src='pie-chart_.svg'
          />
        </div>

        <div
          data-tip
          data-for='marketing'
          style={{
            position: "absolute",
            left: "59%",
            top: "30%",
            fontSize: "2vw",
            cursor: "default"
          }}
          ref='sleep'
        >
          {this.state.marketshare_24}
        </div>

        <img
          data-tip
          data-for='penetration'
          alt='penetration'
          style={{
            width: "3vw",
            // height: '3vw',
            position: "absolute",
            bottom: "12%",
            left: "75%",
            cursor: "default"
          }}
          src='target_.svg'
        />

        <div
          data-tip
          data-for='penetration'
          style={{
            position: "absolute",
            left: "84%",
            top: "30%",
            cursor: "default",
            fontSize: "2vw"
          }}
          ref='sleep'
        >
          {this.state.penetration_24}
        </div>

        <ReactTooltip
          class='marketing'
          id='marketing'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                Your{" "}
                <span style={{ color: "#3f51b5", fontWeight: "500" }}>
                  Product Sales
                </span>{" "}
                by{" "}
                <span style={{ color: "#3f51b5", fontWeight: "500" }}>
                  Overall Sales
                </span>{" "}
                for this beverage category
              </div>
            </div>
          )}
          effect='solid'
          place={"top"}
          border={true}
          type={"light"}
        />

        <ReactTooltip
          class='penetrating'
          id='penetration'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                % of{" "}
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  unique consumers
                </span>{" "}
                for your product to{" "}
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  total consumers
                </span>
              </div>
            </div>
          )}
          effect='solid'
          place={"top"}
          border={true}
          type={"light"}
        />

        <ReactTooltip
          class='overallsales'
          id='overallsales'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  Total units
                </span>{" "}
                of your product sold in the US
              </div>
            </div>
          )}
          effect='solid'
          place={"top"}
          border={true}
          type={"light"}
        />

        <ReactTooltip
          class='overallrevenue'
          id='overallrevenue'
          getContent={dataTip => (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 150,
                  wordWrap: "break-word",
                  marginBottom: "2px"
                }}
              >
                <span style={{ color: "#3f51b5", fontWeight: 500 }}>
                  Total revenue
                </span>{" "}
                generated from your brand sales in the US
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

export default HUDMetrics;
