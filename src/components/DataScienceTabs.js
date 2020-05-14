// Import required Libraries

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GlobalEvents from "../utils/global-events.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SankeyChart from "../components/SankeyChart";
import Windrose from "../components/Windrose.js";
import StreamGraph from "./StreamGraph.js";
import ActivityCount from "./ActivityCount.js";
import Revenue from "./Revenue";
import FixedColumnChart from "../components/FixedColumnChart.js";
import "../css/DataScienceTabs.css";

// This Component is the Core Component used for Graphs in Golden Layout

var selected = "Eat";

function TabContainer(props) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

// Material Styling

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class DataScienceTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: new Date().getTime(),
      selectedTab: 0,
      tabs: [
        {
          tabTitle: "",
          tabId: "",
          plotOnMapNeeded: false,
          nameSpace: ""
        }
      ],
      constTabs: {
        SankeyChart: SankeyChart,
        Windrose: Windrose,
        Revenue: Revenue,
        StreamGraph: StreamGraph,
        ActivityCount: ActivityCount,
        FixedColumnChart: FixedColumnChart
      }
    };
  }

  plotMap() {
    GlobalEvents.trigger("plotOnMap", "ACBH_" + selected);
  }

  handleChange = event => {
    selected = event.target.value;
  };

  componentDidMount() {}

  getTabContent = tabObject => {
    const self = this;
    const ChartToPlot = self.state.constTabs[tabObject.chartComponent];
    return (
      <React.Fragment>
        <ChartToPlot
          key={tabObject.tabId + this.props.nameSpace}
          subscribe_ns={self.props.subscribe_ns}
          ns_value={tabObject.nameSpace}
          unsubscribe_ns={self.props.unsubscribe_ns}
        />
        {tabObject.plotOnMapNeeded === false ? null : <React.Fragment />}
      </React.Fragment>
    );
  };

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const self = this;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Tabs
          style={{ backgroundColor: "#D2DBE0" }}
          value={self.state.selectedTab}
          onChange={this.handleTabChange}
          classes={{ indicator: "datsciencetabcustomindicator" }}
          variant='scrollable'
          scrollButtons='auto'
        >
          {self.props.tabs.map(tab => {
            return (
              <Tab
                classes={{ selected: "datsciencetabselect" }}
                id='TabGraph'
                key={tab.tabId}
                label={tab.tabTitle}
              />
            );
          })}
        </Tabs>
        {self.getTabContent(self.props.tabs[self.state.selectedTab])}
      </div>
    );
  }
}

DataScienceTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataScienceTabs);
