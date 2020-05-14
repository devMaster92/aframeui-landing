import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import GlobalEvents from '../utils/global-events.js';
// import Assets from '../components/Assets';
class LandingPhase2 extends Component {

    componentDidMount() {
        // let phs1 = document.getElementById('LandingPhase1');
        // phs1.parentNode.removeChild(phs1)
        // document.getElementById('myCam').setAttribute('rotation', { x: 0, y: 0, z: 0 })
        document.getElementById('myCam').setAttribute('position', { x: 0, y: 1.6, z: 0 })

        // GlobalEvents.trigger('showCrawlText')
        // console.log('after crawl trigger')
        // setTimeout(() => {
        //     var el = document.getElementById('myCam')
        //     var lc = el.getAttribute('look-controls')
        //     lc.enabled = false;
        // }, 1000)

        

        GlobalEvents.on('pauseAnimation',this.pauseEvent.bind(this));
    }


    pauseEvent(){

        var pause_animation = new CustomEvent('pause-animation');

        document.getElementById('aaaa').dispatchEvent(pause_animation);
        document.getElementById('bbbb').dispatchEvent(pause_animation);
        document.getElementById('cccc').dispatchEvent(pause_animation);

    }

    render() {
        return (
            <Entity id="LandingPhase2">

<a-entity id="aaaa" material={`color: #444444; transparent: true;  side:double; metalness:0.5`} geometry={`primitive:box; width:0.8; depth:0.4; height:0.015`} position="0 2.025 -1" rotation="60 0 0" animation__position="property: position; dir: alternate; dur: 1500;
                           easing: easeInSine; loop: false; to: -3 2 -1; pauseEvents:pause-animation; delay:22000;" animation__scale="property: scale; dir: alternate; dur:500; pauseEvents:pause-animation;
                           easing: easeInSine; loop: 10; to: 1.2 1 1.2; delay: 18000">
     <a-gltf-model id="world" rotation="-90 0 0" scale="0.008 0.009 0.009" src="#world" ></a-gltf-model>
                                                   </a-entity>

                <a-entity id="bbbb" material={`color: #444444; transparent: true;  side:double; metalness:0.5`} geometry={`primitive:box; width:0.825; depth:0.4; height:0.015`} position="0 1.925 -1" rotation="60 0 0" animation__position="property: position; dir: alternate; dur: 1500; easing: easeInSine; loop: false; from:0 2.025 -1; to: 3 2.025 -1; pauseEvents:pause-animation; delay: 28000" animation__position2="property: position; dir: alternate; dur: 1500; easing: easeInSine; loop: false; to: 0 2.025 -1; pauseEvents:pause-animation; delay:24000" animation__scale="property: scale; dir: alternate; dur:500; easing: easeInSine; loop: 7; to: 1.2 1 1.2; pauseEvents:pause-animation; delay: 24500">

                    <a-gltf-model id="Texas" rotation="-90 0 0" position="-0.2 0.01 0.18" scale="0 0 0" animation__scale2="property: scale; dir: alternate; dur:500; easing: easeInSine; loop: false; to:0.006 0.006 0.006; pauseEvents:pause-animation; delay: 23800" src="#Texas" ></a-gltf-model>

                </a-entity>

                <a-entity id="cccc" material={`color: #444444; transparent: true;  side:double; metalness:0.5`} geometry={`primitive:box; width:0.85; depth:0.4; height:0.015`} position="0 1.825 -1" rotation="60 0 0" animation__position2="property: position; dir: alternate; pauseEvents:pause-animation; dur: 1500;
                           easing: easeInSine; loop: false; to: 0 2.025 -1; delay:28000"  animation__position="property: position; dir: alternate; dur: 1500; easing: easeInSine; loop: false; from:0 2.025 -1; to: 0 -2 -1; pauseEvents:pause-animation; delay: 39500" animation__scale="property: scale; dir: alternate; dur:500; easing: easeInSine; loop: 10; to: 1.2 1 1.2; pauseEvents:pause-animation; delay: 31500">
                 <a-gltf-model id="home" rotation="0 180 0" position="0 0.005 0" scale="0 0 0" src="#city" animation__scale2="property: scale; dir: alternate; del:500; easing: easeInSine; loop: false; to:0.0017 0.001 0.00081; pauseEvents:pause-animation; delay: 30500"></a-gltf-model>
                               </a-entity>

            </Entity>
        )
    }
}



export default LandingPhase2;