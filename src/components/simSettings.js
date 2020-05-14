import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import '../css/App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

const styles = theme => ({
    root: {
        display: 'flex',
        width: "100%",
        height: "100%",
        background:'#D2DBE0'
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    expansionPanel: {
        width: "100%",
        background:'#D2DBE0'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    accordionItem: {
        margin: "10px",
        width: "50%"
    },
    sliderLabel: {
        fontSize: "15px"
    },
    radio: {
        '&$checked': {
            color: '#344955'
        }
    },
    checked: {}
});

class SimSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uniqueId: (new Date()).getTime(),
            modelType: "Individual",
            panelExpanded: "agents_ticks",
            dataToSend: {
                "simParameters": {
                    "n_agents": [
                        10
                    ],
                    "n_ticks": [
                        120
                    ]
                },
                "levelZeroParameters": {
                    "model_type": [
                        "Individual"
                    ],
                    "individualThresholds": {
                        "eat_hunger": [
                            7
                        ],
                        "eat_energy": [
                            2
                        ],
                        "drink_thirst": [
                            6
                        ],
                        "drink_energy": [
                            3
                        ]
                    },
                    "combinedThresholds": {
                        "hunger_wt": [
                            0.7
                        ],
                        "thirst_wt": [
                            0.7
                        ],
                        "energy_hunger_wt": [
                            0.3
                        ],
                        "energy_thirst_wt": [
                            0.3
                        ],
                        "eat_hunger_energy": [
                            5
                        ],
                        "drink_thirst_energy": [
                            5
                        ]
                    },
                    "commonThresholds": {
                        "hunger_seed": [
                            6
                        ],
                        "energy_seed": [
                            7
                        ],
                        "fatigue_seed": [
                            6.5
                        ],
                        "thirst_seed": [
                            5
                        ],
                        "sd_seed": [
                            0.3
                        ],
                        "sleep_fatigue_high": [
                            6
                        ],
                        "sleep_fatigue_low": [
                            3.5
                        ],
                        "sleep_lumens": [
                            0.2
                        ]
                    }
                },
                "productParameters": {
                    "Product_attributes": [
                        {
                            "brandName": "yourBrand",
                            "competitorBrand": false,
                            "health": 5,
                            "taste": 2,
                            "pleasure": 1,
                            "visualAppeal": 4,
                            "price": 6
                        }
                    ],
                    "beveragecategory": [
                        "Water"
                    ]
                },
                "simStatus": {
                    "stopSimFlag": false
                }
            },
            accordians: [
                {
                    label: "Agents & Hours",
                    id: "agents_ticks",
                    visibleIn: "both",
                    content: [
                        {
                            visibleIn: "both",
                            label: "Agents",
                            destination: "simParameters.n_agents",
                            minValue: 10,
                            maxValue: 1000,
                            selectedValue: 250,
                            step: 1
                        },
                        {
                            visibleIn: "both",
                            label: "Hours",
                            destination: "simParameters.n_ticks",
                            minValue: 24,
                            maxValue: 240,
                            selectedValue: 48,
                            step: 1
                        },
                        {
                            visibleIn: "both",
                            label: "Start Date",
                            // destination: "simParameters.n_ticks",
                            minValue: 24,
                            maxValue: 240,
                            selectedValue: new Date(new Date().setDate(new Date().getDate() -2 ))
    ,
                            step: 1
                        },
                        {
                            visibleIn: "both",
                            label: "End Date",
                            // destination: "simParameters.n_ticks",
                            minValue: 24,
                            maxValue: 240,
                            selectedValue: new Date(),
                            step: 1
                        }
                    ]
                },
                {
                    label: "Eat",
                    id: "eat",
                    visibleIn: "both",
                    content: [
                        {
                            visibleIn: "individual",
                            label: "Hunger",
                            destination: "levelZeroParameters.individualThresholds.eat_hunger",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 7,
                            step: 0.5
                        },
                        {
                            visibleIn: "individual",
                            label: "Energy",
                            destination: "levelZeroParameters.individualThresholds.eat_energy",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 2,
                            step: 0.5
                        },
                        {
                            visibleIn: "combined",
                            label: "Hunger-Energy",
                            destination: "levelZeroParameters.combinedThresholds.eat_hunger_energy",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 5,
                            step: 0.5
                        }
                    ]
                },
                {
                    label: "Drink",
                    id: "drink",
                    visibleIn: "both",
                    content: [
                        {
                            visibleIn: "individual",
                            label: "Thirst",
                            destination: "levelZeroParameters.individualThresholds.drink_thirst",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 6,
                            step: 0.5
                        },
                        {
                            visibleIn: "individual",
                            label: "Energy",
                            destination: "levelZeroParameters.individualThresholds.drink_energy",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 3,
                            step: 0.5
                        },
                        {
                            visibleIn: "combined",
                            label: "Thirst-Energy",
                            destination: "levelZeroParameters.combinedThresholds.drink_thirst_energy",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 5,
                            step: 0.5
                        }
                    ]
                },
                {
                    label: "Sleep",
                    id: "sleep",
                    visibleIn: "both",
                    content: [
                        {
                            visibleIn: "both",
                            label: "Fatigue - Induce Sleep",
                            destination: "levelZeroParameters.commonThresholds.sleep_fatigue_high",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 6,
                            step: 0.5
                        },
                        {
                            visibleIn: "both",
                            label: "Fatigue - Induce wakeup",
                            destination: "levelZeroParameters.commonThresholds.sleep_fatigue_low",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 3.5,
                            step: 0.5
                        },
                        {
                            visibleIn: "both",
                            label: "Lumens",
                            destination: "levelZeroParameters.commonThresholds.sleep_lumens",
                            minValue: 0,
                            maxValue: 1,
                            selectedValue: 0.2,
                            step: 0.1
                        }
                    ]
                },
                {
                    label: "Initial seed for agent states",
                    id: "seed",
                    visibleIn: "both",
                    content: [
                        {
                            visibleIn: "both",
                            label: "Hunger",
                            destination: "levelZeroParameters.commonThresholds.hunger_seed",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 6,
                            step: 0.5
                        },
                        {
                            visibleIn: "both",
                            label: "Energy",
                            destination: "levelZeroParameters.commonThresholds.energy_seed",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 7,
                            step: 0.5
                        },
                        {
                            visibleIn: "both",
                            label: "Thirst",
                            destination: "levelZeroParameters.commonThresholds.thirst_seed",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 5,
                            step: 0.5
                        },
                        {
                            visibleIn: "both",
                            label: "Fatigue",
                            destination: "levelZeroParameters.commonThresholds.fatigue_seed",
                            minValue: 1,
                            maxValue: 10,
                            selectedValue: 6.5,
                            step: 0.5
                        },
                        {
                            visibleIn: "both",
                            label: "Standard Deviation",
                            destination: "levelZeroParameters.commonThresholds.sd_seed",
                            minValue: 0,
                            maxValue: 1,
                            selectedValue: 0.3,
                            step: 0.1,
                            expand: true,
                        }
                    ]
                },
                {
                    label: "Weights",
                    id: "weights",
                    visibleIn: "combined",
                    content: [
                        {
                            visibleIn: "combined",
                            label: "Hunger",
                            destination: "levelZeroParameters.combinedThresholds.hunger_wt",
                            minValue: 0,
                            maxValue: 1,
                            selectedValue: 0.7,
                            step: 0.1
                        },
                        {
                            visibleIn: "combined",
                            label: "Thirst",
                            destination: "levelZeroParameters.combinedThresholds.thirst_wt",
                            minValue: 0,
                            maxValue: 1,
                            selectedValue: 0.7,
                            step: 0.1
                        },
                        {
                            visibleIn: "combined",
                            label: "Hunger-Energy Weight",
                            destination: "levelZeroParameters.combinedThresholds.energy_hunger_wt",
                            minValue: 0,
                            maxValue: 1,
                            selectedValue: 0.3,
                            step: 0.1
                        },
                        {
                            visibleIn: "combined",
                            label: "Thirst-Energy Weight",
                            destination: "levelZeroParameters.combinedThresholds.energy_thirst_wt",
                            minValue: 0,
                            maxValue: 1,
                            selectedValue: 0.3,
                            step: 0.1
                        }
                    ]
                }
            ]
        }

        // sessionStorage.setItem("simSettings", JSON.stringify(this.state));
    }

    componentDidMount() {
        const self = this;
        if (sessionStorage.getItem("simSettings")) {
            self.setState(JSON.parse(sessionStorage.getItem("simSettings")));
        } else {
            sessionStorage.setItem("simSettings", JSON.stringify(this.state));
        }
    }

    customSetState = (ob) => {
        const self = this;
        sessionStorage.setItem("simSettings", JSON.stringify(Object.assign(self.state, ob)));
        self.setState(ob);
    };

    handleChangeOfModel = (event, value) => {
        const self = this;
        self.setState({
            modelType: value
        });
    };

    handleChange = (accordianObject, sliderOb, newVal) => {
        const self = this;
        const allAccordians = self.state.accordians.map(acc => {
            if (acc.id === accordianObject.id) {
                acc.content = acc.content.map(sOb => {
                    if (sOb.label === sliderOb.label) {
                        sOb.selectedValue = newVal;
                    }
                    return sOb;
                });
            }
            return acc;
        });
        if(sliderOb.label === 'Agents')
        {
            sessionStorage.setItem('TotalAgents',newVal)
        }
        this.customSetState({ accordians: allAccordians });
    };

    handleSimTimeInput = (accordianObject, sliderOb, value) => {
        const newVal = new Date(value);
        const self = this;
        const allAccordians = self.state.accordians.map(acc => {
            if (acc.id === accordianObject.id) {
                acc.content = acc.content.map(sOb => {
                    if (sOb.label === sliderOb.label) {
                        sOb.selectedValue = newVal;
                    }
                    return sOb;
                });
            }
            return acc;
        });
        if(accordianObject.content[2].selectedValue && accordianObject.content[3].selectedValue) {
            // set number of ticks
            // console.log("both set");
            let endDate = typeof accordianObject.content[3].selectedValue === 'string' ? new Date(accordianObject.content[3].selectedValue) : accordianObject.content[3].selectedValue;
            let startDate = typeof accordianObject.content[2].selectedValue === 'string' ? new Date(accordianObject.content[2].selectedValue): accordianObject.content[2].selectedValue;
            let oneDay = 24*60*60*1000;
            let diffDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime())/(oneDay)));
            let numberOfTicks = parseInt(diffDays)*24;
            // console.log(diffDays, numberOfTicks);
            allAccordians[0].content[1].selectedValue = numberOfTicks;
        }
        if(sliderOb.label === 'Agents')
        {
            sessionStorage.setItem('TotalAgents',newVal)
        }
        this.customSetState({ accordians: allAccordians });
    };

    panelExpand = panel => (event, expanded) => {
        this.customSetState({
            panelExpanded: expanded ? panel : false,
        });
    };

    getSlider = (accordianObject, sliderOb, classes) => {
        const self = this;
        return (
            <Grid item className={classes.accordionItem}>
                <label className={classes.sliderLabel}>{sliderOb.label + " : " + sliderOb.selectedValue}</label>
                <Slider
                    min={sliderOb.minValue}
                    max={sliderOb.maxValue}
                    step={sliderOb.step}
                    defaultValue={sliderOb.selectedValue}
                    handle={handle}
                    sliderOb={sliderOb}
                    onChange={(newVal) => {
                        self.handleChange(accordianObject, sliderOb, newVal);
                    }} />
            </Grid>
        );
    };


    getCustomAccordionHTML = (accordianObject, classes) => {
        const self = this;
        return (
            <ExpansionPanel expanded={this.state.panelExpanded === accordianObject.id} className={classes.expansionPanel} onChange={this.panelExpand(accordianObject.id)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{accordianObject.label}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {[accordianObject.content[0]].map(sliderOb => {
                            if (sliderOb.visibleIn === "both" || sliderOb.visibleIn === self.state.modelType.toLowerCase()) {
                                return (self.getSlider(accordianObject, sliderOb, classes));
                            } else {
                                return null;
                            }
                        })}
                        <Grid item className={classes.accordionItem} style={{textAlign: 'center', width: '100%'}}>
                            <label className={classes.sliderLabel} style={{display: 'block', textAlign: 'left', padding: '1vh 12vh'}}>Select a date range:</label>
                            <label className={classes.sliderLabel} style={{display: 'block', textAlign: 'center',paddingBottom: '1vh'}}>From:</label>
                            <DatePicker
                                selectsStart
                                className='datePickerStyles'
                                selected={typeof accordianObject.content[2].selectedValue === 'string' ? new Date(accordianObject.content[2].selectedValue) : accordianObject.content[2].selectedValue }
                                onChange={(date) => this.handleSimTimeInput(accordianObject, accordianObject.content[2], date)}
                                style={{width: '5vw'}}
                            />
                            <label className={classes.sliderLabel} style={{display: 'block', textAlign: 'center',paddingBottom: '1vh'}}>To:</label>
                            <DatePicker
                                selectsEnd
                                className='datePickerStyles'
                                selected={typeof accordianObject.content[3].selectedValue === 'string' ? new Date(accordianObject.content[3].selectedValue) : accordianObject.content[3].selectedValue}
                                onChange={(date) => this.handleSimTimeInput(accordianObject, accordianObject.content[3], date)}
                            />
                        </Grid>
                        <Grid item className={classes.accordionItem} style={{textAlign: 'center'}}>
                            <label className={classes.sliderLabel}>{ (this.state.accordians[0].content[1].selectedValue === 0)?'':('Selected Duration ' + ((parseInt(this.state.accordians[0].content[1].selectedValue))/24) + ' days') }</label>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    };

    getAccordianHTML = (accordianObject, classes) => {
        const self = this;
        return (
            <ExpansionPanel expanded={this.state.panelExpanded === accordianObject.id} className={classes.expansionPanel} onChange={this.panelExpand(accordianObject.id)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{accordianObject.label}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {accordianObject.content.map(sliderOb => {
                            if (sliderOb.visibleIn === "both" || sliderOb.visibleIn === self.state.modelType.toLowerCase()) {
                                return (self.getSlider(accordianObject, sliderOb, classes));
                            } else {
                                return null;
                            }
                        })}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    render() {
        const self = this;
        const { classes } = this.props;
        const { accordians, modelType } = this.state;
        return (
            <div style={{background :"red"}} id="simSettings" key={self.state.uniqueId}>
                <Paper className={classes.root}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                    {self.getCustomAccordionHTML(accordians[0], classes)}
                        
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <FormControl className={classes.formControl}>
                                <FormLabel>Select Thresholding type: </FormLabel>
                                <RadioGroup
                                    aria-label="modelType"
                                    name="modelType"
                                    className={classes.group}
                                    value={this.state.modelType}
                                    onChange={this.handleChangeOfModel}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <FormControlLabel
                                                value="individual"
                                                control={<Radio classes={{root: classes.radio, checked: classes.checked}} color="primary" name="modelType" checked={this.state.modelType.toLowerCase() === 'individual'} />}
                                                label="Individual"
                                                labelPlacement="start"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel
                                                value="combined"
                                                control={<Radio classes={{root: classes.radio, checked: classes.checked}} color="primary" name="modelType" checked={this.state.modelType.toLowerCase() === 'combined'} />}
                                                label="Combined"
                                                labelPlacement="start"
                                            />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {accordians.slice(1).map(accordianObject => {
                            if (accordianObject.visibleIn === "both" || accordianObject.visibleIn === modelType.toLowerCase()) {
                                return self.getAccordianHTML(accordianObject, classes);
                            } else {
                                return null;
                            }
                        })}
                    </Grid>
                </Paper>
            </div >
        )
    }
}

SimSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimSettings);