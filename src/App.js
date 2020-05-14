import React, {Component} from 'react';
import Gamescene from './Gamescene';
import Assets from './components/Assets';
import CrawlText from './components/CrawlText';
import Camera from './components/Camera';
import GlobalEvents from './utils/global-events'
// import oauth2Context from './utils/SecurityContext.js'  //only for deployment
// import CountryView from './scenes/CountryView';
// import HUDaverage from './components/HUDaverage'
import GoldenView from './scenes/GoldenView.js'
import ReactDOM from 'react-dom';
import InfinityGauntlet from "react-thanos-snap";

import * as simulationSocket from './APIs/simulationSocket';
import Icons from './components/Icons.js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import PieChart from './components/PieChart'
// import PricingDetails from './components/PricingDetails.js'
import HUDaverage from "./components/HUDaverage";
import HUDagent from './components/HUDagent.js';
import HUDenv from "./components/HUDenv";
import HUDMetrics from "./components/HUDMetrics";
import HUDproduct from "./components/HUDproduct.js";
import HUDpricing from './components/HUDpricing.js';
import HUDpromotion from './components/HUDpromotion.js'

// import {subscribeToNamespace} from "./APIs/simulationSocket";


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// function SplitTime(numberOfHours){
//     var Days=Math.floor(numberOfHours/24);
//     var Remainder=numberOfHours % 24;
//     var Hours=Math.floor(Remainder);
//     var Minutes=Math.floor(60*(Remainder-Hours));
//     return({"Days":Days,"Hours":Hours,"Minutes":Minutes})
// }

function openSummary() {
    GlobalEvents.trigger('simendagain')

    setTimeout(function () {

        GlobalEvents.trigger('simendagain')


    }, 100);

}

let clientdata = null
const config = require('./utils/config')

class App extends Component {
    constructor() {
        super();
    this.action = (key) => (
    
            <IconButton onClick={() => { this.props.closeSnackbar(key) }}>
                <CloseIcon />
            </IconButton>
    
        );
        this.state = {
            redirect: false,
            snap: false,
            id: 'helloworld',
            countryName: 'usa',
            showLogoutbutton: false,
            showCountry: false,
            phs1trigger: true,
            crawlTextTrigger: false,
            crawlDoneFlag: false,
            time_data: [],
            activity_data: [],
            drinking_moment: [],
            beverage_category: [],
            beverage_category_by_drinking: [],
            drinking_moment_by_beverage: [],
            noOfTicks: 25,
            noOfAgents: 50,
            isPrimary: true,
            tab: 1,
            simStarted: false,
            showUserDialog: false,
            showSimEndInfo: false,
            showStartDialog: false,
            socketStatus: false,
            dialogOptions: {
                noOfUsers: 0,
                userForcing: "",
                forcedToExit: false
            },
            graphdata: {'name': 'Units Sold', data: []},
            simSummary: {
                "graph": {
                    "Competitor1": 10,
                    "Competitor2": 50,
                    "Your Brand": 6
                },
                "ticks": 150,
                "agents": 200,
                "profit": 20,
                "product": {
                    "pricing": {
                        "ctc": 2,
                        "profit_margin": 60
                    },
                    "specs": {
                        "health": 4,
                        "taste": 5,
                        "pleasure": 3
                    }
                },
                "beverage_cat": "tea"
            }
        };
        //this.state=this.state.bind(this)
        sessionStorage.clear();
        sessionStorage.setItem("tab", (this.state.tab === 0 ? "admin" : "marketing"));
    }

    openEgg = (e) => {
        GlobalEvents.trigger('changeEgg');
    }

    showLogout = (e) => {
        this.setState({
            showLogoutbutton: !this.state.showLogoutbutton
        })
        // console.log('func call')
        // console.log(this.state.showObjective)

    }

    Logout = (e) => {

        GlobalEvents.trigger('logout');


        this.setState(({
            snap: !this.state.snap
        }))
        setTimeout(()=>{
            GlobalEvents.trigger('logout');

            window.location.reload();
        },12000)


    }

    countryTrigger(data) {
        // console.log('will render', data)
        if (data === 'usa' | data === 'aus' | data === 'uk' | data === 'ind' | data === 'chn') {

            let mountNode = ReactDOM.findDOMNode(this.refs.GoldenView);
            try {
                React.unmountComponentAtNode(mountNode);
            } catch (e) {
                console.error(e);
            }
            this.setState({
                countryName: data,
                showCountry: true,
                crawlDoneFlag: true,
            })


            if (document.getElementById('GoldenView')) {
                document.getElementById('GoldenView').style.display = "block"
                document.getElementById('widgets').style.display = "block"

            }
        } else {
            alert("Map development is in progress, Wait till next build for country - ".concat(data.toUpperCase()))
        }
    }

    CrawlTrigger() {
        this.setState({
            crawlTextTrigger: true
        })
    }


    handleSimulationSocket() {
        const self = this;
        sessionStorage.setItem('ClientId', randomString((Math.floor(Math.random() * 7) + 5), '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'))
        console.log('Simualation socket connected');
        simulationSocket.subscribeToNamespace('connection-properties', (data) => {
            clientdata = data;
            console.log('simulation start status', data);
            if (data.noOfUsers > 0) {
                // console.log("Showing dialog");
                self.setState({
                    isPrimary: data.isPrimary,
                    showUserDialog: true,
                    dialogOptions: {
                        noOfUsers: data.noOfUsers,
                        userForcing: "",
                        forcedToExit: false
                    },
                    socketStatus: true,
                });
            } else {
                this.setState({
                    showStartDialog: true,
                    socketStatus: true,
                })
            }
        });
        simulationSocket.subscribeToNamespace('simulation_status', (data) => {
            // Promotion sessionStorage spends update fn
            this.updatePromotionNumbers();
        });
        simulationSocket.subscribeToNamespace('closeSession', self.gotKicked);
    }

    kickOthers = () => {
        const self = this;
        self.showNotification("Closing all other user sessions. Please wait.");
        simulationSocket.emitData("kick_others", {userName: this.splitWord(config.username)});
        self.setState({
            showUserDialog: false,
            showStartDialog: true
        });
    }


    calcPos = () => {
        // const self = this;
        let result = 0
        //    let keys = Object.keys(this.state.simSummary['graph'])
        let values = Object.values(this.state.simSummary['graph'])
        values = values.sort(function (a, b) {
            return b - a;
        })
        for (var j = 0; j < values.length; j++) {
            if (this.state.simSummary['graph']['Your Brand'] === values[j]) {
                result = j
            }
        }

        return result + 1
    }


    closeDialog = () => {
        document.querySelector('#startsimul').click()
        const self = this;
        self.setState({
            showUserDialog: false,
            showStartDialog: true
        });
    }

    closeStartDialog = () => {
        const self = this;
        self.setState({
            showStartDialog: false
        })
    }
    gotKicked = (data) => {
        const self = this;
        if (data.userName.toLowerCase() !== this.splitWord(config.username)) {
            self.setState({
                showUserDialog: true,
                dialogOptions: {
                    userForcing: data.userName,
                    forcedToExit: true
                }
            });
            setTimeout(() => {
                self.exitGame();
            }, 5000);
        } else {
            self.showNotification("Closed all user sessions. Please refresh to continue.", {variant: "success"});
            self.setState({
                showUserDialog: false
            });
        }
    }
    exitGame = () => {
        const self = this;
        self.showNotification("Exiting Game", {variant: "warning"});
        self.setState({
            showUserDialog: false
        });
        window.location.reload();
        // oauth2Context.logout();
    }

    showglobe() {
        this.setState({
            showCountry: false,
            phs1trigger: false
        })
    }

    componentDidMount() {
        const self = this;
        GlobalEvents.on('showglobe', this.showglobe.bind(this))
        GlobalEvents.on('triggercountry', this.countryTrigger.bind(this));
        GlobalEvents.on('cityloaded', this.CrawlTrigger.bind(this));
        GlobalEvents.on('CrawlComplete', () => {
            this.setState({crawlDoneFlag: true})
        });
        GlobalEvents.on('Agentsdata', (data) => {
            this.setState({
                noOfAgents: data
            })
        })
        GlobalEvents.on('Ticksdata', (data) => {
            this.setState({
                noOfTicks: data
            })
        })

        // if(!this.state.showUserDialog){
        //     this.setState({
        //         showStartDialog : true
        //     })
        // }

        if (this.state.socketStatus) {
            simulationSocket.subscribeToNamespace('HUD_data', data => {

                // console.log("HUD", data);
            });
        }

        GlobalEvents.on('startsim', (data) => {
            // document.getElementById('simulationstatus').innerHTML = "Starting Simulation"
            // document.getElementById('simulationstatus').style.marginTop = '10%'
            // document.getElementById('play_siulation').style.display = "none";
            // document.getElementsByClassName('play_siulation')[0].style.display = "none";

            // setTimeout(() => {
            //   document.getElementById('sleep_icon').click();

            // }, 5000);
            if (self.state.simStarted === true && self.state.simCompleted === true) {
                this.showNotification("Please refresh the page to start simulation again.", {variant: "warning"});
                this.setState({
                    showSimEndInfo: true
                })
                // setTimeout(() => {
                //     self.exitGame();
                // }, 5000);
                return;
            } else if (self.state.simStarted === true && self.state.simCompleted !== true) {
                this.showNotification("Functionality to stop simulation is not available yet.", {variant: "warning"});
                return;
            }
            if (!clientdata.isPrimary) {
                this.showNotification('You are logged in as spectator', {variant: "warning"})
            } else {
                this.showNotification("Starting Simulation")
            }
            sessionStorage.setItem("simStarted", "true");
            sessionStorage.setItem("simCompleted", "false");

            simulationSocket.subscribeToNamespace('simMetadata', (data) => {
                // console.log("App.js");
                // console.log('simMetadata', data);

                if (data.simCompleted) {
                    this.showNotification("Simulation Completed", {variant: "success"})
                    sessionStorage.setItem("simCompleted", "true");
                    GlobalEvents.trigger('showendinfo')

                    fetch(config.api.url + 'endinfo', {
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
                            let graphdata = {'name': 'Units Sold', data: [], colorByPoint: true}

                            Object.keys(data.graph).forEach(key => {
                                let temp = {"name": key, "y": data.graph[key]}
                                if (key === 'Your Brand') {
                                    temp.sliced = true;
                                    temp.selected = true
                                }
                                graphdata.data.push(temp);
                            })
                            // console.log('graphdata',graphdata)
                            this.setState({
                                simSummary: data,
                                simCompleted: true,
                                showSimEndInfo: true,
                                graphdata: graphdata
                            })
                        })


                    // this.setState({

                    // })
                } else if (data.simStarted) {
                    this.showNotification("Simulation Started", {variant: "success"})
                }

            })

            this.triggerSimulation();

            if (this.state.simStarted === false) {
                this.setState({simStarted: true});
            }

        });

        GlobalEvents.on('connect_socket', () => {
            simulationSocket.connectSocket(this.handleSimulationSocket.bind(this));
        })

    }

    updatePromotionNumbers = () => {
        if (sessionStorage.getItem('cur_burn_rate')) {
            let current_spends = parseFloat(sessionStorage.getItem('cur_spends'));
            let cur_burn_rate = parseFloat(sessionStorage.getItem('cur_burn_rate'));
            let current_tick_spends = cur_burn_rate / (24 * 7);
            current_spends += current_tick_spends;
            current_spends = current_spends.toFixed(2);
            sessionStorage.setItem('cur_spends', parseFloat(current_spends));
        }
    };

    triggerSimulation = () => {
        const simsetData = '{"uniqueId":1559119339490,"modelType":"Individual","panelExpanded":"agents_ticks","dataToSend":{"simParameters":{"n_agents":[10],"n_ticks":[48]},"levelZeroParameters":{"model_type":["Individual"],"individualThresholds":{"eat_hunger":[7],"eat_energy":[2],"drink_thirst":[6],"drink_energy":[3]},"combinedThresholds":{"hunger_wt":[0.7],"thirst_wt":[0.7],"energy_hunger_wt":[0.3],"energy_thirst_wt":[0.3],"eat_hunger_energy":[5],"drink_thirst_energy":[5]},"commonThresholds":{"hunger_seed":[6],"energy_seed":[7],"fatigue_seed":[6.5],"thirst_seed":[5],"sd_seed":[0.3],"sleep_fatigue_high":[6],"sleep_fatigue_low":[3.5],"sleep_lumens":[0.2]}},"productParameters":{"Product_attributes":[{"brandName":"yourBrand","competitorBrand":false,"health":5,"taste":2,"pleasure":1,"visualAppeal":4,"price":6}],"beveragecategory":["Water"]},"simStatus":{"stopSimFlag":false}},"accordians":[{"label":"Agents & Hours","id":"agents_ticks","visibleIn":"both","content":[{"visibleIn":"both","label":"Agents","destination":"simParameters.n_agents","minValue":10,"maxValue":500,"selectedValue":200,"step":1},{"visibleIn":"both","label":"Hours","destination":"simParameters.n_ticks","minValue":25,"maxValue":250,"selectedValue":48,"step":1}]},{"label":"Eat","id":"eat","visibleIn":"both","content":[{"visibleIn":"individual","label":"Hunger","destination":"levelZeroParameters.individualThresholds.eat_hunger","minValue":1,"maxValue":10,"selectedValue":7,"step":0.5},{"visibleIn":"individual","label":"Energy","destination":"levelZeroParameters.individualThresholds.eat_energy","minValue":1,"maxValue":10,"selectedValue":2,"step":0.5},{"visibleIn":"combined","label":"Hunger-Energy","destination":"levelZeroParameters.combinedThresholds.eat_hunger_energy","minValue":1,"maxValue":10,"selectedValue":5,"step":0.5}]},{"label":"Drink","id":"drink","visibleIn":"both","content":[{"visibleIn":"individual","label":"Thirst","destination":"levelZeroParameters.individualThresholds.drink_thirst","minValue":1,"maxValue":10,"selectedValue":6,"step":0.5},{"visibleIn":"individual","label":"Energy","destination":"levelZeroParameters.individualThresholds.drink_energy","minValue":1,"maxValue":10,"selectedValue":3,"step":0.5},{"visibleIn":"combined","label":"Thirst-Energy","destination":"levelZeroParameters.combinedThresholds.drink_thirst_energy","minValue":1,"maxValue":10,"selectedValue":5,"step":0.5}]},{"label":"Sleep","id":"sleep","visibleIn":"both","content":[{"visibleIn":"both","label":"Fatigue - Induce Sleep","destination":"levelZeroParameters.commonThresholds.sleep_fatigue_high","minValue":1,"maxValue":10,"selectedValue":6,"step":0.5},{"visibleIn":"both","label":"Fatigue - Induce wakeup","destination":"levelZeroParameters.commonThresholds.sleep_fatigue_low","minValue":1,"maxValue":10,"selectedValue":3.5,"step":0.5},{"visibleIn":"both","label":"Lumens","destination":"levelZeroParameters.commonThresholds.sleep_lumens","minValue":0,"maxValue":1,"selectedValue":0.2,"step":0.1}]},{"label":"Initial seed for agent states","id":"seed","visibleIn":"both","content":[{"visibleIn":"both","label":"Hunger","destination":"levelZeroParameters.commonThresholds.hunger_seed","minValue":1,"maxValue":10,"selectedValue":6,"step":0.5},{"visibleIn":"both","label":"Energy","destination":"levelZeroParameters.commonThresholds.energy_seed","minValue":1,"maxValue":10,"selectedValue":7,"step":0.5},{"visibleIn":"both","label":"Thirst","destination":"levelZeroParameters.commonThresholds.thirst_seed","minValue":1,"maxValue":10,"selectedValue":5,"step":0.5},{"visibleIn":"both","label":"Fatigue","destination":"levelZeroParameters.commonThresholds.fatigue_seed","minValue":1,"maxValue":10,"selectedValue":6.5,"step":0.5},{"visibleIn":"both","label":"Standard Deviation","destination":"levelZeroParameters.commonThresholds.sd_seed","minValue":0,"maxValue":1,"selectedValue":0.3,"step":0.1}]},{"label":"Weights","id":"weights","visibleIn":"combined","content":[{"visibleIn":"combined","label":"Hunger","destination":"levelZeroParameters.combinedThresholds.hunger_wt","minValue":0,"maxValue":1,"selectedValue":0.7,"step":0.1},{"visibleIn":"combined","label":"Thirst","destination":"levelZeroParameters.combinedThresholds.thirst_wt","minValue":0,"maxValue":1,"selectedValue":0.7,"step":0.1},{"visibleIn":"combined","label":"Hunger-Energy Weight","destination":"levelZeroParameters.combinedThresholds.energy_hunger_wt","minValue":0,"maxValue":1,"selectedValue":0.3,"step":0.1},{"visibleIn":"combined","label":"Thirst-Energy Weight","destination":"levelZeroParameters.combinedThresholds.energy_thirst_wt","minValue":0,"maxValue":1,"selectedValue":0.3,"step":0.1}]}]}'
        const simSettingsStateData = JSON.parse(sessionStorage.getItem("simSettings") ? sessionStorage.getItem("simSettings") : simsetData);

        const dataToSend = simSettingsStateData.dataToSend;
        simSettingsStateData.accordians.forEach(acc => {
            acc.content.forEach(sliderOb => {
                if(sliderOb.destination){
                    const keys = sliderOb.destination.split(".");
                    if (keys.length === 2) {
                        dataToSend[keys[0]][keys[1]] = [sliderOb.selectedValue];
                    } else if (keys.lenth === 3) {
                        dataToSend[keys[0]][keys[1]][keys[2]] = [sliderOb.selectedValue];
                    }
                }
            });
        });
        dataToSend["levelZeroParameters"]["model_type"] = [(simSettingsStateData.modelType.toLowerCase() === "individual" ? "Individual" : "Combined")];
        simulationSocket.startSimualation(dataToSend);
    }

    showNotification = (msg, options = {}) => {
        const self = this;
        this.props.enqueueSnackbar(msg, Object.assign(
            {
                key: msg,
                action: self.action,
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                    autoHideDuration: 1000,
                    preventDuplicate: true
                }
            }, options));
    }
    handleCloseSimEndInfo = () => {
        this.setState({
            showSimEndInfo: false
        })
    }

    skipTutorial() {
        var phase2event = new CustomEvent('phase2trigger');

        this.showNotification("Skipping Tutorial");

        setTimeout(() => {

            document.body.dispatchEvent(phase2event);
        }, 100)
        setTimeout(() => {
            GlobalEvents.trigger('CrawlComplete');
        }, 200)
        clearInterval(window.cam_interval);
    }

    splitWord(username) {
        return username.replace(".", " ")
    }

    resetGlobe() {
        let rot = document.querySelector('#globeB').getAttribute('rotation')
        rot.x = 36.5;
        rot.y = 4.5;
        rot.z = 0;
        document.querySelector('#globeB').setAttribute('rotation', rot)
    }

    changeTab = (e, v) => {
        // console.log('tab selected', v)
        GlobalEvents.trigger('tab_selected', v)

        setTimeout(() => {
            if (this.state.simStarted) {
                this.state.tab === 0 ? GlobalEvents.trigger('environmentWidget', 'graphs') : GlobalEvents.trigger('changeWidget', 'graphs2');
            }
        }, 5);
        this.setState({tab: v});

    }

    // getProductInfo =() =>{
    //     <Grid></Grid>
    // }

    render() {

        // let result = this.calcPos()
        // let days = SplitTime(this.state.simSummary['ticks'])['Days']
        // let hours = SplitTime(this.state.simSummary['ticks'])['Hours']
        return (


            <div id="Golden">
                <InfinityGauntlet snap={this.state.snap}>
                {/*<div id="maindiv" style={{backgroundColor: this.state.showCountry ? '#344955': '#34495500'}}>*/}
                {/*</div>*/}


                {/* <div className='logoVersionWrapper'>
                    <p>  <img className='gameLogo'  align="bottom" /> v19.05.01       </p></div> */}

                <div  className="flex-container" style={{backgroundColor: this.state.showCountry ? '#344955': '#34495500'}}>
                    <img   onClick={this.openEgg.bind(this)} alt="GameLogo" src="finalLogo.png" style={{width:"10%",  alignSelf: 'flex-end', marginBottom: '1vh'}}/>
                    <div className="versionNumber" style={{alignSelf: 'flex-end', marginBottom: '1vh'}}>|v19.07.01</div>

                    {this.state.showCountry ? <Tabs id="Switch" style={{
                        marginLeft: "auto",
                        alignSelf: 'auto',
                        marginTop: '1%',
                        marginRight: '4%'
                    }}
                                                    value={this.state.tab}
                                                    onChange={this.changeTab}
                                                    classes={{indicator: 'customindicator'}}
                        // indicatorColor="primary"
                        // textColor="primary"
                    >
                        <Tab onClick={openSummary()} classes={{selected: 'customred'}} id="TabRole"
                             label="Environment"/>
                        <Tab onClick={openSummary()} classes={{selected: 'customred'}} id="TabRole" label="Marketing"/>
                    </Tabs> : null}

                    <div className="tooltip" style={!this.state.showCountry?{marginLeft: 'auto'}:null}>
                        <img alt="info_icon" id="info_icon" src="info_new.svg" style={{width: '1.4vw'}}></img>
                        <div class="bottom">
                            <img alt="maslow" src="maslows_new6.png" width={780}
                                 style={{background: 'transparent'}}></img>
                            {/* <i></i> */}
                        </div>
                    </div>
                    <div style={{backgroundColor: "#D2DBE0"}} className="name" onClick={this.showLogout}>
                        <div style={{border: '2px solid var(--secondary-color)'}} className="circle">
                            <img style={{width: '1.6vw', height: '1.75vw'}} className="userphoto"
                                 src={`https://eoc.mu-sigma.com/phoenix/oauth-service/user/image/${config.username}/`}
                                 alt="Avatar"></img>
                        </div>
                        <p style={{color: 'var(--secondary-color)'}}
                           className="username">{this.splitWord(config.username)}</p>
                    </div>


                    <br/>
                    <div className="logout" style={{
                        width: this.state.showLogoutbutton ? 'auto' : '0%',
                        display: this.state.showLogoutbutton ? 'block' : 'none',
                        margin: 0,
                        fontSize: '1vw',

                    }} onClick={this.Logout}>
                        <img src="logout.svg" width="15vw" height="15vw" alt="logout"></img>Logout
                    </div>

                </div>
                {this.state.showCountry ? <div className="SwitchTabs">
                        {this.state.tab === 0 ?

                            <div className="hud-container">

                                {this.state.socketStatus ?
                                    <HUDagent subscribe_ns={simulationSocket.subscribeToNamespace}/> : null}
                                {this.state.socketStatus ?
                                    <HUDaverage key="eat" subscribe_ns={simulationSocket.subscribeToNamespace}/> : null}
                                {this.state.socketStatus ? <HUDenv border="none" key="drink"
                                                                   subscribe_ns={simulationSocket.subscribeToNamespace}/> : null}
                            </div>
                            :
                            <div className="hud-container">

                                {this.state.socketStatus ?
                                    <HUDMetrics subscribe_ns={simulationSocket.subscribeToNamespace}/> : null}
                                {this.state.socketStatus ? <HUDenv border="2px solid lightgrey" key="drink2"
                                                                   subscribe_ns={simulationSocket.subscribeToNamespace}/> : null}
                                {this.state.socketStatus ?
                                    <HUDproduct key="sleep" subscribe_ns={simulationSocket.subscribeToNamespace}/> : null}
                                {this.state.socketStatus ?
                                    <HUDpricing key="sleep2" subscribe_ns={simulationSocket.subscribeToNamespace}/> : null}

                                {this.state.socketStatus ? <HUDpromotion key='promotion'
                                                                         subscribe_ns={simulationSocket.subscribeToNamespace}/> : null}

                                {/*{this.state.socketStatus ?*/}
                                {/*<HUDaverage key="eat" subscribe_ns={simulationSocket.subscribeToNamespace}/> : null}*/}
                                {/* <div id="tempdiv">
                                <img style={{
                                    width: '3.3vw',
                                    position: 'absolute'
                                }} src="temperature.png"></img>

                                <div style={{
                                    position: 'absolute',
                                    right: '31%',
                                    top: '14%',
                                    fontSize: '3vh'
                                }}>21°C
                                </div>

                            </div> */}
                            </div>
                        }
                    </div>
                    : null}


                {this.state.crawlTextTrigger && !this.state.crawlDoneFlag ?
                    <img className='skipicon' id="skipicon" alt="skipicon" src="skip.svg"
                         onClick={this.skipTutorial.bind(this)}/> : null}

                {this.state.crawlTextTrigger && !this.state.crawlDoneFlag ? <CrawlText/> : null}
                {/* {this.state.showCountry ? <Widgets time_series={this.state.time_data} activity_data={this.state.activity_data} drinking_moment={this.state.drinking_moment} beverage_category={this.state.beverage_category} beverage_category_by_drinking={this.state.beverage_category_by_drinking} drinking_moment_by_beverage={this.state.drinking_moment_by_beverage} /> : null} */}

                {/* {this.state.showCountry ? <Chart /> : null} */}

                {this.state.showCountry ?
                    //  <CountryView id={this.state.countryName} key={this.state.countryName}
                    // minZoom={config[this.state.countryName].minZoom} countryname={this.state.countryName}
                    // height={config[this.state.countryName].height} width={config[this.state.countryName].width}
                    // latitude={config[this.state.countryName].latitude}
                    // longitude={config[this.state.countryName].longitude} zoom={config[this.state.countryName].zoom}
                    // pitch={config[this.state.countryName].pitch} maxZoom={config[this.state.countryName].maxZoom}
                    // mapboxApiAccessToken={config[this.state.countryName].mapboxApiAccessToken}
                    // mapStyle={config[this.state.countryName].mapStyle}
                    // geourl={config[this.state.countryName].geourl} />
                    <GoldenView countryname={this.state.countryName}
                                height={config[this.state.countryName].height}
                                width={config[this.state.countryName].width}
                                latitude={config[this.state.countryName].latitude}
                                longitude={config[this.state.countryName].longitude}
                                zoom={config[this.state.countryName].zoom}
                                pitch={config[this.state.countryName].pitch}
                                maxZoom={config[this.state.countryName].maxZoom}
                                mapboxApiAccessToken={config[this.state.countryName].mapboxApiAccessToken}
                                mapStyle={config[this.state.countryName].mapStyle}
                                geourl={config[this.state.countryName].geourl}
                                subscribe_ns={simulationSocket.subscribeToNamespace}
                                unsubscribe_ns={simulationSocket.unsubscribeToNamespace}
                                emit_data={simulationSocket.emitZipData}
                                showNotification={this.showNotification}
                                simStarted={this.state.simStarted}
                                tab={this.state.tab === 0 ? "admin" : "marketing"}/> : null}
                {!this.state.showCountry && this.state.crawlDoneFlag ?
                    <img alt="reset" src="resetr.svg" onClick={this.resetGlobe.bind(this)} id="resetr"></img> : null}


                {this.state.showCountry ? <Icons showNotification={this.showNotification}
                                                 tab={this.state.tab === 0 ? "admin" : "marketing"}/> : null}
                {/* {this.state.showCountry ? <Header /> : null} */}

                </InfinityGauntlet>
                {!this.state.showCountry ?
                    <a-scene id="gamescene" light="defaultLightsEnabled: false"
                             loading-screen="dotsColor: gold; backgroundColor: black"
                             vr-mode-ui="enabled: false" /*gltf-model={{dracoDecoderPath: "/Draco/"}}*/
                             color-space="sRGB" background="color: skyblue">
                        <Assets/>
                        <Camera/>
                        <a-entity id="light2" position="0 3 0.7"
                                  light="type: directional; castShadow: true; intensity: 0.5; shadowCameraFov: 90; angle: 0;"></a-entity>
                        <a-entity id="light1"
                                  light="color: #BBB; shadowCameraFov: 90; type: ambient; angle: 60; "></a-entity>
                        <Gamescene phs1trigger={this.state.phs1trigger}/>
                    </a-scene> : null}

                {/* sim end info */}
                {/* <Dialog

                

                    open={this.state.showSimEndInfo}
                    onClose={this.handleCloseSimEndInfo}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth='md' style={{width: "100% !important"}}
                >
                    <DialogTitle style={{backgroundColor:'#D2DBE0',textAlign: "center", borderBottom: '2px solid #344955'}} id="alert-dialog-title">
                        <div>{`Simulation completed - Your market position: #`}{result}</div>

                    </DialogTitle>
                    <DialogContent style={{backgroundColor:'#D2DBE0'   ,paddingBottom: "0px"}}>
                        <DialogContentText id="alert-dialog-description">
                            <PricingDetails price={this.state.simSummary.product.pricing.ctc}
                                            beverage_category={this.state.simSummary.beverage_cat}
                                            profit_margin={this.state.simSummary.product.pricing.profit_margin}
                                            health={this.state.simSummary.product.specs.health}
                                            taste={this.state.simSummary.product.specs.taste}
                                            pleasure={this.state.simSummary.product.specs.pleasure}/>
                           
                            <table background="#98a5ad57" style={{
                                marginLeft: '13vw',
                                marginTop: '1vh',
                                border: '2px solid #344955',
                                borderRadius: '10px',
                                borderCollapse:'collapse'
                            }}>

                                <tbody>

                                <tr>
                                    <td>Number of agents</td>
                                    <td>{this.state.simSummary.agents}</td>
                                </tr>
                                <tr>
                                    <td>Simulation duration</td>

                                    {hours >0 ?<td>{`${days} Day(s) ${hours} Hour(s)`}</td> : <td>{`${days} Day(s)`}</td> }
                                    
                                    
                                </tr>
                               
                                </tbody>
                            </table>


                            <PieChart data={this.state.graphdata}/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{margin:'0',backgroundColor:'#D2DBE0',justifyContent: "center"}}>

                        <img width="40%" src="end_of_summary.png" alt="end"></img>


                    </DialogActions>
                </Dialog> */}


                <Dialog
                    open={this.state.showUserDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    disableBackdropClick
                    disableEscapeKeyDown
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description" style={{width: "100% !important"}}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"What would you like to do?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {
                                "Only 1 user can use the game at any given time but there are " + this.state.dialogOptions.noOfUsers + " other users using the game. " +
                                "What would you like to do?"
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.exitGame} color="primary">
                            Exit
                        </Button>
                        <Button onClick={this.closeDialog} color="primary">
                            Continue as Spectator
                        </Button>
                        <Button onClick={this.kickOthers} color="primary">
                            Close all other sessions
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.showStartDialog && this.state.showUserDialog === false}
                    TransitionComponent={Transition}
                    keepMounted
                    disableBackdropClick
                    disableEscapeKeyDown
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description" style={{width: "100% !important"}}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <h2 style={{marginBottom: "2%", textAlign: "center"}}>GAME PLAY</h2>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Typography gutterBottom variant="h6" style={{textAlign: 'center'}}>
                                View 1 : Environment
                            </Typography>
                            <div style={{textAlign: 'center', height: '20%', display: 'block'}}>
                                <div style={{width: '33%', height: '100%', display: 'inline-block'}}>

                                    <img style={{width: '40%'}} src='agents.svg' alt='Agents'/>
                                    <div style={{display: 'block'}}>Set number of agents in the simulation</div>
                                </div>
                                <div style={{width: '33%', height: '100%', display: 'inline-block'}}>
                                    <img src='sand-clock.svg' style={{width: '30%'}} alt='Timer'/>
                                    <div style={{display: 'block'}}>Set time period for simulation</div>
                                </div>
                                <div style={{width: '33%', height: '100%', display: 'inline-block'}}>
                                    <img style={{width: '40%'}} src='control.svg' alt='Settings'/>
                                    <div style={{display: 'block'}}>More metrics to tweak agent behaviour</div>
                                </div>
                            </div>
                            <Typography gutterBottom>
                                Tweak and tune simulation parameters to emulate a realistic agent (human) behavior.
                            </Typography>
                            <Typography gutterBottom variant="h6" style={{textAlign: 'center'}}>
                                View 2 : Marketing
                            </Typography>
                            <div style={{textAlign: 'center', height: '20%', display: 'block'}}>
                                <div style={{width: '33%', height: '100%', display: 'inline-block'}}>

                                    <img style={{width: '40%'}} src='coffee.svg' alt='Product'/>
                                    <div style={{display: 'block'}}>Create a beverage based on your preference</div>
                                </div>
                                <div style={{width: '33%', height: '100%', display: 'inline-block'}}>
                                    <img src='pricing.svg' style={{width: '30%'}} alt='Pricing'/>
                                    <div style={{display: 'block'}}>Fix the price and profit percentage</div>
                                </div>
                                <div style={{width: '33%', height: '100%', display: 'inline-block'}}>
                                    <img style={{width: '40%'}} src='promotion.svg' alt='Promotions'/>

                                    <div style={{display: 'block'}}>Setup a promotion campaign</div>
                                </div>
                            </div>
                            <Typography gutterBottom>

                                By default, the product is configured to coffee at a price of $2.35 with a profit margin
                                of 286%

                            </Typography>
                            <Typography gutterBottom></Typography>
                            <Typography gutterBottom>
                                <b>Competitors</b> are auto-introduced into the environment. Observe your product
                                performance throughout the simulation using the data science widget. Your aim is to
                                ensure your brand has the largest market share.
                            </Typography>
                            <Typography gutterBottom> </Typography>
                            <Typography>
                                The entire layout can be resized – play around a little to explore for yourself!
                            </Typography>
                            <Typography gutterBottom style={{textAlign: 'bottom'}}>
                                Happy brewing to you!
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeStartDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                {
                    (this.state.dialogOptions.forcedToExit === true ?
                        <Dialog
                            open={this.state.showUserDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            disableBackdropClick
                            disableEscapeKeyDown
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description" style={{width: "100% !important"}}
                        >
                            <DialogTitle id="alert-dialog-slide-title">
                                {"The game will exit"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    {
                                        "The user " + this.state.dialogOptions.userForcing + " has requested all users to close their sessions. " +
                                        "The game will exit in 5 seconds."
                                    }
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.exitGame} color="primary">
                                    Exit
                                </Button>
                            </DialogActions>
                        </Dialog>
                        :
                        null)
                }
            </div>
        );
    }
}
export default App;
