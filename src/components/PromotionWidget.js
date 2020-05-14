// Import Required Libraries

import React, { Component } from "react";
import '../css/PromotionWidget.css';
import GlobalEvents from '../utils/global-events';
import Checkbox from './Checkbox';
import HorizontalBarChart from './HorizontalBarChart';
import * as helperFunctions from "../utils/helperFunction";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slider from 'rc-slider';
import Grid from '@material-ui/core/Grid';

const config = require('../utils/config');

let chartColors = ['#344955'];



function swapJsonKeyValues(input) { // Function to make JSON keys as values and values as keys
    var one, output = {};
    for (one in input) {
        if (input.hasOwnProperty(one)) {
            output[input[one]] = one;
        }
    }
    return output;
}

const category = {
    tv: {
        slots: [
            'Morning',
            'Midday',
            'Matinee',
            'Evening',
            'Night'
        ],
        days: [
            'Weekday',
            'Weekend'
        ],
        frequency: {
            '1x': 1,
            '2x': 2,
            '3x': 3,
            '4x': 4,
            '5x': 5
        }
    },
    radio: {
        slots: [
            'Morning',
            'Midday',
            'Matinee',
            'Evening',
            'Night'
        ],
        days: [
            'Weekday',
            'Weekend'
        ],
        frequency: {
            '1x': 1,
            '2x': 2,
            '3x': 3,
            '4x': 4,
            '5x': 5
        }
    },
    billboard: {
        slots: [],
        days: [],
        frequency: {
            '1x: Billboard bicycle': 1,
            '2x: Transit advertising (buses, taxis)': 2,
            '3x: Commuter displays(lamp post, bus stops)': 3,
            '4x: Print and digital': 4,
            '5x: All of the above': 5
        }
    },
    print: {
        days: [
            'Weekday',
            'Weekend'
        ],
        slots: [],
        frequency: {
            '1x: Classified ads section for newspapers': 1,
            '2x: Right column for newspapers': 2,
            '3x: Special sections popular magazines & newspapers': 3,
            '4x: Half page ad popular magazines & newspapers': 4,
            '5x: Cover Page All magazines & newspapers': 5
        }
    },
    digital: {
        slots: [
            'Native advertising - In-game, In-web series',
            'Search Engine Optimized Marketing (SEO)',
            'Display Marketing - Blogs, feeds or useful websites',
            'Social Media Marketing',
            'Email, Text - Direct Messaging'
        ],
        days: [],
        frequency: {}
    }
}

const prices = [{
    "Media": "digital",
    "Base_Price": 11000000,
    "Morning": 0,
    "Midday": 0,
    "Matinee": 0,
    "Evening": 0,
    "Night": 0,
    'Native advertising - In-game, In-web series': 750000,
    'Search Engine Optimized Marketing (SEO)': 1000000,
    'Display Marketing - Blogs, feeds or useful websites': 2000000,
    'Social Media Marketing': 5000000,
    'Email, Text - Direct Messaging': 9000000,
    "Weekday": 0,
    "Weekend": 0,
    "X1": 750000,
    "X2": 1000000,
    "X3": 2000000,
    "X4": 5000000,
    "X5": 9000000
},
{
    "Media": "print",
    "Base_Price": 35000000,
    "Morning": 0,
    "Midday": 0,
    "Matinee": 0,
    "Evening": 0,
    "Night": 0,
    "Weekday": 3000000,
    "Weekend": 5000000,
    "X1": 1000000,
    "X2": 2000000,
    "X3": 5000000,
    "X4": 8000000,
    "X5": 12000000
},
{
    "Media": "tv",
    "Base_Price": 37000000,
    "Morning": 6000000,
    "Midday": 3500000,
    "Matinee": 2000000,
    "Evening": 3500000,
    "Night": 2000000,
    "Weekday": 3000000,
    "Weekend": 4000000,
    "X1": 2500000,
    "X2": 3500000,
    "X3": 6000000,
    "X4": 9000000,
    "X5": 12000000
},
{
    "Media": "billboard",
    "Base_Price": 22000000,
    "Morning": 0,
    "Midday": 0,
    "Matinee": 0,
    "Evening": 0,
    "Night": 0,
    "Weekday": 0,
    "Weekend": 0,
    "X1": 1500000,
    "X2": 2500000,
    "X3": 4000000,
    "X4": 8000000,
    "X5": 12000000
},
{
    "Media": "radio",
    "Base_Price": 15000000,
    "Morning": 1250000,
    "Midday": 2000000,
    "Matinee": 1500000,
    "Evening": 2000000,
    "Night": 750000,
    "Weekday": 1200000,
    "Weekend": 1800000,
    "X1": 750000,
    "X2": 1750000,
    "X3": 2500000,
    "X4": 5000000,
    "X5": 10000000
}
];

class PromotionWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sliderSelectedValue: 2 * parseInt(sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200),
            category_selected: 'tv',
            loading: true,
            tv_slots: [],
            tv_days: [],
            tv_frequency: 0,
            radio_slots: [],
            radio_days: [],
            radio_frequency: 0,
            billboard_slots: [],
            billboard_days: [],
            billboard_frequency: 0,
            print_slots: [],
            print_days: [],
            print_frequency: 0,
            digital_slots: [],
            digital_days: [],
            digital_frequency: 0,
            tv_price: 0,
            radio_price: 0,
            billboard_price: 0,
            print_price: 0,
            digital_price: 0,
            estimatedPrice: 0,
            slots_checkboxes: category['tv']['slots'].reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
            days_checkboxes: category['tv']['days'].reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
            frequency_radio: Object.keys(category['tv']['frequency']).reduce(
                (option) => ({
                    [option]: false
                }),
                {}
            ),
            segmentData: [{
                name: 'Mature wealth',
                y: 38,
            }, {
                name: 'Fortunes families',
                y: 38
            }, {
                name: 'Active elders',
                y: 38
            }, {
                name: 'Average',
                y: 29.3
            }]
        }
    }

    changeProps(el, type) { // Function to change the promotion channel
        this.promoSave();
        this.deselectAll();
        this.deselectAllRadios();
        const self = this;

        setTimeout(() => {
            this.state[`${el}_slots`].forEach(d => {
                let t = document.getElementById(`${d}_slots`);
                if (t) {
                    t.click();
                }

            });
            this.state[`${el}_days`].forEach(d => {
                let t = document.getElementById(`${d}_days`);
                if (t) {
                    t.click();
                }

            });

            Object.keys(this.state[`${el}_frequency`]).forEach(d => {
                let t = document.getElementById(`${self.state[`${el}_frequency`][d]}_frequency`);
                if (t) {

                    t.click();
                }
            })
        }, 10);

        const types = ["tv", "radio", "billboard", "print", "digital"];
        this.refs[`${el}_div`].style.background = 'whitesmoke';
        this.refs[`${el}_div`].style['border'] = '1px solid #344955';
        this.refs[`${el}_div`].style['border-bottom'] = '1px solid whitesmoke';



        types.filter(function (ele) {
            return ele !== el;
        }).forEach(elem => {
            this.refs[`${elem}_div`].style.background = 'rgba(0,0,0,0)';
            this.refs[`${elem}_div`].style['border'] = '1px solid rgba(0,0,0,0)';
            this.refs[`${elem}_div`].style['border-bottom'] = '1px solid rgba(0,0,0,0)';

            // this.refs[`${el}_div`].style['border-top'] = '1px solid rgba(0,0,0,0)';
            // this.refs[`${el}_div`].style['border-left'] = '1px solid rgba(0,0,0,0)';
            // this.refs[`${el}_div`].style['border-right'] = '1px solid rgba(0,0,0,0)';
            // this.refs[`${el}_div`].style.border = '0px solid rgba(0,0,0,0)';
        })
        this.setState({
            category_selected: el
        })

        if (el === 'tv') {
            this.setState({
                segmentData: [{
                    name: 'Mature wealth',
                    y: 38,
                }, {
                    name: 'Fortunes families',
                    y: 38
                }, {
                    name: 'Active elders',
                    y: 38
                }, {
                    name: 'Average',
                    y: 29.3
                }]
            })
        } else if (el === 'radio') {
            this.setState({
                segmentData: [{
                    name: 'Cash carriers',
                    y: 19,
                }, {
                    name: 'Jumbo families',
                    y: 19
                }, {
                    name: 'Mixed middlers',
                    y: 19
                }, {
                    name: 'Average',
                    y: 16.1
                }]
            })
        } else if (el === 'billboard') {
            this.setState({
                segmentData: [{
                    name: 'Mature wealth',
                    y: 10,
                }, {
                    name: 'Fortunes families',
                    y: 10
                }, {
                    name: 'Leisure buffs',
                    y: 10
                }, {
                    name: 'Average',
                    y: 9
                }]
            })
        } else if (el === 'print') {
            this.setState({
                segmentData: [{
                    name: 'Our turn',
                    y: 20,
                }, {
                    name: 'Active elders',
                    y: 18
                }, {
                    name: 'Golden years',
                    y: 18
                }, {
                    name: 'Average',
                    y: 9.4
                }]
            })
        } else if (el === 'digital') {
            this.setState({
                segmentData: [{
                    name: 'Taking hold',
                    y: 61,
                }, {
                    name: 'Beginnings',
                    y: 61
                }, {
                    name: 'Cash carriers',
                    y: 41
                }, {
                    name: 'Average',
                    y: 32.7
                }]
            })
        }


    }

    selectAllCheckboxes = isSelected => { // Save state of checkbox 
        Object.keys(this.state.slots_checkboxes).forEach(checkbox => {
            this.setState(prevState => ({
                slots_checkboxes: {
                    ...prevState.slots_checkboxes,
                    [checkbox]: isSelected
                }
            }));
        });
        Object.keys(this.state.days_checkboxes).forEach(checkbox => {
            this.setState(prevState => ({
                days_checkboxes: {
                    ...prevState.days_checkboxes,
                    [checkbox]: isSelected
                }
            }));
        });
    };
    selectAllRadios = isSelected => {
        Object.keys(this.state.frequency_radio).forEach(radio => {
            this.setState(prevState => ({
                frequency_radio: {
                    ...prevState.frequency_radio,
                    [radio]: isSelected
                }
            }));
        });
    };

    selectAll = () => this.selectAllCheckboxes(true); // Select all checkboxes

    deselectAll = () => this.selectAllCheckboxes(false); // Deselect all Checkboxes

    deselectAllRadios = () => this.selectAllRadios(false);

    handleCheckboxChange(type, changeEvent) { // Handle Checkbox change event
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            [`${type}_checkboxes`]: {
                ...prevState[`${type}_checkboxes`],
                [name]: !prevState[`${type}_checkboxes`][name]
            }
        }));
    };

    createCheckbox(type, option) { // Function to create a checkbox
        return <Checkbox
            label={option}
            isSelected={this.state[`${type}_checkboxes`][option]}
            onCheckboxChange={this.handleCheckboxChange.bind(this, type)}
            type={`${type}`}
            key={option}
            ref={option}
        />
    }

    createCheckboxes = (el, type) => category[this.state.category_selected][type].map(this.createCheckbox.bind(this, type)); // Create checkboxes for each Slot, Channel and Frequency

    handleRadioChange(type, changeEvent) {
        const { name } = changeEvent.target;
        this.setState(prevState => ({
            [`${type}_radio`]: {
                [name]: !prevState[`${type}_radio`][name]
            }
        }));
    };

    createRadio(type, option) {
        return <Checkbox
            label={option}
            isSelected={this.state[`${type}_radio`][option]}
            onCheckboxChange={this.handleRadioChange.bind(this, type)}
            type={`${type}`}
            key={option}
            ref={option}
        />
    }

    createRadios = (el, type) => Object.keys(category[this.state.category_selected][type]).map(this.createRadio.bind(this, type));

    promoReset = () => {

        this.deselectAll();
        this.deselectAllRadios();
        this.promoSave();
        this.setState({sliderSelectedValue: 2 * parseInt(sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200)})
    };

    promoSave() {
        // console.log('promotions',this.state)
        this.setState({

            [`${this.state.category_selected}_slots`]: Object.keys(this.state.slots_checkboxes).filter(d => {
                return this.state.slots_checkboxes[d]
            }),
            [`${this.state.category_selected}_days`]: Object.keys(this.state.days_checkboxes).filter(d => {
                return this.state.days_checkboxes[d]
            }),
            [`${this.state.category_selected}_frequency`]: Object.keys(this.state.frequency_radio).filter(d => {
                return this.state.frequency_radio[d]
            }),
            [`${this.state.category_selected}_price`]: this.channelCost(this.state.category_selected, Object.keys(this.state.slots_checkboxes).filter(d => {
                return this.state.slots_checkboxes[d]
            }), Object.keys(this.state.days_checkboxes).filter(d => {
                return this.state.days_checkboxes[d]
            }), Object.keys(this.state.frequency_radio).filter(d => {
                return this.state.frequency_radio[d]
            }), (sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200))

        });

    };

    channelCost(channel, slots, days, intensity, no_of_agents) {

        console.log(channel)

        let chn_cost = prices.filter(d => {
            return d.Media === channel
        })[0];

        let slots_prices = slots.map(d => {
            return chn_cost[d]
        }).reduce((a, b) => a + b, 0)
        let days_prices = days.map(d => {
            return chn_cost[d]
        }).reduce((a, b) => a + b, 0)
        let frequency_prices = isNaN(chn_cost[`X${category[channel]['frequency'][intensity]}`]) ? 0 : chn_cost[`X${category[channel]['frequency'][intensity]}`];
        if (slots_prices > 0 || days_prices > 0 || frequency_prices > 0) {

            let price_chn = parseFloat(((chn_cost['Base_Price'] + slots_prices + days_prices + frequency_prices) * no_of_agents / 120000000).toFixed(2));

            if(channel === "digital"){
                price_chn = parseFloat(price_chn/52 + (this.state.sliderSelectedValue * 0.007566));
                return isNaN(price_chn) ? 0 : (price_chn);
            }
            return isNaN(price_chn) ? 0 : (price_chn/52);

        } else {
            return 0
        }

    }

    getSpends() {
        fetch(config.api.url + 'spends', {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Authorization": `${config.token}`,
                "Content-Type": "application/json",
            },

        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                // {
                //     "digitalmedia": this.state.digital_price,
                //     "tv":this.state.tv_price,
                //     "radio":this.state.radio_price,
                //     "billboard":this.state.billboard_price,
                //     "printmedia":this.state.print_price
                // }
                this.setState({
                    tv_price: data.tv,
                    radio_price: data.radio,
                    billboard_price: data.billboard,
                    print_price: data.printmedia,
                    digital_price: data.digitalmedia,
                    loading: false
                })

            })
    }

    getSlider = () => {
        const self = this;
        const n = parseInt(sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200)
        const sliderSelectedValue = self.state.sliderSelectedValue;
        return (
            <Grid item style={{ marginTop: 15 }} >
                <label >{"Impressions : " + sliderSelectedValue}</label>
                <Slider
                    min={n / 2}
                    max={4 * n}
                    step={1}
                    defaultValue={2 * n}
                    value={this.state.sliderSelectedValue}
                    onChange={(newVal) => {
                        self.setState({
                            sliderSelectedValue: newVal
                        });
                    }} />
            </Grid>
        );
    };

    renderDiv(el) {

        if (el === 'tv')
            return <div className="selectionBox">
                <div className="subTitleBox">
                    <div className="slotCheckbox">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select slots to advertise in
                        </div>
                        <div>
                            {this.createCheckboxes(null, 'slots')}
                        </div>
                    </div>
                    <div className="daysCheckbox">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select days of week to advertise
                        </div>
                        <div>
                            {this.createCheckboxes(null, 'days')}
                        </div>
                    </div>
                    <div className="frequencyRadio">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select frequency of marketing
                        </div>
                        <div>
                            {this.createRadios(null, 'frequency')}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '0.5vw' }}>
                        Estimated Spends:
                        ${(this.channelCost(this.state.category_selected, Object.keys(this.state.slots_checkboxes).filter(d => {
                            return this.state.slots_checkboxes[d]
                        }), Object.keys(this.state.days_checkboxes).filter(d => {
                            return this.state.days_checkboxes[d]
                        }), Object.keys(this.state.frequency_radio).filter(d => {
                            return this.state.frequency_radio[d]
                        }), (sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200))).toFixed(2)}/wk
                    </div>
                    <div className="promo_resetButton" ref="promo_reset" onClick={this.promoReset.bind(this)}> Reset
                    </div>
                    {/*<div className="promo_resetButton" ref="promo_save" onClick={this.promoSave.bind(this)}> Save</div>*/}
                </div>

                <div className="graphData">
                    <div>
                        Top three segments by reach
                        for {helperFunctions.convertToTitleCase(this.state.category_selected)}
                    </div>
                    <div style={{ width: '90%' }}>
                        <HorizontalBarChart key="customer_segments" color="whitesmoke"
                            data={this.state.segmentData || [{
                                name: 'Mature wealth',
                                y: 38,
                            }, {
                                name: 'Fortunes families',
                                y: 38
                            }, {
                                name: 'Active elders',
                                y: 38
                            }, {
                                name: 'Average',
                                y: 29.3
                            }]} colors={chartColors} tooltip={true} yTitle={"Percentage"}
                            label={"{y}%"} />
                    </div>

                </div>
            </div>

        else if (el === 'radio')
            return <div className="selectionBox">
                <div className="subTitleBox">
                    <div className="slotCheckbox">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select slots to advertise in
                        </div>
                        <div>
                            {this.createCheckboxes(null, 'slots')}
                        </div>
                    </div>
                    <div className="daysCheckbox">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select days of week to advertise
                        </div>
                        <div>
                            {this.createCheckboxes(null, 'days')}
                        </div>
                    </div>
                    <div className="frequencyRadio">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select frequency of marketing
                        </div>
                        <div>
                            {this.createRadios(null, 'frequency')}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '0.5vw' }}>
                        Estimated Spends:
                        ${(this.channelCost(this.state.category_selected, Object.keys(this.state.slots_checkboxes).filter(d => {
                            return this.state.slots_checkboxes[d]
                        }), Object.keys(this.state.days_checkboxes).filter(d => {
                            return this.state.days_checkboxes[d]
                        }), Object.keys(this.state.frequency_radio).filter(d => {
                            return this.state.frequency_radio[d]
                        }), (sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200))).toFixed(2)}/wk
                    </div>
                    <div className="promo_resetButton" ref="promo_reset" onClick={this.promoReset.bind(this)}> Reset
                    </div>
                    {/*<div className="promo_resetButton" ref="promo_save" onClick={this.promoSave.bind(this)}> Save</div>*/}
                </div>

                <div className="graphData">
                    <div>
                        Top three segments by reach
                        for {helperFunctions.convertToTitleCase(this.state.category_selected)}
                    </div>
                    <div style={{ width: '90%' }}>
                        <HorizontalBarChart key="customer_segments" color="whitesmoke"
                            data={this.state.segmentData || [{
                                name: 'Mature wealth',
                                y: 38,
                            }, {
                                name: 'Fortunes families',
                                y: 38
                            }, {
                                name: 'Active elders',
                                y: 38
                            }, {
                                name: 'Average',
                                y: 29.3
                            }]} colors={chartColors} tooltip={true} yTitle={"Percentage"}
                            label={"{y}%"} />
                    </div>

                </div>
            </div>

        else if (el === 'billboard')
            return <div className="selectionBox">
                <div className="subTitleBox">
                    <div className="frequencyRadio">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select intensity for marketing
                        </div>
                        <div>
                            {this.createRadios(null, 'frequency')}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '0.5vw' }}>
                        Estimated Spends:
                        ${(this.channelCost(this.state.category_selected, Object.keys(this.state.slots_checkboxes).filter(d => {
                            return this.state.slots_checkboxes[d]
                        }), Object.keys(this.state.days_checkboxes).filter(d => {
                            return this.state.days_checkboxes[d]
                        }), Object.keys(this.state.frequency_radio).filter(d => {
                            return this.state.frequency_radio[d]
                        }), (sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200))).toFixed(2)}/wk
                    </div>
                    <div className="promo_resetButton" ref="promo_reset" onClick={this.promoReset.bind(this)}> Reset
                    </div>
                    {/*<div className="promo_resetButton" ref="promo_save" onClick={this.promoSave.bind(this)}> Save</div>*/}
                </div>

                <div className="graphData">
                    <div>
                        Top three segments by reach
                        for {helperFunctions.convertToTitleCase(this.state.category_selected)}
                    </div>
                    <div style={{ width: '90%' }}>
                        <HorizontalBarChart key="customer_segments" color="whitesmoke"
                            data={this.state.segmentData || [{
                                name: 'Mature wealth',
                                y: 38,
                            }, {
                                name: 'Fortunes families',
                                y: 38
                            }, {
                                name: 'Active elders',
                                y: 38
                            }, {
                                name: 'Average',
                                y: 29.3
                            }]} colors={chartColors} tooltip={true} yTitle={"Percentage"}
                            label={"{y}%"} />
                    </div>

                </div>
            </div>

        else if (el === 'print')
            return <div className="selectionBox">
                <div className="subTitleBox">
                    <div className="frequencyRadio">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select intensity for marketing
                        </div>
                        <div>
                            {this.createRadios(null, 'frequency')}
                        </div>
                    </div>
                    <div className="daysCheckbox">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select days of week to advertise
                        </div>
                        <div>
                            {this.createCheckboxes(null, 'days')}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '0.5vw' }}>
                        Estimated Spends:
                        ${(this.channelCost(this.state.category_selected, Object.keys(this.state.slots_checkboxes).filter(d => {
                            return this.state.slots_checkboxes[d]
                        }), Object.keys(this.state.days_checkboxes).filter(d => {
                            return this.state.days_checkboxes[d]
                        }), Object.keys(this.state.frequency_radio).filter(d => {
                            return this.state.frequency_radio[d]
                        }), (sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200))).toFixed(2)}/wk
                    </div>
                    <div className="promo_resetButton" ref="promo_reset" onClick={this.promoReset.bind(this)}> Reset
                    </div>
                    {/*<div className="promo_resetButton" ref="promo_save" onClick={this.promoSave.bind(this)}> Save</div>*/}
                </div>

                <div className="graphData">
                    <div>
                        Top three segments by reach
                        for {helperFunctions.convertToTitleCase(this.state.category_selected)}
                    </div>
                    <div style={{ width: '90%' }}>
                        <HorizontalBarChart key="customer_segments" color="whitesmoke"
                            data={this.state.segmentData || [{
                                name: 'Mature wealth',
                                y: 38,
                            }, {
                                name: 'Fortunes families',
                                y: 38
                            }, {
                                name: 'Active elders',
                                y: 38
                            }, {
                                name: 'Average',
                                y: 29.3
                            }]} colors={chartColors} tooltip={true} yTitle={"Percentage"}
                            label={"{y}%"} />
                    </div>

                </div>
            </div>

        else if (el === 'digital')
            return <div className="selectionBox">
                <div className="subTitleBox">
                    <div className="frequencyRadio">
                        <div style={{ paddingBottom: '1vh' }}>
                            Select channels for marketing
                        </div>
                        <div>
                            {this.createCheckboxes(null, 'slots')}
                            {this.getSlider()}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '0.5vw', marginTop: 15 }}>
                        {/* Estimated Spends:
                        ${(this.channelCost(this.state.category_selected, Object.keys(this.state.slots_checkboxes).filter(d => {
                            return this.state.slots_checkboxes[d]
                        }), Object.keys(this.state.days_checkboxes).filter(d => {
                            return this.state.days_checkboxes[d]
                        }), Object.keys(this.state.frequency_radio).filter(d => {
                            return this.state.frequency_radio[d]
                        }), (sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200)) + this.state.sliderSelectedValue * 0.0104).toFixed(2)}/wk */}
                               Estimated Spends:
                        ${(this.channelCost(this.state.category_selected, Object.keys(this.state.slots_checkboxes).filter(d => {
                            return this.state.slots_checkboxes[d]
                        }), Object.keys(this.state.days_checkboxes).filter(d => {
                            return this.state.days_checkboxes[d]
                        }), Object.keys(this.state.frequency_radio).filter(d => {
                            return this.state.frequency_radio[d]
                        }), (sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200))).toFixed(2)}/wk
                    </div>
                    <div className="promo_resetButton" ref="promo_reset" onClick={this.promoReset.bind(this)}> Reset
                    </div>
                    {/*<div className="promo_resetButton" ref="promo_save" onClick={this.promoSave.bind(this)}> Save</div>*/}
                </div>

                <div className="graphData">
                    <div>
                        Top three segments by reach
                        for {helperFunctions.convertToTitleCase(this.state.category_selected)}
                    </div>
                    <div style={{ width: '90%' }}>
                        <HorizontalBarChart key="customer_segments" color="whitesmoke"
                            data={this.state.segmentData || [{
                                name: 'Mature wealth',
                                y: 38,
                            }, {
                                name: 'Fortunes families',
                                y: 38
                            }, {
                                name: 'Active elders',
                                y: 38
                            }, {
                                name: 'Average',
                                y: 29.3
                            }]} colors={chartColors} tooltip={true} yTitle={"Percentage"}
                            label={"{y}%"} />
                    </div>

                </div>
            </div>

    }

    getTotalSpends() {
        let MaxSpends = Math.ceil((sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200) * 0.021858482 * 1.25);
        let totalSpends = this.state.tv_price + this.state.radio_price + this.state.billboard_price + this.state.print_price + this.state.digital_price;
        if (totalSpends > MaxSpends) {
            if (this.refs.promo_submit) {
                this.refs.promo_submit.style.background = "grey"
                this.refs.promo_submit.style.pointerEvents = 'none'
            }
            this.props.showNotification("Spends are exceeding budget", { variant: "warning" });
            return 0
        } else {
            if (this.refs.promo_submit) {
                this.refs.promo_submit.style.background = "#1e73e8";
                this.refs.promo_submit.style.pointerEvents = 'auto'

            }
            return totalSpends.toFixed(2)
        }

    }

    getPromotion() {

        fetch(config.api.url + 'promotion', {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Authorization": `${config.token}`,
                "Content-Type": "application/json",
            },

        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTimeout(() => {
                    data.filter(d => {
                        return d.channel === 'tv'
                    })[0].slots.forEach(d => {
                        let t = document.getElementById(`${d}_slots`);
                        if (t) {
                            t.click();
                        }

                    });
                    data.filter(d => {
                        return d.channel === 'tv'
                    })[0].days.forEach(d => {
                        let t = document.getElementById(`${d}_days`);
                        if (t) {
                            t.click();
                        }

                    });

                    Object.keys([swapJsonKeyValues(category['tv']['frequency'])[data.filter(d => {
                        return d.channel === 'tv'
                    })[0].intensity]]).forEach(d => {
                        let t = document.getElementById(`${[swapJsonKeyValues(category['tv']['frequency'])[data.filter(d => {
                            return d.channel === 'tv'
                        })[0].intensity]][d]}_frequency`);
                        if (t) {

                            t.click();
                        }
                    })
                }, 10);
                this.setState({
                    tv_slots: data.filter(d => {
                        return d.channel === 'tv'
                    })[0].slots,
                    tv_days: data.filter(d => {
                        return d.channel === 'tv'
                    })[0].days,
                    tv_frequency: [swapJsonKeyValues(category['tv']['frequency'])[data.filter(d => {
                        return d.channel === 'tv'
                    })[0].intensity]],

                    radio_slots: data.filter(d => {
                        return d.channel === 'radio'
                    })[0].slots,
                    radio_days: data.filter(d => {
                        return d.channel === 'radio'
                    })[0].days,
                    radio_frequency: [swapJsonKeyValues(category['radio']['frequency'])[data.filter(d => {
                        return d.channel === 'radio'
                    })[0].intensity]],

                    billboard_slots: data.filter(d => {
                        return d.channel === 'billboard'
                    })[0].slots,
                    billboard_days: data.filter(d => {
                        return d.channel === 'billboard'
                    })[0].days,
                    billboard_frequency: [swapJsonKeyValues(category['billboard']['frequency'])[data.filter(d => {
                        return d.channel === 'billboard'
                    })[0].intensity]],

                    print_slots: data.filter(d => {
                        return d.channel === 'printmedia'
                    })[0].slots,
                    print_days: data.filter(d => {
                        return d.channel === 'printmedia'
                    })[0].days,
                    print_frequency: [swapJsonKeyValues(category['print']['frequency'])[data.filter(d => {
                        return d.channel === 'printmedia'
                    })[0].intensity]],

                    digital_slots: data.filter(d => {
                        return d.channel === 'digitalmedia'
                    })[0].slots,
                    digital_days: data.filter(d => {
                        return d.channel === 'digitalmedia'
                    })[0].days,
                    digital_frequency: [swapJsonKeyValues(category['digital']['frequency'])[data.filter(d => {
                        return d.channel === 'digitalmedia'
                    })[0].intensity]],

                    loading: false
                })

                this.getSpends();


                 console.log('promotion data',data)


            })


    }

    postPromotion = async () => {
        await this.promoSave();
        this.props.showNotification("Updating Promotion");
        fetch(config.api.url + 'promotion', {
            method: 'POST',
            headers: {
                'Authorization': `${config.token}`,
                'Accept': 'application/json',

                'Content-Type': 'application/json',

            },

            body: JSON.stringify({
                "promotions": [
                    {
                        "channel": "tv",
                        "slots": this.state.tv_slots.length > 0 ? this.state.tv_slots : ['None'],
                        "days": this.state.tv_days.length > 0 ? this.state.tv_days : ['None'],
                        "intensity": category['tv']['frequency'][this.state.tv_frequency[0]] ? category['tv']['frequency'][this.state.tv_frequency[0]] : "None",
                        "impressions": 0
                    },
                    {
                        "channel": "radio",
                        "slots": this.state.radio_slots.length > 0 ? this.state.radio_slots : ['None'],
                        "days": this.state.radio_days.length > 0 ? this.state.radio_days : ['None'],
                        "intensity": category['radio']['frequency'][this.state.radio_frequency[0]] ? category['radio']['frequency'][this.state.radio_frequency[0]] : "None",
                        "impressions": 0
                    },
                    {
                        "channel": "printmedia",
                        "slots": this.state.print_slots.length > 0 ? this.state.print_slots : ['None'],
                        "days": this.state.print_days.length > 0 ? this.state.print_days : ['None'],
                        "intensity": category['print']['frequency'][this.state.print_frequency[0]] ? category['print']['frequency'][this.state.print_frequency[0]] : "None",
                        "impressions": 0
                    },
                    {
                        "channel": "billboard",
                        "slots": this.state.billboard_slots.length > 0 ? this.state.billboard_slots : ['None'],
                        "days": this.state.billboard_days.length > 0 ? this.state.billboard_days : ['None'],
                        "intensity": category['billboard']['frequency'][this.state.billboard_frequency[0]] ? category['billboard']['frequency'][this.state.billboard_frequency[0]] : "None",
                        "impressions": 0
                    },
                    {
                        "channel": "digitalmedia",
                        "slots": this.state.digital_slots.length > 0 ? this.state.digital_slots : ['None'],
                        "days": ['None'],
                        "intensity": this.state.digital_slots.length > 0 ? this.state.digital_slots.length : 'None',
                        "impressions": this.state.sliderSelectedValue
                    }
                ],
                "promotion_spends": {
                    "digitalmedia": this.state.digital_price,
                    "tv": this.state.tv_price,
                    "radio": this.state.radio_price,
                    "billboard": this.state.billboard_price,
                    "printmedia": this.state.print_price
                }
            })

        }, { mode: 'cors' })

            .then(response => {

                return response.json();

            }).then(response => {
                this.props.showNotification("Promotion updated", { variant: "success" });
                GlobalEvents.trigger('PromotionUpdated');
                // console.log('promotion response', response)
                sessionStorage.setItem('PromotionUpdated', 'true')
            }).catch(err => {
                console.error(err);
                this.props.showNotification("Promotion could not be updated", { variant: "error" });
            });
    };

    componentDidMount() {
        if (sessionStorage.getItem('PromotionUpdated') === 'true') {
            this.getPromotion()

        } else {
            if (sessionStorage.getItem('simStarted') !== 'true') {
                fetch(config.api.url + 'promotion', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${config.token}`,
                        'Accept': 'application/json',

                        'Content-Type': 'application/json',

                    },

                    body: JSON.stringify({
                        "promotions": [
                            {
                                "channel": "tv",
                                "slots": ['None'],
                                "days": ['None'],
                                "intensity": "None",
                                "impressions": 0
                            },
                            {
                                "channel": "radio",
                                "slots": ['None'],
                                "days": ['None'],
                                "intensity": "None",
                                "impressions": 0
                            },
                            {
                                "channel": "printmedia",
                                "slots": ['None'],
                                "days": ['None'],
                                "intensity": "None",
                                "impressions": 0
                            },
                            {
                                "channel": "billboard",
                                "slots": ['None'],
                                "days": ['None'],
                                "intensity": "None",
                                "impressions": 0
                            },
                            {
                                "channel": "digitalmedia",
                                "slots": ['None'],
                                "days": ['None'],
                                "intensity": 'None',
                                "impressions": 1200
                            }
                        ],
                        "promotion_spends": {
                            "digitalmedia": this.state.digital_price,
                            "tv": this.state.tv_price,
                            "radio": this.state.radio_price,
                            "billboard": this.state.billboard_price,
                            "printmedia": this.state.print_price
                        }
                    })

                }, { mode: 'cors' })

                    .then(response => {
                        this.setState({
                            loading: false
                        })
                        return response.json();

                    }).catch(err => {
                        console.error(err);
                    });
            }
            else {
                this.setState({
                    loading: false
                })
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (sessionStorage.getItem('simCompleted') === 'true') {
            if (this.refs.promo_submit) {
                this.refs['promo_submit'].style.background = '#c1c1c1';
                this.refs['promo_submit'].style.pointerEvents = 'none';
                this.refs['PromotionWidget'].style.pointerEvents = 'none';
            }
        }
    }

    render() {
        // console.log('promotionsimset', JSON.parse(sessionStorage.getItem("simSettings") ? sessionStorage.getItem("simSettings") : 200))
        if (this.state.loading === false) {
            return (
                <div className="PromotionWidget" id="PromotionWidget" ref="PromotionWidget">

                    <div className="finalPromoTitles">
                        <div>
                            Budget
                            <div style={{ fontSize: '1.5vw' }}>
                                ${Math.ceil((sessionStorage.getItem('TotalAgents') ? sessionStorage.getItem('TotalAgents') : 200) * 0.021858482 * 1.25)}/wk
                            </div>
                        </div>
                        <div>
                            Total Spends
                            <div style={{ fontSize: '1.5vw' }}>
                                ${this.getTotalSpends()}/wk
                            </div>
                        </div>

                    </div>


                    <div>
                        <br />
                        Available Promotion Channels (on weekly basis)
                    </div>

                    <div className="promo_card">
                        <div className="promo_card_element" ref="tv_div" title={"Television Ads"}
                            onClick={this.changeProps.bind(this, "tv")}
                            style={{
                                "float": "left",
                                'background': 'whitesmoke',
                                border: '1px solid #344955',
                                borderBottom: '1px solid whitesmoke'
                            }}>
                            <img src="./PromoWidget/television.svg" alt="Avatar" style={{ "width": "2vw" }}></img>
                            <div className="promo_text_container">
                                <div>
                                    TV Ads
                                </div>
                                <div className={"secondChild_element"}>
                                    $ {this.state.tv_price.toFixed(2)}/wk
                                </div>
                            </div>
                        </div>
                        <div className="promo_card_element" ref="radio_div" title={"Radio Ads"}
                            onClick={this.changeProps.bind(this, "radio")}
                            style={{ "float": "left", marginLeft: "1vw" }}>
                            <img src="./PromoWidget/radio.svg" alt="Avatar" style={{ "width": "2vw" }}></img>
                            <div className="promo_text_container">
                                <div>
                                    Radio
                                </div>
                                <div className={"secondChild_element"}>
                                    $ {this.state.radio_price.toFixed(2)}/wk
                                </div>
                            </div>
                        </div>
                        <div className="promo_card_element" ref="billboard_div" title={"Billboard"}
                            onClick={this.changeProps.bind(this, "billboard")}
                            style={{ float: "left", marginLeft: "1vw" }}>
                            <img src="./PromoWidget/billboard.svg" alt="Avatar" style={{ "width": "2vw" }}></img>
                            <div className="promo_text_container">
                                <div>
                                    Billboard
                                </div>
                                <div className={"secondChild_element"}>
                                    $ {this.state.billboard_price.toFixed(2)}/wk
                                </div>
                            </div>
                        </div>
                        <div className="promo_card_element" ref="print_div" title={"Print Media"}
                            onClick={this.changeProps.bind(this, "print")}
                            style={{ float: "left", marginLeft: "1vw" }}>
                            <img src="./PromoWidget/print_media.svg" alt="Avatar" style={{ "width": "2vw" }}></img>
                            <div className="promo_text_container">
                                <div>
                                    Print Media
                                </div>
                                <div className={"secondChild_element"}>
                                    $ {this.state.print_price.toFixed(2)}/wk
                                </div>
                            </div>
                        </div>
                        <div className="promo_card_element" ref="digital_div" title={"Digital Media"}
                            onClick={this.changeProps.bind(this, "digital")}
                            style={{ float: "left", marginLeft: "1vw" }}>
                            <img src="./PromoWidget/digital-marketing.svg" alt="Avatar" style={{ "width": "2vw" }}></img>
                            <div className="promo_text_container">
                                <div>
                                    Digital Media
                                </div>
                                <div className={"secondChild_element"}>
                                    $ {(this.state.digital_price).toFixed(2)}/wk
                                </div>
                            </div>
                        </div>

                    </div>

                    {this.renderDiv(this.state.category_selected)}

                    <div className="finalPromoValues">
                        <div className="promo_submitButton" ref="promo_submit"
                            onClick={this.postPromotion.bind(this)}> Submit
                        </div>
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

export default PromotionWidget;
