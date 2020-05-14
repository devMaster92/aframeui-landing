import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
// import { render } from "react-dom";
import {
    AdminGoldenLayoutComponent
} from "../admin.goldenLayoutComponent";
import {
    MarkGoldenLayoutComponent
} from "../marketing.goldenLayoutComponent";
// import { MyGoldenPanel } from "./myGoldenPanel";
import {
    AppContext
} from "../appContext";
// import StackedBarChart from './StackedBarChart.js';
import CountryView from './CountryView.js'
import simSettings from '../components/simSettings.js'
import '../css/App.css'
// import GlobalEvents from '../utils/global-events';
// import Icons from '../../src/Icons';
import $ from 'jquery';
import ProductWidget from "../components/ProductWidgetRevamp";
import PromotionWidget from "../components/PromotionWidget";
// import LineChart from "./LineChart";
import Pricing from "../components/PricingWidget.js";
import DataScienceTabs from '../components/DataScienceTabs'
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/StopRounded';
// import AssignmentIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import SpiderChart from "../components/SpiderChart";
import GlobalEvents from '../utils/global-events';
// import HorizonChart from '../components/HorizonChart.js'
import AssignmentIcon from '@material-ui/icons/AssignmentTurnedInRounded'
import PricingDetails from "../components/PricingDetails";
// import SpiderChart from "../components/SpiderChart";
// import CompetitorWidget from '../components/CompetitorWidget'
// import HorizonChart from '../components/Horizongit Chart.js'


// const config = require('../utils/config')

// var settingsdone = false

function getContentwithID(temp, id) {
    let x = temp.filter(content => {
        return content.config.id === id
    })

    return x[0];
}

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: "absolute",
        top: "10px",
        left: "40%",
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
});

class GoldenView extends React.Component {
    constructor(props) {
        super(props);
        // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.state = {

           

            simDetails: {
                currentTick: 0,
                totalTick: 0,
                tickPercent: 0,
                isListening: false
            },
            mainTabs: {
                admin: {
                    isOpen: true,
                    isInitialised: true,
                    childrenOpened:false,
                    selectionEnabled:true,
                },
                marketing: {
                    isOpen: true,
                    isInitialised:true,
                    childrenOpened: false,
                    selectionEnabled: true,
                }
            },
            adminConfig: {
                settings: {
                    isClosable: false,
                    showPopoutIcon: false,
                    showMaximiseIcon: false,
                    showCloseIcon: false
                },
                content: [
                    {
                        type: "row",
                        isClosable: false,
                        id: "parentRow",
                        width: 70,
                        content: [
                            {
                                isClosable: false,
                                title: "Map",
                                type: "react-component",
                                component: "mapComponent",
                                id: "mapComponent",
                                width: 70,
                                className: "mapComponent",
                                props: {
                                    emit_data: this.props.emit_data,
                                    countryname: this.props.countryname,
                                    subscribe_ns: this.props.subscribe_ns,
                                    showNotification: this.props.showNotification,
                                    ns_value: "simulation_data",
                                    ns_value2:"msa_data",
                                    width: this.props.width,
                                    height: this.props.height,
                                    latitude: this.props.latitude,
                                    longitude: this.props.longitude,
                                    zoom: this.props.zoom,
                                    pitch: this.props.pitch,
                                    minPitch: this.props.minPitch,
                                    maxPitch: this.props.maxPitch,
                                    center: this.props.center,
                                    geourl: this.props.geourl,
                                    mapStyle: this.props.mapStyle,
                                    simStarted: this.props.simStarted,
                                }
                            },
                            {
                                type: "column",
                                isClosable: false,
                                id: "adminParentColumn",
                                width: 30,
                                content: [
                                    {
                                        type: "stack",
                                        id: "widgetsParent",
                                        content: [
                                            {
                                                id: 'simSettings',
                                                isClosable: false,
                                                title: 'Simulation Settings',
                                                type: 'react-component',
                                                component: 'simSettings',
                                                componentName: "simSettings",
                                                props: {
                                                    showNotification: this.props.showNotification,
                                                }
                                            }

                                        ]
                                    }
                                    ,

                                ]
                            }
                        ]
                    }
                ]
            },
            marketingConfig: {
                settings: {
                    isClosable: false,
                    showPopoutIcon: false,
                    showMaximiseIcon: false,
                    showCloseIcon: false,
                    reorderEnabled: false,
                },
                content: [
                    {
                        type: "row",
                        isClosable: false,
                        id: "parentRow",
                        width: 70,
                        content: [
                            {
                                isClosable: false,
                                title: "Map",
                                type: "react-component",
                                component: "mapComponent",
                                componentName: "mapComponent",
                                id: "mapComponent",
                                width: 70,
                                className: "mapComponent",
                                componentState: {
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

                                        // width: config['usa']['width'],
                                        // height: config['usa']['height'],
                                        // latitude: config['usa']['latitude'],
                                        // longitude: config['usa']['longitude'],
                                        // zoom: config['usa']['zoom'],
                                        // pitch: config['usa']['pitch'],
                                        // minPitch: config['usa']['minPitch'],
                                        // maxPitch: config['usa']['maxPitch'],
                                        // center: config['usa']['center'],


                                        // maxBounds: this.props.maxBounds
                                    },
                                    selected_state: 'Eat',
                                    geourl: this.props.geourl,
                                    data: [
                                        {

                                            "State": "Connecticut",
                                            "Eat": 0
                                        },
                                        {

                                            "State": "Florida",
                                            "Eat": 0
                                        },
                                        {

                                            "State": "Illinois",
                                            "Eat": 0
                                        },
                                        {

                                            "State": "Kentucky",
                                            "Eat": 0
                                        },
                                        {

                                            "State": "Michigan",
                                            "Eat": 0
                                        },
                                        {

                                            "State": "Minnesota",
                                            "Eat": 0
                                        },
                                        {

                                            "State": "New Jersey",
                                            "Eat": 0
                                        },
                                        {

                                            "State": "Pennsylvania",
                                            "Eat": 0
                                        },
                                        {

                                            "State": "Washington",
                                            "Eat": 0
                                        },
                                        {

                                            "State": "Wisconsin",
                                            "Eat": 0
                                        }
                                    ],
                                    max_count: 10
                                },
                                props: {
                                    emit_data: this.props.emit_data,
                                    showNotification: this.props.showNotification,
                                    countryname: this.props.countryname,
                                    subscribe_ns: this.props.subscribe_ns,
                                    width: this.props.width,
                                    height: this.props.height,
                                    latitude: this.props.latitude,
                                    longitude: this.props.longitude,
                                    zoom: this.props.zoom,
                                    pitch: this.props.pitch,
                                    minPitch: this.props.minPitch,
                                    maxPitch: this.props.maxPitch,
                                    center: this.props.center,
                                    geourl: this.props.geourl,
                                    mapStyle: this.props.mapStyle,
                                    ns_value: 'simulation_data',
                                    ns_value2:"msa_data",
                                    simStarted: this.props.simStarted

                                }
                            },
                            {
                                type: "column",
                                isClosable: false,
                                id: "marketingParentColumn",
                                width: 30,
                                content: [
                                    {
                                        type: "stack",
                                        id: "widgetsParent",
                                        content: [
                                            {
                                                id: 'productWidget',
                                                isClosable: false,
                                                title: 'Product Widget',
                                                type: 'react-component',
                                                component: 'product',
                                                componentName: "product",
                                                componentState: {
                                                    text: 'Component 1'
                                                },
                                                props: {
                                                    showNotification: this.props.showNotification,
                                                }
                                            }

                                        ]
                                    }
                                ]
                            }
                        ]
                    }]
            }
        }
    }

    getGoldenLayoutInstance() {
        if ((this.props.tab === "admin" && this.refs.adminLayout !== undefined) ||
            this.refs.marketingLayout !== undefined)
            return (this.props.tab === "admin" ? this.refs.adminLayout.adminGoldenLayoutInstance : this.refs.marketingLayout.marketingGoldenLayoutInstance);
    }

    completeLayoutLevelHandlers = (myLayout) => {
        const self = this;
        if (!self.state.mainTabs[this.props.tab].isInitialised) {
            myLayout.on('stateChanged', (e) => {
                GlobalEvents.trigger('changegraph', 'change')
            })

            myLayout.on('initialised', (e) => {
                GlobalEvents.trigger('changegraph', 'change')
            })
            const mainTabs = self.state.mainTabs;
            mainTabs[this.props.tab]["isInitialised"] = true;
            self.setState({mainTabs});
        }
    }

    renderFirstLevelParents = () => {
        const self = this;
        var myLayout = self.getGoldenLayoutInstance();
        if (myLayout !== undefined) {
            const goldenRoot = myLayout.root;
            Object.keys(self.state.dynamicTabs).forEach(tab => {
                if (self.state.dynamicTabs[tab].parentId === "parentRow" &&
                    self.state.dynamicTabs[tab].tab === self.props.tab &&
                    goldenRoot.getItemsById(self.state.dynamicTabs[tab].id).length === 0) {
                    self.addGoldenTab(goldenRoot, self.state.dynamicTabs[tab]);
                }
            });
        }
    }

    addGoldenTab = (goldenRoot, componentToAdd) => {
        const self = this;
        componentToAdd.dependentTabs.forEach(tab => {
            if (goldenRoot.getItemsById(self.state.dynamicTabs[tab].id).length === 0) {
                self.addGoldenTab(goldenRoot, self.state.dynamicTabs[tab]);
            }
        });
        goldenRoot.getItemsById(componentToAdd.parentId)[0].addChild(Object.assign({}, componentToAdd.config));
        const mainTabs = self.state.mainTabs;
        mainTabs[self.props.tab]["childrenOpened"] = true;
        self.setState({mainTabs});
        // dynTabs[componentToAdd.id].isOpen = true;
        // this.setState({
        //     dynamicTabs: dynTabs
        // });
    }

    tickProgressing = (tickOb) => {
        const self = this;
        sessionStorage.setItem('currentTick', tickOb.tickNum + 1)
        sessionStorage.setItem('TotalAgentsS', tickOb.totalAgents)

        self.setState({
            simDetails: Object.assign(self.state.simDetails, {
                currentTick: tickOb.tickNum + 1,
                totalTick: tickOb.totalTicks,
                totalAgents: tickOb.totalAgents,
                tickPercent: ((tickOb.tickNum + 1) / tickOb.totalTicks) * 100,
            })
        });
    }

    // forceUpdateHandler() {
    //     console.log('in updated force')
    //     // this.forceUpdate()
    //     // this.render()
    //     // this.setState(this.state)
    // }


    componentDidMount() {

        

        const self = this;
        const inst = self.getGoldenLayoutInstance();
        if (inst !== undefined) {
            self.completeLayoutLevelHandlers(inst);


            GlobalEvents.on('changeWidget', this.updateWidget.bind(this));
            GlobalEvents.on('environmentWidget', this.updateWidgetEnv.bind(this));
            // var myLayoutx = this.getGoldenLayoutInstance();
            // $(window).resize(function () {
            //     myLayoutx.updateSize("96.8vw", "80vh");
            // });
            GlobalEvents.on("openGoldenTab", (data) => {

                var myLayout = this.getGoldenLayoutInstance();
                myLayout.init();
                const goldenRoot = myLayout.root;
                const componentToAdd = this.state.dynamicTabs[data];
                if (goldenRoot.getItemsById(componentToAdd.id).length === 0) {
                    self.addGoldenTab(goldenRoot, componentToAdd);
                } else {
                    self.props.showNotification(componentToAdd.title + " tab is already open");
                }

                Object.keys(componentToAdd.parentConfigPropertyChange).forEach(prop => {
                    goldenRoot.getItemsById(componentToAdd.id)[0].parent.config[prop] = componentToAdd.parentConfigPropertyChange[prop];
                });
                myLayout.updateSize();

            });

            // GlobalEvents.on('startsim', (data) => {
               
    
            //     this.props.subscribe_ns('simMetadata', (data) => {
                    // console.log("App.js");
                    // console.log('simMetadata', data);
    
                    // if (data.simCompleted) {
                    //     this.showNotification("Simulation Completed", {variant: "success"})
                    //     sessionStorage.setItem("simCompleted", "true");
    
                       
    
    
                        
                    // } 
    
                // })
    
    
                
    
            // })

            // // myLayout.init()

            //   var addMenuItem = function( title, text ) {
            //     var element = $( '<li>' + title + '</li>' );
            //     $( '#menuContainer' ).append( element );


            //   document.getElementById('add').addEventListener('click', (e) => {
            //     // console.log(myLayout.root.contentItems)
            //     var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            //     console.log(w)
            //     var cc = 0.1*1850
            // myLayout.root.getItemsById("abc")[0].parent.config.width = 10
            // myLayout.updateSize()

            //   })
        }

    }

    updateWidgetEnv(widget) {
        console.log("nav clicked", this.refs.adminLayout);

        let temp = getContentwithID(this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems(), "widgetsParent");

        // let temp = getContentwithID(this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems(), "productWidget");


        if (widget === 'settings') {

            this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems()[this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems().indexOf(temp) - 1].replaceChild(this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems()[this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems().indexOf(temp)],
                this.refs.adminLayout.adminGoldenLayoutInstance._$normalizeContentItem({
                    type: "stack",
                    id: "widgetsParent",
                    content: [
                        {
                            id: 'simSettings',
                            isClosable: false,
                            title: 'Simulation Settings',
                            type: 'react-component',
                            component: 'simSettings',
                            props: {
                                showNotification: this.props.showNotification,
                            }
                        }

                    ]
                }))

        }
        
        else if (widget === 'simsum2') {

            this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems()[this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems().indexOf(temp) - 1].replaceChild(this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems()[this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems().indexOf(temp)],
            this.refs.adminLayout.adminGoldenLayoutInstance._$normalizeContentItem({
                    type: "stack",
                    id: "widgetsParent",
                    content: [
                        {
                            id: 'pricingDetails',
                            title: 'Simulation Summary',
                            type: 'react-component',
                            component: 'pricingdetails',
                            componentName: "pricingdetails",
                            isClosable: false,
                            componentState: {
                                text: 'Component 10'
                            },
                            props: {
                               
                            }

                        }

                    ]
                }))


        }
        
        else {
            this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems()[this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems().indexOf(temp) - 1].replaceChild(this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems()[this.refs.adminLayout.adminGoldenLayoutInstance._getAllContentItems().indexOf(temp)],
                this.refs.adminLayout.adminGoldenLayoutInstance._$normalizeContentItem({
                    type: "column",
                    id: "widgetsParent",
                    content: [
                        {
                            id: 'physioDS',
                            isClosable: false,
                            title: 'Agent Behaviour',
                            type: 'react-component',
                            component: 'dataScienceTabs',
                            componentName: "physioDS",
                            componentState: {
                                data: this.props.time_series
                            },
                            props: {
                                tabs: [
                                    // {
                                    //     tabTitle: "Agent State Time Series",
                                    //     tabId: "ASTS",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "energy_delta",
                                    //     chartComponent: "HorizonChart"
                                    // },
                                    // {
                                    //     tabTitle: "Agent State Time Series",
                                    //     tabId: "ASTS",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "energy_delta",
                                    //     chartComponent: "Chart"
                                    // },
                                    {
                                        tabTitle: "Activity Count By Hour",
                                        tabId: "ACBH",
                                        plotOnMapNeeded: {
                                            valuesForDropdown: [
                                                {
                                                    label: "Eat",
                                                    id: "eat"
                                                },
                                                {
                                                    label: "Drink",
                                                    id: "drink"
                                                },
                                                {
                                                    label: "Sleep",
                                                    id: "sleep"
                                                }
                                            ]
                                        },
                                        nameSpace: "activity_count_wind_rose",
                                        chartComponent: "Windrose"
                                    },
                                    {
                                        tabTitle: "Activity Distribution",
                                        tabId: "AD",
                                        plotOnMapNeeded: false,
                                        nameSpace: "drinking_moment_by_beverage_category",
                                        chartComponent: "ActivityCount"
                                    }
                                ],
                                showNotification: this.props.showNotification,
                                subscribe_ns: this.props.subscribe_ns,
                                unsubscribe_ns: this.props.unsubscribe_ns,
                            }
                        },
                        {
                            id: 'drinkingMomentsDS',
                            isClosable: false,
                            title: 'Consumption Pattern',
                            type: 'react-component',
                            component: 'dataScienceTabs',
                            componentName: "drinkingMomentsDS",
                            componentState: {
                                data: this.props.time_series
                            },
                            props: {
                                tabs: [
                                    {
                                        tabTitle: "Drinking Moment Count by Hour",
                                        tabId: "A_DMCBH",
                                        plotOnMapNeeded: false,
                                        nameSpace: "drinking_moment_count_by_hour_high",
                                        chartComponent: "StreamGraph"
                                    },
                                    {
                                        tabTitle: "Beverage Category by Hour",
                                        tabId: "A_BCBH",
                                        plotOnMapNeeded: false,
                                        nameSpace: "beverage_category_count_by_hour_high",
                                        chartComponent: "StreamGraph"
                                    },
                                    // {
                                    //     tabTitle: "Beverage Category Consumed by Drinking
                                    // Moment", tabId: "A_BCCBDM", plotOnMapNeeded: false,
                                    // nameSpace: "beverage_category_by_drinking_moment",
                                    // chartComponent: "StackedBarChart" },
                                    {
                                        tabTitle: "Drinking Moment Count vs Beverage Category",
                                        tabId: "A_DMCBBC",
                                        plotOnMapNeeded: false,
                                        nameSpace: "beverage_category_vs_drinking_moment",
                                        chartComponent: "SankeyChart"
                                    },
                                    // {
                                    //     tabTitle: "Drinking Moment Count by Beverage Category",
                                    //     tabId: "A_DMCBBC",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "drinking_moment_by_beverage_category",
                                    //     chartComponent: "StackedBarChart"
                                    // }
                                ],
                                showNotification: this.props.showNotification,
                                subscribe_ns: this.props.subscribe_ns,
                                unsubscribe_ns: this.props.unsubscribe_ns
                            }
                        }

                    ]
                }))
        }


    }

    updateWidget(widget) {
        console.log("nav clicked", this.refs.marketingLayout, widget);

        let temp = getContentwithID(this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems(), "widgetsParent");


        if (widget === 'pricing') {

            this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp) - 1].replaceChild(this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp)],
                this.refs.marketingLayout.marketingGoldenLayoutInstance._$normalizeContentItem({
                    type: "stack",
                    id: "widgetsParent",
                    content: [

                        {
                            id: 'pricingWidget',
                            title: 'Pricing Widget',
                            type: 'react-component',
                            component: 'pricing',
                            componentName: "pricing",
                            isClosable: false,
                            componentState: {
                                text: 'Component 1'
                            },
                            props: {
                                showNotification: this.props.showNotification,
                            }

                        }

                    ]
                }))

        } else if (widget === 'product') {

            this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp) - 1].replaceChild(this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp)],
                this.refs.marketingLayout.marketingGoldenLayoutInstance._$normalizeContentItem({
                    type: "stack",
                    id: "widgetsParent",
                    content: [
                        {
                            id: 'productWidget',
                            title: 'Product Widget',
                            type: 'react-component',
                            component: 'product',
                            componentName: "product",
                            isClosable: false,
                            componentState: {
                                text: 'Component 1'
                            },
                            props: {
                                showNotification: this.props.showNotification,
                            }

                        }

                    ]
                }))


        } else if (widget === 'promotion') {

            this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp) - 1].replaceChild(this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp)],
                this.refs.marketingLayout.marketingGoldenLayoutInstance._$normalizeContentItem({
                    type: "stack",
                    id: "widgetsParent",
                    content: [
                        {
                            id: 'promotionWidget',
                            title: 'Promotion Widget',
                            type: 'react-component',
                            component: 'promotion',
                            componentName: "promotion",
                            isClosable: false,
                            componentState: {
                                text: 'Component 1'
                            },
                            props: {
                                showNotification: this.props.showNotification,
                               
                            }

                        }

                    ]
                }))


        }

        else if (widget === 'simsum') {

            this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp) - 1].replaceChild(this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp)],
                this.refs.marketingLayout.marketingGoldenLayoutInstance._$normalizeContentItem({
                    type: "stack",
                    id: "widgetsParent",
                    content: [
                        {
                            id: 'pricingDetails',
                            title: 'Simulation Summary',
                            type: 'react-component',
                            component: 'pricingdetails',
                            componentName: "pricingdetails",
                            isClosable: false,
                            componentState: {
                                text: 'Component 10'
                            },
                            props: {
                               
                            }

                        }

                    ]
                }))


        }

         else {
            this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp) - 1].replaceChild(this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems()[this.refs.marketingLayout.marketingGoldenLayoutInstance._getAllContentItems().indexOf(temp)],
                this.refs.marketingLayout.marketingGoldenLayoutInstance._$normalizeContentItem({
                    type: "column",
                    id: "widgetsParent",
                    content: [
                        {
                            id: 'drinkingMomentsDSForMark',
                            isClosable: false,
                            title: 'Consumption Pattern',
                            type: 'react-component',
                            component: 'dataScienceTabs',
                            componentName: "drinkingMomentsDSForMark",
                            componentState: {
                                data: this.props.time_series
                            },
                            props: {
                                tabs: [
                                    {
                                        tabTitle: "Drinking Moment Count by Hour",
                                        tabId: "M_DMCBH",
                                        plotOnMapNeeded: false,
                                        nameSpace: "drinking_moment_count_by_hour_high",
                                        chartComponent: "StreamGraph"
                                    },
                                    {
                                        tabTitle: "Beverage Category by Hour",
                                        tabId: "M_BCBH",
                                        plotOnMapNeeded: false,
                                        nameSpace: "beverage_category_count_by_hour_high",
                                        chartComponent: "StreamGraph"
                                    },
                                    {
                                        tabTitle: "Drinking Moment Count vs Beverage Category",
                                        tabId: "M_DMCBBC",
                                        plotOnMapNeeded: false,
                                        nameSpace: "beverage_category_vs_drinking_moment",
                                        chartComponent: "SankeyChart"
                                    },
                                    // {
                                    //     tabTitle: "Brand Performance by Unit Sales",
                                    //     tabId: "BCO",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "brand_choice_by_day_high",
                                    //     chartComponent: "StreamGraph"
                                    // },
                                    // // {
                                    //     tabTitle: "Drinking Moment Count by Hour",
                                    //     tabId: "M_DMCBH",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "drinking_moment_count_by_hour",
                                    //     chartComponent: "StackedBarChart"
                                    // },
                                    // {
                                    //     tabTitle: "Beverage Category by Hour",
                                    //     tabId: "M_BCBH",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "beverage_category_count_by_hour",
                                    //     chartComponent: "StackedBarChart"
                                    // },
                                    // {
                                    //     tabTitle: "Beverage Category Consumed by Drinking
                                    // Moment", tabId: "M_BCCBDM", plotOnMapNeeded: false,
                                    // nameSpace: "beverage_category_by_drinking_moment",
                                    // chartComponent: "StackedBarChart" }, { tabTitle: "Drinking
                                    // Moment Count by Beverage Category", tabId: "M_DMCBBC",
                                    // plotOnMapNeeded: false, nameSpace:
                                    // "drinking_moment_by_beverage_category", chartComponent:
                                    // "StackedBarChart" }
                                ],
                                showNotification: this.props.showNotification,
                                subscribe_ns: this.props.subscribe_ns,
                                unsubscribe_ns: this.props.unsubscribe_ns,
                            }
                        },
                        {
                            id: 'choiceOfBeverageBrand',
                            isClosable: false,
                            title: 'Sales & Promotion',
                            type: 'react-component',
                            component: 'dataScienceTabs',
                            componentName: "choiceOfBeverageBrand",
                            componentState: {
                                data: this.props.time_series
                            },
                            props: {
                                tabs: [
                                    {
                                        tabTitle: "Consumption by Segment",
                                        tabId: "BCBS",
                                        plotOnMapNeeded: false,
                                        nameSpace: "brand_choice_vs_segment",
                                        chartComponent: "SankeyChart"
                                    },
                                    {
                                        tabTitle: "Consumption by Drinking Moment",
                                        tabId: "BCDM",
                                        plotOnMapNeeded: false,
                                        nameSpace: "brand_choice_vs_drinking_moment",
                                        chartComponent: "SankeyChart"
                                    },
                                    {
                                        tabTitle: "Units Sold",
                                        tabId: "BCO",
                                        plotOnMapNeeded: false,
                                        // nameSpace: "brand_choice_by_day",
                                        // chartComponent: "Chart"
                                        nameSpace: "brand_choice_by_day_high",
                                        chartComponent: "Revenue",
                                    },
                                    {
                                        tabTitle: "Revenue",
                                        tabId: "BR",
                                        plotOnMapNeeded: false,
                                        nameSpace: "brand_revenue_by_day_high",
                                        chartComponent: "Revenue"
                                    },
                                    {
                                        tabTitle: "Promotion Effectiveness",
                                        tabId: "BRP",
                                        plotOnMapNeeded: false,
                                        nameSpace: "channel_ad_reach",
                                        chartComponent: "FixedColumnChart"
                                    },
                                    // {
                                    //     tabTitle: "Promotion Spends Distribution",
                                    //     tabId: "BRP2",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "brand_revenue_by_day_high",
                                    //     chartComponent: "PackedBubbleChart"
                                    // }
                                    // {
                                    //     tabTitle: "Brand Sales",
                                    //     tabId: "BRD",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "brand_choice_vs_segment",
                                    //     chartComponent: "Synchronised"
                                    // }

                                    // {
                                    //     tabTitle: "Brand Choice by Segment",
                                    //     tabId: "BCBS",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "brand_choice_by_segment",
                                    //     chartComponent: "StackedBarChart"
                                    // },


                                    // {
                                    //     tabTitle: "Brand Choice by Segment",
                                    //     tabId: "BCBS",
                                    //     plotOnMapNeeded: false,
                                    //     nameSpace: "brand_choice_by_segment",
                                    //     chartComponent: "StackedBarChart"
                                    // }

                                ],
                                showNotification: this.props.showNotification,
                                subscribe_ns: this.props.subscribe_ns,
                                unsubscribe_ns: this.props.unsubscribe_ns,
                            }
                        }]
                }))
        }


    }

    componentDidUpdate() {

        // if(this.props.tab === 'admin') {
        //     if(this.refs.adminLayout)
        //     {
        //         this.refs.adminLayout.style.width="100vw";
        //         this.refs.adminLayout.style.height="96.5vh";
        //
        //     }
        // }
        // else {
        //
        //     if(this.refs.marketingLayout)
        //     {
        //         this.refs.marketingLayout.style.width="100vw";
        //         this.refs.marketingLayout.style.height="96.5vh";
        //
        //     }
        //
        // }


        const self = this;

        var myLayout = self.getGoldenLayoutInstance();
        if (myLayout !== undefined) {
            window.dispatchEvent(new Event('resize'));
            self.completeLayoutLevelHandlers(myLayout);

            if (self.state.mainTabs[self.props.tab].childrenOpened) {
                self.renderFirstLevelParents();
            }

            if (self.props.simStarted && !self.state.simDetails.isListening) {
                self.props.subscribe_ns("simulation_status", self.tickProgressing);
                self.setState({simDetails: Object.assign(self.state.simDetails, {isListening: true})});
            }

            console.log("sim details---", self.state.simDetails);

            $(window).resize(function () {
                myLayout.updateSize("96.8vw", "80vh");
            });
        }

        // GlobalEvents.on('graphsopen',(e) => {
        //     this.setState({
        //         id: 'productWidget',
        //         title: 'Product',
        //         // type='react-component',
        //         component: 'product',
        //         componentName: "product",
        //     })
        // })
        // GlobalEvents.on('graphsopen',(e) => {
        //     self.state.marketingConfig.content[0].content[1].content[0].content[0].id = 'pricing';
        //     self.state.marketingConfig.content[0].content[1].content[0].content[0].component = 'pricing';
        //     self.state.marketingConfig.content[0].content[1].content[0].content[0].componentName = 'pricing';
        //     self.state.marketingConfig.content[0].content[1].content[0].content[0].title = 'Pricing';
        //     self.state.marketingConfig.content[0].content[1].content[0].content[0].type = 'react-component';
        //     this.forceUpdateHandler();
        // })
        // GlobalEvents.trigger('graphsopen');


    }

    triggersimu = () => {
        GlobalEvents.trigger('startsim');
        this.props.tab === "admin" ? GlobalEvents.trigger('environmentWidget', 'graphs') : GlobalEvents.trigger('changeWidget', 'graphs2');


    }

    render() {
        const self = this;
        console.log('simstatus in golden', self.props.simStarted)
        const {classes} = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: !self.props.simStarted,
        });
        // console.log("state marketing inside render",{...this.state.marketingConfig});
        return (
            <div className="GoldenView" id="GoldenView">

                <div className="loaderWrapper">

                    <div className={classes.wrapper}>
                        <Fab title={!self.props.simStarted ? "Start Simulation" : ""} color="primary" size={'3vw'}
                             className={buttonClassname} id="startsimul" onClick={this.triggersimu}
                             style={{zIndex: 11, width: '3vw', height: '3vw', minHeight: '3vw'}}>
                            {!self.props.simStarted ? <CheckIcon
                                fontSize={"2vw !important"}/> : sessionStorage.getItem('simCompleted') === 'true' ?
                                <AssignmentIcon fontSize={"2vw"}/> : <SaveIcon fontSize={"2vw"}/>}
                        </Fab>
                        {sessionStorage.getItem('simStarted') && <div>
                            <div className="statusBar">
                                Total number of agents: {this.state.simDetails.totalAgents}
                            </div>
                            <div className="statusBar_2">
                                <div className="statusbar_2_txt" style={{
                                    display: "inline-block", position: "absolute",
                                    right: "1.65vw"
                                }}>
                                    Day {Math.ceil(this.state.simDetails.currentTick / 24)} of {Math.ceil(this.state.simDetails.totalTick / 24)}<br/>
                                    {Math.floor(((this.state.simDetails.currentTick) % 24) / 10) ? ((this.state.simDetails.currentTick - 1) % 24) : "0" + ((this.state.simDetails.currentTick) % 24)}:00
                                    Hours
                                </div>
                                <div style={{
                                    display: "inline-block",
                                    right: "3%",
                                    position: "absolute",
                                    bottom: "11%"
                                }}>
                                    {(6 <= ((this.state.simDetails.currentTick - 1) % 24)) && (((this.state.simDetails.currentTick - 1) % 24) <= 18) ?
                                        <img alt={"day"} className={"dayNight"} src={"day_timer_icon.svg"}/> :
                                        <img alt={"night"} className={"dayNight"} src={"moon_timer_icon.svg"}/>}
                                </div>
                            </div>

                        </div>}
                        {
                            self.props.simStarted
                            &&
                            <CircularProgress
                                variant={(self.props.simStarted && self.state.simDetails.tickPercent === 0 ? "indeterminate" : "static")}
                                value={self.state.simDetails.tickPercent}
                                size={'3.5vw'}
                                style={{zIndex: 10, top: '-0.5vh', left: '-0.2vw'}}
                                className={classes.fabProgress}/>
                        }

                        {/*<div style={{position: 'absolute'}} className="tooltip">*/}
                        {/*<img alt="info_icon" id="info_icon" src="info_new.svg" style={{width: '1.4vw'}}></img>*/}
                        {/*<div class="bottom">*/}
                        {/*<img alt="maslow" src="maslows_new2.png" width={780}*/}
                        {/*style={{background: 'transparent'}}></img>*/}
                        {/*/!* <i></i> *!/*/}
                        {/*</div>*/}
                        {/*</div>*/}
                    </div>

                    {/* <img className="startSimulation" src="play_simulation.svg" id='startsimu' alt="start" title="Start Simulation" onClick={this.triggersimu.bind(this)}></img>
                {this.props.simStarted && <CircularProgress
                    className={classes.progress + " simulationProgress"}
                    variant={(this.props.simStarted && this.state.simDetails.tickPercent === 0 ? "indeterminate" : "static")}
                    size={"3.25vw"}
                    value={this.state.simDetails.tickPercent}
                />} */}
                </div>

                {/* <div className={classes.wrapper}>
                    <img className="startSimulation" src="play_simulation.svg" id='startsimu' alt="start" title="Start Simulation" onClick={this.triggersimu.bind(this)} width="3.25vw"></img>

                    {this.props.simStarted && <CircularProgress
                        className={classes.progress + " simulationProgress"}
                        variant={(this.props.simStarted && this.state.simDetails.tickPercent === 0 ? "indeterminate" : "static")}
                        size={"3.25vw"}
                        value={this.state.simDetails.tickPercent}
                    />}

                </div> */}

                <AppContext.Provider value={
                    this.state.contextValue
                }>
                    {this.props.tab === "admin" ?


                        <AdminGoldenLayoutComponent ref="adminLayout"
                                                    htmlAttrs={
                                                        {
                                                            style: {
                                                                height: "80vh",
                                                                width: "96.8vw",
                                                                display: (this.props.tab === "admin" ? 'block' : 'none'),

                                                            }
                                                        }
                                                    }
                                                    config={
                                                        this.state.adminConfig
                                                    }
                                                    registerComponents={
                                                        myLayout => {
                                                            myLayout.registerComponent("mapComponent", CountryView);
                                                            myLayout.registerComponent("simSettings", simSettings);
                                                            myLayout.registerComponent("dataScienceTabs", DataScienceTabs);
                                                            myLayout.registerComponent("pricingdetails",PricingDetails)
                                                        }
                                                    }
                        />
                        :

                        <MarkGoldenLayoutComponent ref="marketingLayout"
                                                   htmlAttrs={
                                                       {
                                                           style: {
                                                               height: "80vh",
                                                               width: "96.8vw",
                                                               display: (this.props.tab === "admin" ? 'none' : 'block'),

                                                           }
                                                       }

                                                   }
                                                   config={
                                                       this.state.marketingConfig
                                                   }

                                                   registerComponents={
                                                       myLayout => {
                                                           // console.log("register");
                                                           myLayout.registerComponent("mapComponent", CountryView);
                                                           myLayout.registerComponent("product", ProductWidget);
                                                           myLayout.registerComponent("pricing", Pricing);
                                                           myLayout.registerComponent("promotion", PromotionWidget);
                                                           myLayout.registerComponent("competitor", SpiderChart);
                                                           myLayout.registerComponent("dataScienceTabs", DataScienceTabs);
                                                           myLayout.registerComponent("pricingdetails",PricingDetails)
                                                       }
                                                   }
                        />


                    }
                </AppContext.Provider>
            </div>
        );
    }
}

GoldenView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoldenView);
