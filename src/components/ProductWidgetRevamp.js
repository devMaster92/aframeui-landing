// Import Required Libraries

import React, {Component} from "react";
import '../css/ProductWidget.css';
import StarRatings from 'react-star-ratings';
import GlobalEvents from '../utils/global-events';
import Checkbox from './Checkbox';
import HorizontalBarChart from './HorizontalBarChart';
import CircularProgress from "@material-ui/core/CircularProgress";
import * as helperFunctions from "../utils/helperFunction";


const config = require('../utils/config');

var loading = true;
function convertRange(value, r1, r2) {
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}

let chartColors = ['#344955'];

const names_base = { // Addons for every beverage category
    water: {
        addons: [
            "no_added_sugar",
            "no_added_salt",
            "organic",
            "natural_flavour",
            "artificial_flavour"
        ]
    },
    milk: {
        addons: [
            "low_carb",
            "no_added_sugar",
            "organic",
            "natural_colour",
            "artificial_colour",
            "probiotic",
            "no_preservative",
            "natural_flavour",
            "artificial_flavour"
        ]
    },
    coffee: {
        addons: [
            "no_added_sugar",
            "organic",
            "natural_colour",
            "artificial_colour",
            "probiotic",
            "caffeine_free",
            "no_preservative",
            "natural_flavour",
            "artificial_flavour"

        ]
    },
    tea: {
        addons: [
            "no_added_sugar",
            "no_added_salt",
            "organic",
            "natural_colour",
            "artificial_colour",
            "probiotic",
            "no_preservative",
            "natural_flavour",
            "artificial_flavour"

        ]
    },
    carbonation: {
        addons: [
            "low_carb",
            "no_added_sugar",
            "no_added_salt",
            "organic",
            "natural_colour",
            "artificial_colour",
            "no_preservative",
            "natural_flavour",
            "artificial_flavour"

        ]
    },
    fruit: {
        addons: [
            "low_carb",
            "no_added_sugar",
            "organic",
            "natural_colour",
            "artificial_colour",
            "probiotic",
            "no_preservative",
            "natural_flavour",
            "artificial_flavour"
        ]
    }
}

var product_configs = { // Indexes for every beverage category
    "water": {
        "health": "5",
        "taste": "1",
        "pleasure": "1",
        "visual": "4",
        "price": "0.15"
    },
    "milk": {
        "health": "4",
        "taste": "4",
        "pleasure": "4",
        "visual": "4",
        "price": "1.35"
    },
    "tea": {
        "health": "4",
        "taste": "5",
        "pleasure": "5",
        "visual": "4",
        "price": "0.5"
    },
    "coffee": {
        "health": "3",
        "taste": "5",
        "pleasure": "5",
        "visual": "4",
        "price": "0.35"
    },
    "fruit": {
        "health": "5",
        "taste": "6",
        "pleasure": "6",
        "visual": "4",
        "price": "0.56"
    },
    "carbonation": {
        "health": "1",
        "taste": "7",
        "pleasure": "7",
        "visual": "4",
        "price": "0.08"
    },
    "natural_flavour": {
        "health": "1",
        "taste": "1",
        "pleasure": "0",
        "visual": "0",
        "price": "0.9"
    },
    "natural_colour": {
        "health": "1",
        "taste": "0",
        "pleasure": "0",
        "visual": "-1",
        "price": "0.9"
    },
    "artificial_flavour": {
        "health": "0",
        "taste": "1",
        "pleasure": "0",
        "visual": "0",
        "price": "0.7"
    },
    "artificial_colour": {
        "health": "0",
        "taste": "0",
        "pleasure": "0",
        "visual": "1",
        "price": "0.7"
    },
    "low_carb": {
        "health": "2",
        "taste": "0",
        "pleasure": "-1",
        "visual": "0",
        "price": "0"
    },
    "no_added_sugar": {
        "health": "2",
        "taste": "-1",
        "pleasure": "-1",
        "visual": "0",
        "price": "0"
    },
    "no_added_salt": {
        "health": "2",
        "taste": "-2",
        "pleasure": "-1",
        "visual": "0",
        "price": "0"
    },
    "organic": {
        "health": "3",
        "taste": "0",
        "pleasure": "0",
        "visual": "0",
        "price": "0.85"
    },
    "probiotic": {
        "health": "2",
        "taste": "0",
        "pleasure": "0",
        "visual": "0",
        "price": "1.2"
    },
    "caffeine_free": {
        "health": "1",
        "taste": "-1",
        "pleasure": "-2",
        "visual": "0",
        "price": "0"
    },
    "no_preservative": {
        "health": "1",
        "taste": "0",
        "pleasure": "0",
        "visual": "0",
        "price": "0.2"
    },
    "none": {
        "health": "0",
        "taste": "0",
        "pleasure": "0",
        "visual": "0",
        "price": "0"
    },
    "alcohol": {
        "health": "0",
        "taste": "0",
        "pleasure": "0",
        "visual": "0",
        "price": "0.7"
    }
}


class ProductWidgetRevamp extends Component {
    constructor(props) {
        super(props)
        this.state = { // default state
            category_selected: 'coffee',
            addons_selected: [],
            product_image: 'coffee.svg',
            drinkingMomentData: [{
                name: 'Time Out At Work/School',
                y: 61.41,
            }, {
                name: 'Comforting Meals at Home',
                y: 25.84
            }, {
                name: 'Relaxing Screen Time',
                y: 11.67
            }, {
                name: 'Others',
                y: 4.67
            }],
            segmentData: [{
                name: 'Jumbo Families',
                y: 9.35,
            }, {
                name: 'Active Elders',
                y: 9.27
            }, {
                name: 'Fortunes & Families',
                y: 7.93
            }, {
                name: 'Others',
                y: 73.45
            }],
            categoryPercentage: '7.58%',
            checkboxes: names_base['coffee']['addons'].reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            )
        }
    }

    selectAllCheckboxes = isSelected => { // Save the checkbox state with previous checkbox state
        Object.keys(this.state.checkboxes).forEach(checkbox => {
            this.setState(prevState => ({
                checkboxes: {
                    ...prevState.checkboxes,
                    [checkbox]: isSelected
                }
            }));
        });
    };

    selectAll = () => this.selectAllCheckboxes(true); // Select All Checkboxes

    deselectAll = () => this.selectAllCheckboxes(false); // Deselect All Checkboxes

    handleCheckboxChange = changeEvent => { // Get the selected checkbox
        const {name} = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));
    };

    handleFormSubmit = formSubmitEvent => { // Submit the form 
        formSubmitEvent.preventDefault();

        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                // console.log(checkbox, "is selected.");
            });
    };

    createCheckbox = option => ( // Create a Check Box
        <Checkbox
            label={option}
            isSelected={this.state.checkboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            type='addon'
            key={option}
            ref={option}
        />
    );

    createCheckboxes = () => names_base[this.state.category_selected]['addons'].map(this.createCheckbox); // Create check boxes for all addons

    changeProps(el, type) { // Change the beverage category
        this.deselectAll();
        const types = ["water", "milk", "coffee", "tea", "carbonation", "fruit"];
        // this.refs[`${el}_div`].style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2);';
        this.refs[`${el}_div`].style.borderBottom = '1.5px solid #344955';
        types.filter(function (ele) {
            return ele !== el;
        }).forEach(elem => {
            // this.refs[`${elem}_div`].style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0);';
            this.refs[`${elem}_div`].style.borderBottom = '1.5px solid rgba(0,0,0,0)';
        })
        this.setState({
            category_selected: el,
            addons_selected: names_base[el]['addons']
        })

        if (el === 'tea') {
            this.setState({
                drinkingMomentData:
                    [{
                        name: 'Time Out At Work/School',
                        y: 61.41,
                    }, {
                        name: 'Nourishing Breakfast',
                        y: 25.84
                    }, {
                        name: 'Nurturing Meals at home',
                        y: 11.67
                    }, {
                        name: 'Others',
                        y: 4.67
                    }],
                segmentData:
                    [{
                        name: 'Leisure Buffs',
                        y: 12.46,
                    }, {
                        name: 'Active Elders',
                        y: 11.55
                    }, {
                        name: 'Fortunes & Families',
                        y: 7.18
                    }, {}, {
                        name: 'Others',
                        y: 70.15
                    }],
                categoryPercentage: '7.58%',
                product_image: 'cup.svg'
            })
        } else if (el === 'coffee') {
            this.setState({
                drinkingMomentData: [{
                    name: 'Time Out At Work/School',
                    y: 61.41,
                }, {
                    name: 'Comforting Meals at Home',
                    y: 25.84
                }, {
                    name: 'Relaxing Screen Time',
                    y: 11.67
                }, {
                    name: 'Others',
                    y: 4.67
                }],
                segmentData:
                    [{
                        name: 'Jumbo Families',
                        y: 9.35,
                    }, {
                        name: 'Active Elders',
                        y: 9.27
                    }, {
                        name: 'Fortunes & Families',
                        y: 7.93
                    }, {
                        name: 'Others',
                        y: 73.45
                    }],
                categoryPercentage: '7.58%',
                product_image: 'coffee.svg'

            })
        } else if (el === 'fruit') {
            this.setState({
                drinkingMomentData:
                    [{
                        name: 'Relaxing Screen Time',
                        y: 61.41,
                    }, {
                        name: 'Routine Habits at Home',
                        y: 25.84
                    }, {
                        name: 'Time Out At Work/School',
                        y: 11.67
                    }, {
                        name: 'Others',
                        y: 4.67
                    }],
                segmentData:
                    [{
                        name: 'Active Elders',
                        y: 9.77,
                    }, {
                        name: 'Leisure Buffs',
                        y: 8.28
                    }, {
                        name: 'Flush Families',
                        y: 7.65
                    }, {
                        name: 'Others',
                        y: 74.30
                    }],
                categoryPercentage: '6.71%',
                product_image: 'pineapple-juice.svg'
            })
        } else if (el === 'milk') {
            this.setState({
                drinkingMomentData:
                    [{
                        name: 'Nourishing Breakfast',
                        y: 61.41,
                    }, {
                        name: 'Nurturing Meals at home',
                        y: 25.84
                    }, {
                        name: 'Energizing Breakfast',
                        y: 11.67
                    }, {
                        name: 'Others',
                        y: 4.67
                    }],
                segmentData:
                    [{
                        name: 'Leisure Buffs',
                        y: 9.41
                    }, {
                        name: 'Flush Families',
                        y: 8.23
                    }, {
                        name: 'Modest Means',
                        y: 7.17
                    }, {
                        name: 'Others',
                        y: 75.20
                    }],
                categoryPercentage: '7.29%',
                product_image: 'milk.svg'
            })
        } else if (el === 'carbonation') {
            this.setState({
                drinkingMomentData:
                    [{
                        name: 'Relaxing Screen Time',
                        y: 61.41,
                    }, {
                        name: 'Energy on the Run',
                        y: 25.84
                    }, {
                        name: 'Mental Refreshment at home',
                        y: 11.67
                    }, {
                        name: 'Others',
                        y: 4.67
                    }],
                segmentData:
                    [{
                        name: 'Leisure Buffs',
                        y: 8.91
                    }, {
                        name: 'Active Elders',
                        y: 8.47
                    }, {
                        name: 'Flush Families',
                        y: 7.5
                    }, {
                        name: 'Others',
                        y: 75.09
                    }],
                categoryPercentage: '13.41%',
                product_image: 'soft-drink.svg'
            })
        } else if (el === 'water') {
            this.setState({
                drinkingMomentData:
                    [{
                        name: 'Routine Habits at Home',
                        y: 61.41,
                    }, {
                        name: 'Daily Unwind',
                        y: 25.84
                    }, {
                        name: 'Physical Recovery',
                        y: 11.67
                    }, {
                        name: 'Others',
                        y: 4.67
                    }],
                segmentData:
                    [{
                        name: 'Active Elders',
                        y: 9.39
                    }, {
                        name: 'Leisure Buffs',
                        y: 8.53
                    }, {
                        name: 'Jumbo Families',
                        y: 6.71
                    }, {
                        name: 'Others',
                        y: 75.36
                    }],
                categoryPercentage: '30.32%',
                product_image: 'water.svg'
            })
        }

    }

    handleSelected(e, el) {
        // console.log('selected', e, el);


    }

    postPrice() { // Send the price to the orchestrator
        let manf_cost = parseFloat(product_configs[this.state.category_selected]["price"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
            return this.state.checkboxes[d]
        }).reduce(function (acc, val) {
            return acc + parseFloat(product_configs[val]["price"]);
        }, 0));

        if (sessionStorage.getItem('priceUpdated') !== 'true') {
            fetch(config.api.url + 'pricing', {
                method: 'POST',
                headers: {
                    'Authorization': `${config.token}`,
                    'Accept': 'application/json',

                    'Content-Type': 'application/json',

                },

                body: JSON.stringify({

                    "cost_to_customer": `$${((parseFloat(1) + parseFloat(manf_cost)) + Math.ceil((parseFloat(1) + parseFloat(manf_cost)) * 0.3)).toFixed(2)}`,

                    "manufacturing_cost": `$${manf_cost}`,

                    "profit_margin": `${Math.ceil((1) * 100 / (manf_cost))}`

                })

            }, {mode: 'cors'})

                .then(response => {

                    return response.json();

                }).then(response => {
                sessionStorage.setItem('priceData', JSON.stringify({

                    profit_value: 1

                }));
                this.getBevData();
                this.getCompData();
                GlobalEvents.trigger('pricing_updated')
            }).catch(err => {
                console.error(err);
            });
        }


    }

    postProduct() { // Send the product to the orchestrator

        GlobalEvents.trigger('openpricing', 'open');

        if (sessionStorage.getItem('simStarted') === 'true') {
            this.props.showNotification("Cannot update during simulation run", {variant: "warning"})
        } else {


            const self = this;
            self.props.showNotification("Updating Product");
            sessionStorage.setItem('productData', JSON.stringify({
                    "product_data": {
                        "category": this.state.category_selected,
                        "addons": Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }),
                        "health": parseFloat(product_configs[this.state.category_selected]["health"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["health"]);
                        }, 0)),
                        "taste": parseFloat(product_configs[this.state.category_selected]["taste"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["taste"]);
                        }, 0)),
                        "pleasure": parseFloat(product_configs[this.state.category_selected]["pleasure"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["pleasure"]);
                        }, 0)),
                        "visual": parseFloat(product_configs[this.state.category_selected]["visual"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["visual"]);
                        }, 0))
                    },
                    "manufacturing_cost": `$${parseFloat(product_configs[this.state.category_selected]["price"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                        return this.state.checkboxes[d]
                    }).reduce(function (acc, val) {
                        return acc + parseFloat(product_configs[val]["price"]);
                    }, 0))}`
                })
            );
            fetch(config.api.url + 'product', {
                method: 'POST',
                headers: {
                    "Authorization": `${config.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "product_data": {
                        "category": this.state.category_selected,
                        "addons": Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }),
                        "health": parseFloat(product_configs[this.state.category_selected]["health"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["health"]);
                        }, 0)),
                        "taste": parseFloat(product_configs[this.state.category_selected]["taste"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["taste"]);
                        }, 0)),
                        "pleasure": parseFloat(product_configs[this.state.category_selected]["pleasure"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["pleasure"]);
                        }, 0)),
                        "visual": parseFloat(product_configs[this.state.category_selected]["visual"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["visual"]);
                        }, 0)),
                        "product_image": this.state.product_image
                    },
                    "manufacturing_cost": `$${parseFloat(product_configs[this.state.category_selected]["price"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                        return this.state.checkboxes[d]
                    }).reduce(function (acc, val) {
                        return acc + parseFloat(product_configs[val]["price"]);
                    }, 0))}`,
                    "clientId": `${sessionStorage.getItem('ClientId')}`

                })
            }, {mode: 'cors'})
                .then(response => {
                    return response.json();
                }).then(response => {
                GlobalEvents.trigger('price_rerender');
                GlobalEvents.trigger('changeWidget', 'pricing');
                sessionStorage.setItem("ProductUpdated", true);
                self.props.showNotification("Product Updated", {variant: "success"});
                this.postPrice();
                this.refs['submit'].innerHTML = 'Update';
                // console.log(response);

            }).catch(err => {
                self.props.showNotification("Product could not be updated", {variant: "error"});
                console.error(err);
            });

        }
    }

    fetchIngredients(){ // Fetch the list of addons

        fetch(config.api.url + 'ingredients', {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Authorization": `${config.token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
    
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                product_configs = data;
                loading = false
                this.forceUpdate();
            })
        }

     componentDidMount() {

        const prod_data = JSON.parse(sessionStorage.getItem('productData'))
        if (prod_data) {
            
            this.refs[`${prod_data.product_data.category}_div`].click()
            prod_data.product_data.addons.forEach(d => {
                document.getElementById(`${d}_addon`).click();
            });

            this.refs['submit'].innerHTML = 'Update';

        }
        if (sessionStorage.getItem('ProductUpdated') !== 'true' && sessionStorage.getItem('simStarted') !== 'true') {
            fetch(config.api.url + 'product', {
                method: 'POST',
                headers: {
                    "Authorization": `${config.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "product_data": {
                        "category": this.state.category_selected,
                        "addons": Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }),
                        "health": parseFloat(product_configs[this.state.category_selected]["health"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["health"]);
                        }, 0)),
                        "taste": parseFloat(product_configs[this.state.category_selected]["taste"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["taste"]);
                        }, 0)),
                        "pleasure": parseFloat(product_configs[this.state.category_selected]["pleasure"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["pleasure"]);
                        }, 0)),
                        "visual": parseFloat(product_configs[this.state.category_selected]["visual"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]["visual"]);
                        }, 0)),
                        "product_image": this.state.product_image
                    },
                    "manufacturing_cost": `$${parseFloat(product_configs[this.state.category_selected]["price"]) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                        return this.state.checkboxes[d]
                    }).reduce(function (acc, val) {
                        return acc + parseFloat(product_configs[val]["price"]);
                    }, 0))}`,
                    "clientId": `${sessionStorage.getItem('ClientId')}`

                })
            }, {mode: 'cors'})
                .then(response => {
                    return response.json();
                }).then(response => {
                GlobalEvents.trigger('price_rerender')


                this.postPrice();

                // console.log(response);

            }).catch(err => {

                console.error(err);
            });
        }

       this.fetchIngredients()

    }

    render() { // Self Explanatory
        if (sessionStorage.getItem('simStarted') === 'true') {
            if (this.refs.submit) {
                this.refs['submit'].style.background = '#c1c1c1';
                this.refs['submit'].style.pointerEvents = 'none';
                this.refs['ProductWidget'].style.pointerEvents = 'none';
            }
        }


        if(loading === false){
        return (
            <div className="ProductWidget" id="ProductWidget" ref="ProductWidget"> Choose A Category


                <div className="card">
                    <div className="card_element" ref="tea_div" title={"Tea"}
                         onClick={this.changeProps.bind(this, "tea")}
                         style={{"float": "left"}}>
                        <img src="cup.svg" alt="Avatar" style={{"width": "2.5vw"}}></img>
                        <div className="text_container">
                            Tea ($0.5)
                        </div>
                    </div>
                    <div className="card_element" ref="coffee_div" title={"Coffee"}
                         onClick={this.changeProps.bind(this, "coffee")}
                         style={{"float": "left", marginLeft: "2vw", borderBottom: '1.5px solid #344955'}}>
                        <img src="coffee.svg" alt="Avatar" style={{"width": "2.5vw"}}></img>
                        <div className="text_container">
                            Coffee ($0.35)
                        </div>
                    </div>
                    <div className="card_element" ref="fruit_div" title={"Fruit Juice"}
                         onClick={this.changeProps.bind(this, "fruit")}
                         style={{float: "left", marginLeft: "2vw"}}>
                        <img src="pineapple-juice.svg" alt="Avatar" style={{"width": "2.5vw"}}></img>
                        <div className="text_container">
                            Juice ($0.56)
                        </div>
                    </div>

                </div>
                <div className="card_2" style={{marginBottom: '0.5vw'}}>
                    <div className="card_element" ref="milk_div" title={"Milk"}
                         onClick={this.changeProps.bind(this, "milk")}
                         style={{"float": "left"}}>
                        <img src="milk.svg" alt="Avatar" style={{"width": "2.5vw"}}></img>
                        <div className="text_container">
                            Milk ($1.35)
                        </div>
                    </div>
                    <div className="card_element" ref="carbonation_div" title={"Soft/Energy Drinks"}
                         onClick={this.changeProps.bind(this, "carbonation")}
                         style={{"float": "left", marginLeft: "1.3vw"}}>
                        <img src="soft-drink.svg" alt="Avatar" style={{"width": "2.5vw"}}></img>
                        <div className="text_container">
                            SE Drink ($0.08)
                        </div>
                    </div>
                    <div className="card_element" ref="water_div" title={"Water"}
                         onClick={this.changeProps.bind(this, "water")}
                         style={{float: "left", marginLeft: "1.7vw"}}>
                        <img src="water.svg" alt="Avatar" style={{"width": "2.5vw"}}></img>
                        <div className="text_container">
                            Water ($0.15)
                        </div>
                    </div>

                </div>
                <div style={{width: '100%', marginBottom: '0.5vw'}}>
                    Choose Addons
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', marginLeft: '2vw', minHeight: '8vh'}}>
                    {this.createCheckboxes()}
                </div>


                <div className="Horiz" style={{width: '100%', display: 'inline-flex'}}>
                    <HorizontalBarChart key="consumer_segments" data={this.state.segmentData || [{
                        name: 'Jumbo Families',
                        y: 9.35,
                    }, {
                        name: 'Active Elders',
                        y: 9.27
                    }, {
                        name: 'Fortunes & Families',
                        y: 7.93
                    }, {
                        name: 'Others',
                        y: 73.45
                    }]} colors={chartColors}
                                        title={`Top Consumer Segments for ${helperFunctions.convertToTitleCase(this.state.category_selected)}`}
                                        tooltip={true} yTitle={"Percentage"} label={"{y}%"}/>

                    <HorizontalBarChart key="drinking_moments" data={this.state.drinkingMomentData || [{
                        name: 'Time Out At Work/School',
                        y: 61.41,
                    }, {
                        name: 'Comforting Meals at Home',
                        y: 25.84
                    }, {
                        name: 'Relaxing Screen Time',
                        y: 11.67
                    }, {
                        name: 'Others',
                        y: 4.67
                    }]} colors={chartColors}
                                        title={`Top Drinking Moments for ${helperFunctions.convertToTitleCase(this.state.category_selected)}`}
                                        tooltip={true} yTitle={"Percentage"} label={"{y}%"}/>

                </div>


                <div className="ratingDiv">

                    <div className="StarRatingsWrapper">
                        <table className="tableClass" bgcolor="#444444">
                            <tbody>

                            <tr className="StarRatings">
                                <td>Health</td>
                                <td><StarRatings rating={
                                    convertRange(parseFloat(product_configs[this.state.category_selected]['health']) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                                        return this.state.checkboxes[d]
                                    }).reduce(function (acc, val) {
                                        return acc + parseFloat(product_configs[val]['health']);
                                    }, 0)), [1, 14], [0, 5])
                                } starRatedColor="#344955" starEmptyColor="darkgrey" starDimension="0.6vw"
                                                 starSpacing="0.1vw"/></td>
                            </tr>
                            <tr className="StarRatings">
                                <td>Taste</td>
                                <td><StarRatings
                                    rating={convertRange(parseFloat(product_configs[this.state.category_selected]['taste']) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                                        return this.state.checkboxes[d]
                                    }).reduce(function (acc, val) {
                                        return acc + parseFloat(product_configs[val]['taste']);
                                    }, 0)), [1, 12], [0, 5])} starRatedColor="#344955" starEmptyColor="darkgrey"
                                    starDimension="0.6vw"
                                    starSpacing="0.1vw"/></td>
                            </tr>
                            <tr className="StarRatings">
                                <td>Pleasure</td>
                                <td><StarRatings
                                    rating={convertRange(parseFloat(product_configs[this.state.category_selected]['pleasure']) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                                        return this.state.checkboxes[d]
                                    }).reduce(function (acc, val) {
                                        return acc + parseFloat(product_configs[val]['pleasure']);
                                    }, 0)), [2, 11], [0, 5])} starRatedColor="#344955" starEmptyColor="darkgrey"
                                    starDimension="0.6vw"
                                    starSpacing="0.1vw"/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{
                        width: '10vw',
                        marginLeft: '4vw',
                        fontSize: "0.8vw",
                        fontFamily: '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif'
                    }}>
                        Market Share for {this.state.category_selected}:
                        <div style={{
                            fontWeight: '600',
                            fontSize: "1.2vw",
                            fontFamily: '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif'
                        }}>
                            {this.state.categoryPercentage}
                        </div>
                    </div>


                </div>
                <div style={{display: "inline-flex"}}>
                    <div style={{paddingTop: "1.5vh"}}>
                        Product manufacturing Cost
                    </div>
                    <div className="PriceWrapper">
                        <img className="PriceImage" alt="price" src="GameProd_FactoryPrice.svg" width="60vw"></img>

                        <span
                            className="PriceValue">${(parseFloat(product_configs[this.state.category_selected]['price']) + parseFloat(Object.keys(this.state.checkboxes).filter(d => {
                            return this.state.checkboxes[d]
                        }).reduce(function (acc, val) {
                            return acc + parseFloat(product_configs[val]['price']);
                        }, 0))).toFixed(2)}</span>
                    </div>
                    <div className="submitButton" ref="submit" onClick={this.postProduct.bind(this)}> Submit</div>
                </div>


            </div>


        );}

        else{
            return (
                <div className='graphLoader'>
                  <CircularProgress size={80} />
                </div>
              );
        }
    }
}

export default ProductWidgetRevamp;
