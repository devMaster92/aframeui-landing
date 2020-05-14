import React, { Component } from "react";
import '../css/mapbox-gl.css';
import { Layer, Marker, Popup } from "@urbica/react-map-gl";
import { Source } from "@urbica/react-map-gl";
import GlobalEvents from '../utils/global-events'
import mapboxgl from 'mapbox-gl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import MapGL, { NavigationControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const config = require('../utils/config')



var max_count = 0;
var max_count_msa = 0;

var selected = "Eat"


const styles = theme => ({
    root: {
        display: 'flex',
        width: "100%",
        height: "100%",
        padding: "8px",
    },
    formControl: {
        margin: "10px",
        padding: "8px",
        width: "120px",
        top: "10px",
        left: "10px"
    },
    legendPaper: {
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
        margin: "5px",
        padding: "2px"
    },
    listIcon: {
        marginRight: "0px"
    },
    stateSelectorPaper: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
        top: "10px",
        left: "10px"
    },
    zoomLevelSelectorPaper: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
        top: "48%",
        left: "10px"
    },
    listItem: {
        paddingTop: "2px",
        paddingBottom: "2px"
    },
    dropDown: {
        marginTop: "25px !important"
    },
    inputLabel: {
        fontSize: "20px"
    }
});

class CountryView extends Component {


    state = {
        isLegendOpened: true,
        LegendIcon: "LegendOpen.svg",
        viewport: {
            width: this.props.width,
            height: this.props.height,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            zoom: this.props.zoom,
            pitch: this.props.pitch,
            minPitch: this.props.minPitch,
            maxPitch: this.props.maxPitch,
            center: this.props.center,


        },
        selected_layer: 'zip',
        mappings: {
            'eat': "Eat",
            'sleep': "Sleep",
            'drink': "Drink"
        },
        selected_mode: 'tick',
        simstarted: false,
        selected_state: 0,
        thingsToSelect: {
            admin: [
                "Eat",
                "Drink",
                "Sleep"
            ],
            marketing: [
                "YourBrand",
                "Competitors"
            ]
        },
        geourl: this.props.geourl,
        listening: false,
        msadata: [
            {
                "MSA": "99999",
                "State": "Connecticut",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            }
        ],
        data: [
            {
                "Zip": "35801",
                "State": "Connecticut",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            },
            {
                "Zip": "99501",
                "State": "Florida",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            },
            {

                "Zip": "85001",
                "State": "Illinois",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            },
            {
                "Zip": "72201",
                "State": "Kentucky",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            },
            {
                "Zip": "94203",
                "State": "Michigan",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            },
            {
                "Zip": "90001",
                "State": "Minnesota",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            },
            {
                "Zip": "90209",
                "State": "New Jersey",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            },
            {
                "Zip": "80201",
                "State": "Pennsylvania",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            },
            {
                "Zip": "06101",
                "State": "Washington",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            },
            {
                "Zip": "19901",
                "State": "Wisconsin",
                "Eat": 0,
                "Drink": 0,
                "Sleep": 0,
                "YourBrand": 0,
                "Competitors": 0
            }
        ],
        max_count: 10
    };


    globeView = () => {
        document.getElementById("GoldenView").style.display = "none";
        document.getElementById("Icons").style.display = "none";
        document.getElementById('Switch').style.display = "none";
        GlobalEvents.trigger('showglobe')
    };
    OpenFamily = () => {
        this.refs.Marker.style = 'display : block'
    }


    zoomIn() {

        var mapContext = this.refs.map._map;
        mapContext.zoomIn();
    }


    zoomOut() {

        var mapContext = this.refs.map._map;
        mapContext.zoomOut();
    }

    subscribeToNS = () => {
        const self = this;
        this.props.subscribe_ns(this.props.ns_value, (data) => {
            self.setState({ data: data });
        });
        this.props.subscribe_ns(this.props.ns_value2, (data) => {
            self.setState({ msadata: data });
        });
        this.setState({ listening: true });
    }

    handleChange = event => {
        const self = this;
        selected = event.target.value
        if (!self.state.listening) {
            self.subscribeToNS();
        }

        self.setState({ listening: true, selected_state: self.state.thingsToSelect[sessionStorage.getItem("tab")].indexOf(selected) });

    };

    handleChange2 = event => {
        this.setState({
            selected_mode: event.target.value
        })
        this.props.emit_data('map_onchange', { dataType: event.target.value })
    }

    handleRadioChange = event => {
        this.setState({
            selected_layer: event.target.value
        })
    };

    componentDidMount() {
        //    var expression_drink = ["match", ["get", "NAME10"]];
        //    var expression_zip = ["match", ["get", "ZCTA5CE10"]]
        var zoomLevel = this.refs.map._map.getZoom()
        // var zmlvl = this.refs.map._map.getZoom()
        // var pitch = this.refs.map._map.getPitch()
        document.getElementById("reset").addEventListener('click', () => {
            this.refs.Marker.style = 'display:none'
            this.refs.map._map.flyTo({
                center: [config[this.props.countryname].longitude, config[this.props.countryname].latitude],
                zoom: config[this.props.countryname].zoom, pitch: config[this.props.countryname].pitch, bearing: config[this.props.countryname].bearing,
            })
        })



        if (zoomLevel >= 5) {
            this.forceUpdate()
        }



        if (sessionStorage.getItem('simStarted') === "true") {
            if (!this.state.listening) {
                this.subscribeToNS();
            }
            this.setState({
                simstarted: true
            })
        } else {
            GlobalEvents.on('startsim', () => {
                if (!this.state.listening) {
                    this.subscribeToNS();
                }
            });
        }

        var options = {
            'closeButton': false,

        }

        var mapglContext = this.refs.map._map;





        var popup = new mapboxgl.Popup({ options: options })

        mapglContext.on('click', 'statelayer', function (e) {
            mapglContext.flyTo({ center: e.lngLat, zoom: 7, speed: 1, curve: 1, easing: function (t) { return t; } })

            popup
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties['NAME10'])
                .addTo(mapglContext);
        });

        mapglContext.on('mouseleave', 'statelayer', function (e) {
            popup.remove()
        });

        GlobalEvents.on('Agentsdata', (data) => {
            this.setState({
                max_count: data
            })
        })

        GlobalEvents.on('simdata', (data) => {
            this.setState({
                data: data
            })
        })

        GlobalEvents.on('changeEgg', (data) => {
            this.refs.map._map.flyTo({
                center: [77.73886856940976, 12.984805277756749],
                zoom: 17.5,
                pitch: 56.5,
                bearing: -84.5,
            })
        })
        mapglContext.on('click', (e) => {

        })

        GlobalEvents.trigger('connect_socket')



        GlobalEvents.on('tab_selected', this.changePlotOptions.bind(this))
        GlobalEvents.on('changegraph', this.simstatus.bind(this))


    }

    changePlotOptions(data) {
        sessionStorage.setItem("tab", (data === 0 ? "admin" : "marketing"));
    }
    simstatus(data) {

    }

    getLegendIcon(){        
            if(this.state.isLegendOpened){
                return "LegendClose.svg"
            }
            else {
                return "LegendOpen.svg"
            } 
            // this.setState({LegendIcon: "LegendClose.svg"}) : this.setState({LegendIcon: "LegendOpen.svg"})        
    }


    getLegends(classes, keyName) {

        if (this.refs.map) {

            var abc = this.refs.map._map

            if (max_count < 10 && abc.getZoom() < 5) {
                return (

                    <Paper id="Legendpaper" className={classes.legendPaper} elevation={1}>
                        <List dense
                            subheader={

                                sessionStorage.getItem("tab") === 'admin' ? <div> <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                    <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName + 'ing'}</ListSubheader>   </div> : <div>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"consuming "}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName}</ListSubheader>
                                    </div>

                            }>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listIcon}>
                                    <span className="legendColor" style={{ backgroundColor: config[keyName].color10 }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="> 10"
                                />
                            </ListItem>
                            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => {
                                return (<ListItem className={classes.listItem}>
                                    <ListItemIcon className={classes.listIcon}>
                                        <span className="legendColor" style={{ backgroundColor: config[keyName]["color" + num] }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={num}
                                    />
                                </ListItem>);
                            })}
                        </List>
                    </Paper>

                );
            }

            if (max_count > 10 && abc.getZoom() < 5) {

                return (

                    <Paper id="Legendpaper" className={classes.legendPaper} elevation={1}>

                        <List dense
                            subheader={

                                sessionStorage.getItem("tab") === 'admin' ? <div> <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                    <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName + 'ing'}</ListSubheader>   </div> : <div>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"consuming "}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName}</ListSubheader>
                                    </div>


                            }>

                            {[Math.ceil(1.20 * max_count), Math.ceil(1.15 * max_count), Math.ceil(1.10 * max_count), Math.ceil(1.05 * max_count), Math.ceil(1.00 * max_count), Math.ceil(0.95 * max_count), Math.ceil(0.90 * max_count), Math.ceil(0.85 * max_count), Math.ceil(0.80 * max_count), 0].map((num, i) => {
                                return (<ListItem className={classes.listItem}>
                                    <ListItemIcon className={classes.listIcon}>
                                        <span className="legendColor" style={{ backgroundColor: config[keyName]["color" + (10 - i)] }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={num}
                                    />
                                </ListItem>);
                            })}
                        </List>
                    </Paper>

                );

            }

            if (max_count < 10 && abc.getZoom() >= 5 && this.state.selected_layer === 'zip') {
                return (


                    <Paper id="Legendpaper" className={classes.legendPaper} elevation={1}>

                        <List dense
                            subheader={

                                sessionStorage.getItem("tab") === 'admin' ? <div> <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                    <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName + 'ing'}</ListSubheader>   </div> : <div>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"consuming "}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName}</ListSubheader>
                                    </div>


                            }>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listIcon}>
                                    <span className="legendColor" style={{ backgroundColor: config[keyName].color10 }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="> 10"
                                />
                            </ListItem>
                            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => {
                                return (<ListItem className={classes.listItem}>
                                    <ListItemIcon className={classes.listIcon}>
                                        <span className="legendColor" style={{ backgroundColor: config[keyName]["color" + num] }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={num}
                                    />
                                </ListItem>);
                            })}
                        </List>

                    </Paper>

                );
            }

            if (max_count > 10 && abc.getZoom() >= 5 && this.state.selected_layer === 'zip') {

                return (

                    <Paper id="Legendpaper" className={classes.legendPaper} elevation={1}>

                        <List dense
                            subheader={

                                sessionStorage.getItem("tab") === 'admin' ? <div> <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                    <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName + 'ing'}</ListSubheader>   </div> : <div>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"consuming "}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName}</ListSubheader>
                                    </div>


                            }>

                            {[Math.ceil(1.20 * max_count), Math.ceil(1.15 * max_count), Math.ceil(1.10 * max_count), Math.ceil(1.05 * max_count), Math.ceil(1.00 * max_count), Math.ceil(0.95 * max_count), Math.ceil(0.90 * max_count), Math.ceil(0.85 * max_count), Math.ceil(0.80 * max_count), 0].map((num, i) => {
                                return (<ListItem className={classes.listItem}>
                                    <ListItemIcon className={classes.listIcon}>
                                        <span className="legendColor" style={{ backgroundColor: config[keyName]["color" + (10 - i)] }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={num}
                                    />
                                </ListItem>);
                            })}
                        </List>

                    </Paper>
                );

            }

            if (max_count_msa < 10 && this.state.selected_layer === 'msa' && abc.getZoom() >= 5) {
                return (


                    <Paper id="Legendpaper" className={classes.legendPaper} elevation={1}>

                        <List dense
                            subheader={

                                sessionStorage.getItem("tab") === 'admin' ? <div> <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                    <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName + 'ing'}</ListSubheader>   </div> : <div>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"consuming "}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName}</ListSubheader>
                                    </div>


                            }>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon className={classes.listIcon}>
                                    <span className="legendColor" style={{ backgroundColor: config[keyName].color10 }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="> 10"
                                />
                            </ListItem>
                            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => {
                                return (<ListItem className={classes.listItem}>
                                    <ListItemIcon className={classes.listIcon}>
                                        <span className="legendColor" style={{ backgroundColor: config[keyName]["color" + num] }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={num}
                                    />
                                </ListItem>);
                            })}
                        </List>

                    </Paper>

                );
            }

            if (max_count_msa > 10 && this.state.selected_layer === 'msa' && abc.getZoom() >= 5) {

                return (

                    <Paper id="Legendpaper" className={classes.legendPaper} elevation={1}>

                        <List dense
                            subheader={

                                sessionStorage.getItem("tab") === 'admin' ? <div> <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                    <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName + 'ing'}</ListSubheader>   </div> : <div>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"# of agents"}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{"consuming "}</ListSubheader>
                                        <ListSubheader style={{ lineHeight: "20px" }} component="div">{keyName}</ListSubheader>
                                    </div>


                            }>

                            {[Math.ceil(1.20 * max_count_msa), Math.ceil(1.15 * max_count_msa), Math.ceil(1.10 * max_count_msa), Math.ceil(1.05 * max_count_msa), Math.ceil(1.00 * max_count_msa), Math.ceil(0.95 * max_count_msa), Math.ceil(0.90 * max_count_msa), Math.ceil(0.85 * max_count_msa), Math.ceil(0.80 * max_count_msa), 0].map((num, i) => {
                                return (<ListItem className={classes.listItem}>
                                    <ListItemIcon className={classes.listIcon}>
                                        <span className="legendColor" style={{ backgroundColor: config[keyName]["color" + (10 - i)] }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={num}
                                    />
                                </ListItem>);
                            })}
                        </List>

                    </Paper>
                );

            }
        }

    };

    getDropdown(classes, label, values) {
        const self = this;

        return (
            <FormControl style={{ margin: 0 }} className={classes.formControl}>
                <InputLabel className={classes.inputLabel} shrink htmlFor="age-label-placeholder">
                    {label}
                </InputLabel>
                <Select
                    value={values[self.state.selected_state].value}
                    onChange={self.handleChange}
                    input={<Input name={label} id="age-label-placeholder" />}
                    displayEmpty
                    name={label}
                    className={classes.dropDown}
                >
                    {values.map(valeOb => {
                        return (
                            <MenuItem value={valeOb.value}>{valeOb.label}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        );
    }

    render() {

        var temp_msa = Math.max.apply(Math, this.state.msadata.map((o) => { return o[this.state.thingsToSelect[sessionStorage.getItem("tab")][this.state.selected_state]]; }))
        var temp2 = Math.max.apply(Math, this.state.data.map((o) => { return o[this.state.thingsToSelect[sessionStorage.getItem("tab")][this.state.selected_state]]; }))


        var expression_drink = ["match", ["get", "NAME10"]];
        var expression_zip = ["match", ["get", "ZCTA5CE10"]];
        var expression_msa = ["match", ["get", "cbsafp"]]


        if (temp2 > 1.20 * max_count || temp2 <= 0.8 * max_count) {
            max_count = temp2
        }

        if (temp_msa > 1.20 * max_count_msa || temp_msa <= 0.8 * max_count_msa) {
            max_count_msa = temp_msa
        }


        let zoomLevel = 0;
        // eslint-disable-next-line
        var zmlvl = 0;
        if (this.refs.map) {
            zoomLevel = this.refs.map._map.getZoom();
            zmlvl = this.refs.map._map.getZoom();
            var MaxBounds = this.refs.map._map.getBounds();
            var data = []
            var temp = {}

            if (zoomLevel >= 5) {

                temp['mapType'] = "zip"
                temp["boundaries"] = {}
                temp['boundaries']['latne'] = MaxBounds["_ne"]["lat"];
                temp['boundaries']['latsw'] = MaxBounds["_sw"]["lat"];
                temp['boundaries']['lonne'] = MaxBounds["_ne"]["lng"];
                temp['boundaries']['lonsw'] = MaxBounds["_sw"]["lng"];
                data.push(temp)
            }

            else {

                temp['mapType'] = "state"
                temp["boundaries"] = {}
                temp['boundaries']['latne'] = MaxBounds["_ne"]["lat"];
                temp['boundaries']['latsw'] = MaxBounds["_sw"]["lat"];
                temp['boundaries']['lonne'] = MaxBounds["_ne"]["lng"];
                temp['boundaries']['lonsw'] = MaxBounds["_sw"]["lng"];
                data.push(temp)

            }



            this.props.emit_data('map_boundaries', data);


        }




        const keyName = this.state.thingsToSelect[sessionStorage.getItem("tab")][this.state.selected_state];

        if (max_count_msa < 10) {

            this.state.msadata.forEach((row) => {
                var color;



                if (row[keyName] === 0) {
                    color = 'rgba(0,0,0,0)'
                }

                if (row[keyName] > 0 && row[keyName] <= 1) {
                    color = config[keyName].color1
                }

                if (row[keyName] > 1 && row[keyName] <= 2) {
                    color = config[keyName].color2
                }

                if (row[keyName] > 2 && row[keyName] <= 3) {
                    color = config[keyName].color3
                }

                if (row[keyName] > 3 && row[keyName] <= 4) {
                    color = config[keyName].color4
                }

                if (row[keyName] > 4 && row[keyName] <= 5) {
                    color = config[keyName].color5
                }

                if (row[keyName] > 5 && row[keyName] <= 6) {
                    color = config[keyName].color6
                }

                if (row[keyName] > 6 && row[keyName] <= 7) {
                    color = config[keyName].color7
                }

                if (row[keyName] > 7 && row[keyName] <= 8) {
                    color = config[keyName].color8
                }

                if (row[keyName] > 8 && row[keyName] <= 9) {
                    color = config[keyName].color9
                }

                if (row[keyName] >= 10) {
                    color = config[keyName].color10
                }

                expression_msa.push(row["MSA"], color);

            });

            expression_msa.push('rgba(0,0,0,0)');
        }




        if (max_count_msa > 10) {

            this.state.msadata.forEach((row) => {
                var color;

                if (row[keyName] === 0) {
                    color = config[keyName].color1
                }

                if (row[keyName] > 0 && row[keyName] <= max_count_msa * 0.8) {
                    color = config[keyName].color2
                }

                if (row[keyName] > max_count_msa * 0.8 && row[keyName] <= max_count_msa * 0.85) {
                    color = config[keyName].color3
                }

                if (row[keyName] > max_count_msa * 0.85 && row[keyName] <= max_count_msa * 0.9) {
                    color = config[keyName].color4
                }

                if (row[keyName] > max_count_msa * 0.9 && row[keyName] <= max_count_msa * 0.95) {
                    color = config[keyName].color5
                }

                if (row[keyName] > max_count_msa * 0.95 && row[keyName] <= max_count_msa) {
                    color = config[keyName].color6
                }

                if (row[keyName] > max_count_msa && row[keyName] <= max_count_msa * 1.05) {
                    color = config[keyName].color7
                }

                if (row[keyName] > max_count_msa * 1.05 && row[keyName] <= max_count_msa * 1.1) {
                    color = config[keyName].color8
                }

                if (row[keyName] > max_count_msa * 1.1 && row[keyName] <= max_count_msa * 1.15) {
                    color = config[keyName].color9
                }

                if (row[keyName] > max_count_msa * 1.15 && row[keyName] <= max_count_msa * 1.2) {
                    color = config[keyName].color10
                }



                expression_msa.push(row["MSA"], color);

            });

            expression_msa.push('rgba(0,0,0,0)');

        }


        if (max_count < 10) {

            this.state.data.forEach((row) => {
                var color;

                if (row[keyName] === 0) {
                    color = 'rgba(0,0,0,0)'
                }

                if (row[keyName] > 0 && row[keyName] <= 1) {
                    color = config[keyName].color1
                }

                if (row[keyName] > 1 && row[keyName] <= 2) {
                    color = config[keyName].color2
                }

                if (row[keyName] > 2 && row[keyName] <= 3) {
                    color = config[keyName].color3
                }

                if (row[keyName] > 3 && row[keyName] <= 4) {
                    color = config[keyName].color4
                }

                if (row[keyName] > 4 && row[keyName] <= 5) {
                    color = config[keyName].color5
                }

                if (row[keyName] > 5 && row[keyName] <= 6) {
                    color = config[keyName].color6
                }

                if (row[keyName] > 6 && row[keyName] <= 7) {
                    color = config[keyName].color7
                }

                if (row[keyName] > 7 && row[keyName] <= 8) {
                    color = config[keyName].color8
                }

                if (row[keyName] > 8 && row[keyName] <= 9) {
                    color = config[keyName].color9
                }

                if (row[keyName] >= 10) {
                    color = config[keyName].color10
                }

                expression_zip.push(row["Zip"], color);

            });

            expression_zip.push('rgba(0,0,0,0)');
        }






        if (max_count < 10) {
            this.state.data.forEach((row) => {
                var color;

                if (row[keyName] === 0) {
                    color = 'rgba(0,0,0,0)'
                }

                if (row[keyName] > 0 && row[keyName] <= 1) {
                    color = config[keyName].color1
                }

                if (row[keyName] > 1 && row[keyName] <= 2) {
                    color = config[keyName].color2
                }

                if (row[keyName] > 2 && row[keyName] <= 3) {
                    color = config[keyName].color3
                }

                if (row[keyName] > 3 && row[keyName] <= 4) {
                    color = config[keyName].color4
                }

                if (row[keyName] > 4 && row[keyName] <= 5) {
                    color = config[keyName].color5
                }

                if (row[keyName] > 5 && row[keyName] <= 6) {
                    color = config[keyName].color6
                }

                if (row[keyName] > 6 && row[keyName] <= 7) {
                    color = config[keyName].color7
                }

                if (row[keyName] > 7 && row[keyName] <= 8) {
                    color = config[keyName].color8
                }

                if (row[keyName] > 8 && row[keyName] <= 9) {
                    color = config[keyName].color9
                }

                if (row[keyName] >= 10) {
                    color = config[keyName].color10
                }

                expression_drink.push(row["State"], color);

            });

            expression_drink.push('rgba(0,0,0,0)');

            //console.log(expression_drink)
        }

        if (max_count > 10) {

            this.state.data.forEach((row) => {
                var color;

                if (row[keyName] === 0) {
                    color = config[keyName].color1
                }

                if (row[keyName] > 0 && row[keyName] <= max_count * 0.8) {
                    color = config[keyName].color2
                }

                if (row[keyName] > max_count * 0.8 && row[keyName] <= max_count * 0.85) {
                    color = config[keyName].color3
                }

                if (row[keyName] > max_count * 0.85 && row[keyName] <= max_count * 0.9) {
                    color = config[keyName].color4
                }

                if (row[keyName] > max_count * 0.9 && row[keyName] <= max_count * 0.95) {
                    color = config[keyName].color5
                }

                if (row[keyName] > max_count * 0.95 && row[keyName] <= max_count) {
                    color = config[keyName].color6
                }

                if (row[keyName] > max_count && row[keyName] <= max_count * 1.05) {
                    color = config[keyName].color7
                }

                if (row[keyName] > max_count * 1.05 && row[keyName] <= max_count * 1.1) {
                    color = config[keyName].color8
                }

                if (row[keyName] > max_count * 1.1 && row[keyName] <= max_count * 1.15) {
                    color = config[keyName].color9
                }

                if (row[keyName] > max_count * 1.15 && row[keyName] <= max_count * 1.2) {
                    color = config[keyName].color10
                }



                expression_zip.push(row["Zip"], color);

            });

            expression_zip.push('rgba(0,0,0,0)');

        }

        if (max_count > 10) {

            this.state.data.forEach((row) => {
                var color;

                if (row[keyName] === 0) {
                    color = config[keyName].color1
                }

                if (row[keyName] > 0 && row[keyName] <= max_count * 0.8) {
                    color = config[keyName].color2
                }

                if (row[keyName] > max_count * 0.8 && row[keyName] <= max_count * 0.85) {
                    color = config[keyName].color3
                }

                if (row[keyName] > max_count * 0.85 && row[keyName] <= max_count * 0.9) {
                    color = config[keyName].color4
                }

                if (row[keyName] > max_count * 0.9 && row[keyName] <= max_count * 0.95) {
                    color = config[keyName].color5
                }

                if (row[keyName] > max_count * 0.95 && row[keyName] <= max_count) {
                    color = config[keyName].color6
                }

                if (row[keyName] > max_count && row[keyName] <= max_count * 1.05) {
                    color = config[keyName].color7
                }

                if (row[keyName] > max_count * 1.05 && row[keyName] <= max_count * 1.1) {
                    color = config[keyName].color8
                }

                if (row[keyName] > max_count * 1.1 && row[keyName] <= max_count * 1.15) {
                    color = config[keyName].color9
                }

                if (row[keyName] > max_count * 1.15 && row[keyName] <= max_count * 1.2) {
                    color = config[keyName].color10
                }



                expression_drink.push(row["State"], color);

            });

            expression_drink.push('rgba(0,0,0,0)');

        }



        const { classes } = this.props;
        return (
            <div>
                <div className="CountryView" id="CountryView" ref="CountryView">

                    <MapGL
                        id="maps"
                        ref="map"
                        style={{ width: "100vw", height: "100vh" }}
                        // transitionDuration={1000}
                        // transitionInterpolator={new FlyToInterpolator()}
                        maxZoom={this.props.maxZoom}
                        minZoom={this.props.minZoom}
                        mapStyle={this.props.mapStyle}
                        latitude={this.state.viewport.latitude}
                        longitude={this.state.viewport.longitude}
                        pitch={this.state.viewport.pitch}
                        minPitch={this.state.viewport.minPitch}
                        maxPitch={this.state.viewport.maxPitch}
                        zoom={this.state.viewport.zoom}
                        center={this.props.center}
                        // maxBounds={[[-131.74648260475695,21.029837784870537],[-59.10026091189671, 53.61038940177997]]}
                        // {...this.state.viewport}
                        onViewportChange={viewport => this.setState({ viewport, expression_drink: expression_drink })}
                        accessToken={
                            "pk.eyJ1IjoiaXJkLWV4cGVyaWVuY2VsYWIiLCJhIjoiY2p4MzV1OWNwMGU2ZjRhb2hmaGk3a3hhNiJ9.WSSPwNtURkPTyewDE5N3FQ"
                        }
                    >
                        {zmlvl = 17.5 ?

                            <Popup
                                longitude={77.738293}
                                latitude={12.982915}

                            >
                                <div>  <img alt={'na'} onClick={this.OpenFamily.bind(this)} width="90vw" height="90vh" src={"Icon.png"}></img> 👋</div>
                            </Popup> : null
                        }

                        {zmlvl = 17.5 ?

                            <Marker
                                longitude={77.73920359532394}
                                latitude={12.98377605589465}

                            >

                                <div ref="Marker" style={{ display: 'none' }}>  <img alt={'na'} width="400vw" height="250vh" src={"Family.png"}></img> 👋</div>
                            </Marker> : null
                        }

                        <Source id='zip' type='vector' url='mapbox://ird-experiencelab.7pcfaa3f/' />

                        <Source id='msa' type='vector' url='mapbox://ird-experiencelab.bprqpgmc/' />

                        <Source id='state' type='vector' url={this.state.geourl} />

                        {/* These Layers are hosted on Mapbox on my account */}
                        {this.state.selected_layer === "msa" ?
                            <Layer
                                id='msalayer'
                                minzoom={5}
                                maxzoom={14}
                                type='fill'
                                source='msa'
                                source-layer='us_msa'
                                paint={{
                                    'fill-color': expression_msa,
                                    'fill-outline-color': '#800000',
                                    'fill-opacity': 0.8
                                }}
                            />
                            : null}

                        {this.state.selected_layer === 'zip' ?
                            <Layer
                                id='ziplayer'
                                minzoom={5}
                                maxzoom={14}
                                type='fill'
                                source='zip'
                                source-layer='zcta5'
                                paint={{
                                    'fill-color': expression_zip,
                                    'fill-outline-color': '#E37E1D',
                                    'fill-opacity': 0.8
                                }}
                            />
                            :
                            null
                        }

                        <Layer
                            id='statelayer'
                            minzoom={1}
                            maxzoom={5}
                            type='fill'
                            source='state'
                            source-layer='stategeo'
                            paint={{
                                'fill-color': expression_drink,
                                'fill-outline-color': config[keyName].color10,
                                'fill-opacity': 0.8
                            }}
                        />
                        {/* Layer_for_MapBox_Integration */}
                        <Layer
                            id="3d-buildings"
                            source="composite"
                            source-layer="building"
                            filter={["==", "extrude", "true"]}
                            type="fill-extrusion"
                            paint={{
                                "fill-extrusion-color": "#6397B8",
                                "fill-extrusion-height": [
                                    "interpolate",
                                    ["linear"],
                                    ["zoom"],
                                    15,
                                    0,
                                    15.05,
                                    ["get", "height"]
                                ],
                                "fill-extrusion-base": [
                                    "interpolate",
                                    ["linear"],
                                    ["zoom"],
                                    15,
                                    0,
                                    15.05,
                                    ["get", "min_height"]
                                ],
                                "fill-extrusion-opacity": 0.8
                            }}
                        />
                        <NavigationControl showCompass showZoom position='top-left' />

                    </MapGL>;

                    <div id="reset">
                        <img title='Reset' alt="reset" src="reticle.svg" ></img>
                    </div>

                    {
                        sessionStorage.getItem('simStarted') === 'true' ?
                            <div id="LegendButton" >
                                <Paper style={{padding:'3px'}}>
                                Legend {'  '}
                                <img onClick={() => this.setState({ isLegendOpened: !this.state.isLegendOpened })} style={{ cursor: 'pointer'}} title="Legend" alt="legend" id="LegendIcon" src={this.getLegendIcon()}></img>
                                </Paper></div> : null
                    }


                    <div id="LegendPaper">
                        {
                            sessionStorage.getItem('simStarted') === "true" && this.state.isLegendOpened ? this.getLegends(classes, keyName) : null
                        }
                    </div>

                    <img alt="zoomIn" src="add.svg" onClick={this.zoomIn.bind(this)} id="zoomIn" title={"Zoom In"}></img>
                    <img alt="zoomOut" src="substract.svg" onClick={this.zoomOut.bind(this)} id="zoomOut" title={"Zoom Out"}></img>

                    {
                        sessionStorage.getItem('simStarted') === "true" ?
                            <Paper id="AgentState" className={classes.stateSelectorPaper} elevation={1}>
                                {
                                    sessionStorage.getItem("tab") === 'admin' ?
                                        this.getDropdown(classes, "Physiological Activity", [
                                            {
                                                label: "Eat",
                                                value: "Eat"
                                            },
                                            {
                                                label: "Drink",
                                                value: "Drink"
                                            },
                                            {
                                                label: "Sleep",
                                                value: "Sleep"
                                            }
                                        ])
                                        :
                                        this.getDropdown(classes, "Consumption", [
                                            {
                                                label: "Your Brand",
                                                value: "YourBrand"
                                            },
                                            {
                                                label: "Competitors",
                                                value: "Competitors"
                                            }
                                        ])
                                }
                            </Paper>
                            : null
                    }

                    <Paper id="TickSelector" className={classes.zoomLevelSelectorPaper} elevation={1}>
                        <FormControl style={{ margin: 0 }} className={classes.formControl}>
                            <InputLabel className={classes.inputLabel} shrink htmlFor="mode-label-placeholder">
                                Aggregation Mode
                                </InputLabel>
                            <Select
                                value={this.state.selected_mode}
                                onChange={this.handleChange2}
                                input={<Input name={"Mode"} id="mode-label-placeholder" />}
                                displayEmpty
                                name={"Mode"}
                                className={classes.dropDown}
                            >
                                <MenuItem value="tick">Tick</MenuItem>
                                <MenuItem value="cumulative">Cumulative</MenuItem>
                            </Select>

                        </FormControl>

                    </Paper>

                    {
                        zoomLevel >= 5 ?
                            <Paper id="Drop" className={classes.zoomLevelSelectorPaper} elevation={1}>
                                <FormControl style={{ margin: 0 }} className={classes.formControl}>
                                    <InputLabel className={classes.inputLabel} shrink htmlFor="age-label-placeholder">
                                        Level
                                </InputLabel>
                                    <Select
                                        value={this.state.selected_layer}
                                        onChange={this.handleRadioChange}
                                        input={<Input name={"Level"} id="age-label-placeholder" />}
                                        displayEmpty
                                        name={"Level"}
                                        className={classes.dropDown}
                                    >
                                        <MenuItem value="msa">MSA</MenuItem>
                                        <MenuItem value="zip">Zip</MenuItem>
                                    </Select>

                                </FormControl>

                            </Paper>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CountryView);