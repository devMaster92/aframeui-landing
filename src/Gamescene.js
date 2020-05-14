import { Entity } from 'aframe-react';
import React, { Component } from 'react';
// import LandingPhase2 from './scenes/LandingPhase2';
import LandingPhase1 from './scenes/LandingPhase1';
import GlobeView from './scenes/GlobeView';
import GlobalEvents from './utils/global-events';
class Gamescene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CrawlTextTrigger: false,
            GlobeViewTrigger: false,
            tiggherphs1: false
            //   position: { x: 0, y: 0, z: 0 },
            //   rotation: { x: 0, y: 0, z: 0 }
        }
    }
    CrawlTextTriggerHere() {
        setTimeout(
            () => {
                this.setState({
                    CrawlTextTrigger: true,
                    tiggherphs1: false
                })
            }
            , 1)

    }
    GlobeViewTriggerHere() {
        this.setState({
            GlobeViewTrigger: true,
            CrawlTextTrigger: false
        })

    }
    Phase1Trigger() {
        this.setState({
            tiggherphs1: true,
        })
    }
    componentDidMount() {
        if (this.props.phs1trigger) {
            GlobalEvents.on('cityloaded', this.Phase1Trigger.bind(this));
        } else {
            document.getElementById('myCam').setAttribute('position', { x: 0, y: 1.6, z: 0 })
            this.GlobeViewTriggerHere()
        }
        document.body.addEventListener('phase2trigger', this.CrawlTextTriggerHere.bind(this), false)
        GlobalEvents.on('CrawlComplete', this.GlobeViewTriggerHere.bind(this));
    }
    render() {
        return (
            <Entity>
                <Entity primitive="a-sky" color="black" />
                <a-entity star-system="size:1;texture: https://cdn.rawgit.com/matthewbryancurtis/aframe-star-system-component/master/assets/star.svg;count: 20000;"></a-entity>
                {this.state.tiggherphs1 ? <LandingPhase1 /> : null}

                {/* {this.state.CrawlTextTrigger ? <LandingPhase2 /> : null} */}
                {this.state.GlobeViewTrigger ? <GlobeView /> : null}
            </Entity>
        )
    }
}

export default Gamescene;