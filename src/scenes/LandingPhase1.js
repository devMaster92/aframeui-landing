import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import zoom from '../components/Zoom.js'
// import allDescendants from '../components/ChangeOpacityAll.js'
// import Assets from '../components/Assets';
// import GlobalEvents from '../utils/global-events.js'

class LandingPhase1 extends Component {
    componentDidMount() {
        document.getElementById('myCam').setAttribute('position', { x: 4, y: 1.5, z: 0.8 })
        setTimeout(() => {
            zoom.zoom();
            // let el = document.getElementById('LandingPhase1')
            // allDescendants.allDescendants(el);
        }, 1000)



        // window.addEventListener('keydown', (event) => {
        //     console.log(event.keyCode, "is the keycode")
        // })

    }

    render() {
        return (
            <Entity id="LandingPhase1">
                <a-sky src='#sky' rotation='0 90 0' />
                {/* <a-gltf-model  id="human_model" position="2 0.8 -1.8" scale="0.05 0.05 0.05" rotation="0 25 0" src="#cowboy" ></a-gltf-model> */}
                <a-entity id="model_front" obj-model="obj: #model-obj; mtl: #model-mtl" rotation="0 25 0" position="4 0.8 -1.8"></a-entity>

                {/* <a-entity spawnpoint__human1="size:12;pattern:random;radius:3;origin:0 0 0;rate: 0;"></a-entity> */}
                {/* 
                <a-entity entity-generator="mixin: human1; num: 12"></a-entity>
                <a-entity entity-generator="mixin: human2; num: 12"></a-entity> */}


                {/* <a-entity id="house" scale="0.5 0.5 0.5" obj-model="obj: #house1-obj; mtl: #house1-mtl" rotation="0 180 0" position="0 0.01 0"></a-entity> */}
                {/* <a-gltf-model id='home1' scale="0.08 0.08 0.08" src="#city" rotation="0 180 0"position="0 0.01 0"></a-gltf-model> */}
                <a-gltf-model id="home_landing" rotation="0 180 0" position="0 0.01 0" scale="0.08 0.08 0.08" src="#city" ></a-gltf-model>



            </Entity>
        );
    }
}

export default LandingPhase1;