const orcUrl = window.location.origin.includes("dev")
  ? "https://dev.ird.mu-sigma.com/real-games/"
  : "https://qa.ird.mu-sigma.com/real-games/"; //for deployment
// const orcUrl = `http://localhost:3002/`; //for development orc to be run on local
// const ppath = window.location.origin.includes('dev-real-games') ? 'dev-real-games' : 'real-games';

module.exports = {
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiUmVhbF9HYW1lcyJdLCJmdWxsX25hbWUiOiJNYWhlc2hzYWkuU2Fua2EiLCJ1c2VyX25hbWUiOiJNYWhlc2hzYWkuU2Fua2EiLCJzY29wZSI6WyJkZWxldGUiLCJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTU1NjE0NTgyLCJqdGkiOiI4ZjI2OTVhOC03MzBhLTQ0NmYtYmVhMi01YmUwYzZlOTljM2QiLCJlbWFpbCI6Ik1haGVzaHNhaS5TYW5rYUBtdS1zaWdtYS5jb20iLCJjbGllbnRfaWQiOiJSZWFsX0dhbWVzX2NsaWVudCJ9.JN71AnS-C3XC4UKzjJ4_nbobdL2GuI09sNERVtq3riL79eVtfSTqmuAVvG7CnugbVKvtaX0itu8DvsAFinbC0h4N41JRchLQG1FBbvrx1E5b6V9-acMa2LfEd1XvBXqQKkid_A1Rqw2AYZaLAdHRbgrUVNa1Fp0FKbranarzwmGV0-jpopt-XCW0bfPLRpHkzKo6BeE2GSnpj97-M36eH-PbcxcTnDfbMOkdWjZcV4B6oKcnG04g6FiilClU3gKe5w0Bf6uWNCVU2zjpS3qXt8ZcAqotFJJFo_kBiAiLIrkE6l3XaD_3MvLmrLxBlLSMxLN7L9V_MhyjLU2P2HjMDg",
  orcUrl: orcUrl,
  username: "Testing",
  sockets: {
    simulationSocket: {
      // url: "http://172.25.2.34:3002/",
      url: "https://dev.ird.mu-sigma.com/",

      options: {
        // path: '/',
        path: `/real-games-orc/socket.io`,
        forceNew: true
      }
    }
  },
  api: {
    // url: "http://172.25.2.34:3002/"
    url: "https://dev.ird.mu-sigma.com/real-games-orc/"
  },
  usa: {
    maxZoom: 20,
    minZoom: 3.127245589917865,
    width: "100%",
    height: "100vh",
    latitude: 36.1,
    longitude: -78.2,
    zoom: 3.65,
    center: [-97.13520931418606, 32.355260526885104],
    pitch: 0,
    bearing: 0,
    minPitch: 52.5,
    maxPitch: 52.5,
    // maxBounds: [[-193.8394, 10.3638], [-50.70485, 68.3933]],
    mapboxApiAccessToken:
      "pk.eyJ1IjoibmVhcjM0MjEyIiwiYSI6ImNqdHBmcTl1bjA0NWk0NHBwaHhiem1yYnYifQ._ovSHx1kDaevQdZ_WrkdmQ",
    mapStyle: "mapbox://styles/ird-experiencelab/cjx3ahuph24j41cmcboemdutn",
    geourl: "mapbox://ird-experiencelab.drv88avk/"
  },

  aus: {
    maxZoom: 16,
    minZoom: 4,
    width: "100%",
    height: "100vh",
    latitude: -30.63181434250498,
    longitude: 131.50091710579022,
    zoom: 4.2249695660749245,
    pitch: 42,
    maxBounds: [
      [110.22918729655607, -45.031029534126],
      [157.44918729655607, -5.5031029534126]
    ],
    mapboxApiAccessToken:
      "pk.eyJ1IjoibmVhcjM0MjEyIiwiYSI6ImNqdHBmcTl1bjA0NWk0NHBwaHhiem1yYnYifQ._ovSHx1kDaevQdZ_WrkdmQ",
    mapStyle: "mapbox://styles/mapbox/dark-v9"
  },

  ind: {
    maxZoom: 16,
    minZoom: 4.5,
    width: "100%",
    height: "100vh",
    latitude: 20.31035025046984,
    longitude: 77.88275280179437,
    zoom: 5.0512614776132905,
    pitch: 60,
    maxBounds: [
      [65.22918729655607, 5.031029534126],
      [92.44918729655607, 36.5031029534126]
    ],
    mapboxApiAccessToken:
      "pk.eyJ1IjoibmVhcjM0MjEyIiwiYSI6ImNqdHBmcTl1bjA0NWk0NHBwaHhiem1yYnYifQ._ovSHx1kDaevQdZ_WrkdmQ",
    mapStyle: "mapbox://styles/mapbox/dark-v9"
  },

  uk: {
    maxZoom: 16,
    minZoom: 5,
    width: "100%",
    height: "100vh",
    latitude: 53.70853652457208,
    longitude: -3.9196739239123417,
    zoom: 0.104369633069075,
    pitch: 42,
    maxBounds: [
      [-11.32918729655607, 43.91029534126],
      [7.318729655607, 58.6031029534126]
    ],
    mapboxApiAccessToken:
      "pk.eyJ1IjoibmVhcjM0MjEyIiwiYSI6ImNqdHBmcTl1bjA0NWk0NHBwaHhiem1yYnYifQ._ovSHx1kDaevQdZ_WrkdmQ",
    mapStyle: "mapbox://styles/mapbox/dark-v9"
  },

  chn: {
    maxZoom: 16,
    minZoom: 4,
    width: "100%",
    height: "100vh",
    latitude: 35.110811114093195,
    longitude: 101.57411762861057,
    zoom: 5.955364414656664,
    pitch: 59.499999999999986,
    maxBounds: [
      [85.062918729655607, 19.031029534126],
      [118.34918729655607, 52.031029534126]
    ],
    mapboxApiAccessToken:
      "pk.eyJ1IjoibmVhcjM0MjEyIiwiYSI6ImNqdHBmcTl1bjA0NWk0NHBwaHhiem1yYnYifQ._ovSHx1kDaevQdZ_WrkdmQ",
    mapStyle: "mapbox://styles/mapbox/dark-v9"
  },

  Eat: {
    color1: "#ffec5d",
    color2: "#fee255",
    color3: "#fcd64d",
    color4: "#f7bc3c",
    color5: "#ef9f2c",
    color6: "#e37e1d",
    color7: "#d35b0e",
    color8: "#be3901",
    color9: "#a32000",
    color10: "#840d00"
  },

  Drink: {
    color1: "#D5EB9E",
    color2: "#B5EA8C",
    color3: "#8BE679",
    color4: "#64DE70",
    color5: "#4DCC7C",
    color6: "#36B286",
    color7: "#24A096",
    color8: "#177F97",
    color9: "#0C5593",
    color10: "#012791"
  },

  Sleep: {
    color1: "#E38A8C",
    color2: "#df98f8",
    color3: "#d574e8",
    color4: "#c354cb",
    color5: "#b43ab0",
    color6: "#a6328f",
    color7: "#aa2b6f",
    color8: "#bc6977",
    color9: "#bc9b77",
    color10: "#bcc473"
  },
  YourBrand: {
    color1: "#ffec5d",
    color2: "#fee255",
    color3: "#fcd64d",
    color4: "#f7bc3c",
    color5: "#ef9f2c",
    color6: "#e37e1d",
    color7: "#d35b0e",
    color8: "#be3901",
    color9: "#a32000",
    color10: "#840d00"
  },
  Competitors: {
    color1: "#D5EB9E",
    color2: "#B5EA8C",
    color3: "#8BE679",
    color4: "#64DE70",
    color5: "#4DCC7C",
    color6: "#36B286",
    color7: "#24A096",
    color8: "#177F97",
    color9: "#0C5593",
    color10: "#012791"
  }
};
