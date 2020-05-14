// Import the required Libraries

import React from "react";
import "../css/App.css";
import GlobalEvents from "../utils/global-events";

// Code for the Sidebar to change the Widgets
class Icons extends React.Component {
  openTab = widget => {
    // Function to open the Widgets on the Marketing Tab
    GlobalEvents.trigger("changeWidget", widget);
  };

  environmentTab = widget => {
    // Function to open the Widgets on the Marketing Tab
    GlobalEvents.trigger("environmentWidget", widget);
  };

  changeColor(widget) {
    // Function to Change the background color of the Icons when selected
    let elems = document.getElementsByClassName("MarketIcons");
    Object.keys(elems).forEach(dl => {
      elems[dl].style.background = "transparent";
    });
    let temp = widget.component || widget;
    this.refs[temp].style.background = "#F9AA33";
  }

  componentDidMount() {
    GlobalEvents.on("changeWidget", this.changeColor.bind(this));
    GlobalEvents.on("environmentWidget", this.changeColor.bind(this));
    GlobalEvents.on("showendinfo", () => {
      // If on admin tab, click on Summary if the simulation has ended
      if (this.props.tab === "admin") {
        document.getElementById("endinfo2").style.display = "block";

        this.refs.simsum2.click();
      }

      // If on marketing tab, click on Summary if the simulation has ended
      else {
        document.getElementById("endinfo").style.display = "block";
        this.refs.simsum.click();
      }
    });

    GlobalEvents.on("simendagain", () => {
      if (sessionStorage.getItem("simCompleted") === "true") {
        if (this.props.tab === "admin") {
          document.getElementById("endinfo2").style.display = "block";

          this.refs.simsum2.click();
        } else {
          document.getElementById("endinfo").style.display = "block";
          this.refs.simsum.click();
        }
      }
    });
  }

  render() {
    // Self Explanatory
    return (
      <div className='Icons' id='Icons'>
        {this.props.tab === "admin" ? (
          <div style={{ position: "relative" }}>
            <div
              onClick={this.environmentTab.bind(this, "settings")}
              id='settingsicon'
              className='MarketIcons'
              ref='settings'
              style={{ background: "#F9AA33" }}
            >
              <img
                title='Settings'
                id='settings'
                alt='settings'
                src='control.svg'
                component-name='simSettings'
              />
            </div>

            <div
              onClick={this.environmentTab.bind(this, "graphs")}
              className='MarketIcons'
              ref='graphs'
              style={{ background: "transparent" }}
            >
              <img
                title='Graphs'
                id='graphs'
                alt='graphs'
                src='graphs.svg'
                component-name='adminDataScienceStack'
              />
            </div>

            <div
              onClick={this.environmentTab.bind(this, "simsum2")}
              id='endinfo2'
              className='MarketIcons'
              ref='simsum2'
              style={{ background: "transparent", display: "none" }}
            >
              <img
                title='Simulation Summary'
                id='simsum2'
                alt='simsum'
                src='summaryend.svg'
              />
            </div>
          </div>
        ) : null}

        {this.props.tab === "marketing" ? (
          <div style={{ position: "relative" }}>
            <div
              onClick={this.openTab.bind(this, "product")}
              className='MarketIcons'
              ref='product'
              style={{ background: "#F9AA33" }}
            >
              <img
                title='Product'
                id='product'
                alt='product'
                src='product.svg'
                component-name='pricingWidget'
              />
            </div>

            <div
              onClick={this.openTab.bind(this, "pricing")}
              className='MarketIcons'
              ref='pricing'
              style={{ background: "transparent" }}
            >
              <img
                title='Pricing'
                id='pricing'
                alt='pricing'
                src='pricing.svg'
                component-name='productWidget'
              />
            </div>
            <div
              onClick={this.openTab.bind(this, "promotion")}
              className='MarketIcons'
              ref='promotion'
              style={{ background: "transparent" }}
            >
              <img
                title='Promotion'
                id='promotion'
                alt='promotion'
                src='promotion.svg'
                component-name='promotionWidget'
              />
            </div>

            <div
              onClick={this.openTab.bind(this, "graphs2")}
              className='MarketIcons'
              ref='graphs2'
              style={{ background: "transparent" }}
            >
              <img
                title='Graphs'
                id='graphs2'
                alt='graphs2'
                src='graphs (1).svg'
              />
            </div>

            <div
              onClick={this.openTab.bind(this, "simsum")}
              id='endinfo'
              className='MarketIcons'
              ref='simsum'
              style={{ background: "transparent", display: "none" }}
            >
              <img
                title='Simulation Summary'
                id='simsum'
                alt='simsum'
                src='summaryend.svg'
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Icons;
