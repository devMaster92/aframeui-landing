// Aframe assets library (DO NOT CHANGE)

import React, { Component } from "react";
import GlobalEvents from "../utils/global-events";
// import { Entity } from "aframe-react";

class Assets extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    document.getElementById("city").addEventListener("loaded", function() {
      GlobalEvents.trigger("cityloaded");
    });
  }

  render() {
    return (
      <a-assets>
        <a-asset-item id='model-obj' src='model.obj' />
        <a-asset-item id='model-mtl' src='model.mtl' />

        {/* <a-asset-item id="house1-obj" src="city/Street environment_V01.obj" />
                <a-asset-item id="house1-mtl" src="city/Street environment_V01.mtl" /> */}
        {/* <img id="starfield" alt="starfield" rotation="0 90 0" src="starfield.jpg" /> */}

        <img id='sky' alt='sky' src='clouds.jpg' />
        {/* <img id="world" alt="world" src="world.png" /> */}
        <img id='wooden' alt='wooden' src='wooden.jpeg' />

        {/* <img id="TX" alt="TX" src="TX.svg" /> */}
        <a-asset-item id='world' alt='world' src='world.glb' />
        <a-asset-item id='Texas' alt='Texas' src='Texas.glb' />
        <a-asset-item id='city' alt='city' src='city.glb' />
        <a-asset-item id='cowboy' alt='cowboy' src='cowboy.glb' />

        <a-asset-item id='human' alt='human' src='human.gltf' />
        {/* <a-asset-item id="world" alt="world" src="world.glb" /> */}

        {/* <a-mixin id="light"
                    geometry="primitive: box"
                    material="color: #EEE; shader: flat"
                    light="color: #DDDDFF; distance: 120; intensity: 1; decay:2; type: point"></a-mixin> */}

        {/* <a-mixin id="human1" gltf-model="#human" random-position="min: -19 0.8 -2.4; max: 19 0.8 2.4" random-rotation="min: 0 0 0; max: 0 360 0"></a-mixin>
                <a-mixin id="human2" gltf-model="#human" random-position="min: -2.4 0.8 -19; max: 2.4 0.8 19" random-rotation="min: 0 0 0; max: 0 360 0"></a-mixin> */}
        <a-mixin id='human1' gltf-model='#human' />

        <img id='earthbump' alt='earthbump' src='earthbump1k.jpg' />
        {/* <img id="earthcloudmap" alt = "earthcloudmap" src="earthcloudmap.jpg"/> */}
        <img id='earthspec' alt='earthspec' src='earthspec1k.jpg' />
        <img id='earthmap' alt='earthmap' src='earthmap1k.jpg' />
        <img id='reset' alt='reset' src='reset.png' />

        {/* <img id="earthlights" alt = "earthlights" src="earthlights1k.jpg"/> */}
        {/* <img id="earthcloudmaptrans" alt = "earthcloudmaptrans" src="earthcloudmaptrans.jpg"/> */}

        {/* <a-mixin id="us_states" geometry={`primitive:plane; width:0.7; height:0.35`} rotation="0 0 0" position="0 1.6 -0.62" /> */}

        {/* <img id="USA" alt="USA" src="US_States_png/USA.png" />
                     
                <img id="WA" alt="WA" src="US_States_png/WA.png"/>
                <img id="OR" alt="OR" src="US_States_png/OR.png"/>
                <img id="CA" alt="CA" src="US_States_png/CA.png"/>
                <img id="NV" alt="NV" src="US_States_png/NV.png"/>
                <img id="ID" alt="ID" src="US_States_png/ID.png"/>
                <img id="MT" alt="MT" src="US_States_png/MT.png"/>
                <img id="WY" alt="WY" src="US_States_png/WY.png"/>
                <img id="UT" alt="UT" src="US_States_png/UT.png"/>
                <img id="AZ" alt="AZ" src="US_States_png/AZ.png"/>
                <img id="ND" alt="ND" src="US_States_png/ND.png"/>
                <img id="SD" alt="SD" src="US_States_png/SD.png"/>
                <img id="NE" alt="NE" src="US_States_png/NE.png"/>
                <img id="CO" alt="CO" src="US_States_png/CO.png"/>
                <img id="NM" alt="NM" src="US_States_png/NM.png"/>
                <img id="TX" alt="TX" src="US_States_png/TX.png"/>
                <img id="OK" alt="OK" src="US_States_png/OK.png"/>
                <img id="LA" alt="LA" src="US_States_png/LA.png"/>
                <img id="AR" alt="AR" src="US_States_png/AR.png"/>
                <img id="MO" alt="MO" src="US_States_png/MO.png"/>
                <img id="IA" alt="IA" src="US_States_png/IA.png"/>
                <img id="MN" alt="MN" src="US_States_png/MN.png"/>
                <img id="WI" alt="WI" src="US_States_png/WI.png"/>
                <img id="IL" alt="IL" src="US_States_png/IL.png"/>
                <img id="MS" alt="MS" src="US_States_png/MS.png"/>
                <img id="MI" alt="MI" src="US_States_png/MI.png"/>
                <img id="IN" alt="IN" src="US_States_png/IN.png"/>
                <img id="KY" alt="KY" src="US_States_png/KY.png"/>
                <img id="KS" alt="KS" src="US_States_png/KS.png"/>
                <img id="TN" alt="TN" src="US_States_png/TN.png"/>
                <img id="AL" alt="AL" src="US_States_png/AL.png"/>
                <img id="OH" alt="OH" src="US_States_png/OH.png"/>
                <img id="NY" alt="NY" src="US_States_png/NY.png"/>
                <img id="PA" alt="PA" src="US_States_png/PA.png"/>
                <img id="WV" alt="WV" src="US_States_png/WV.png"/>
                <img id="VA" alt="VA" src="US_States_png/VA.png"/>
                <img id="NC" alt="NC" src="US_States_png/NC.png"/>
                <img id="SC" alt="SC" src="US_States_png/SC.png"/>
                <img id="GA" alt="GA" src="US_States_png/GA.png"/>
                <img id="FL" alt="FL" src="US_States_png/FL.png"/>
                <img id="ME" alt="ME" src="US_States_png/ME.png"/>
                <img id="VT" alt="VT" src="US_States_png/VT.png"/>
                <img id="NH" alt="NH" src="US_States_png/NH.png"/>
                <img id="MA" alt="MA" src="US_States_png/MA.png"/>
                <img id="CT" alt="CT" src="US_States_png/CT.png"/>
                <img id="RI" alt="RI" src="US_States_png/RI.png"/>
                <img id="DE" alt="DE" src="US_States_png/DE.png"/>
                <img id="NJ" alt="NJ" src="US_States_png/NJ.png"/>
                <img id="MD" alt="MD" src="US_States_png/MD.png"/>
                <img id="AK" alt="AK" src="US_States_png/AK.png"/>
                <img id="HI" alt="HI" src="US_States_png/HI.png"/> */}
      </a-assets>
    );
  }
}

export default Assets;
