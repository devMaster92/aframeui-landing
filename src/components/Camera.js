// Camera Component for Aframe (DO NOT CHANGE)

import React, { Component } from "react";
import { Entity } from "aframe-react";

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 }
    };
  }

  parser({ x, y, z }) {
    return `${x} ${y} ${z}`;
  }

  render() {
    const needMouseControls = !window.AFRAME.utils.device.checkHeadsetConnected();
    let controller;
    if (needMouseControls) {
      controller = <Entity cursor='rayOrigin:mouse' mixin='mousePointer' />;
    } else {
      controller = (
        <Entity>
          <Entity id='rhand' mixin='controller-right' />
          <Entity id='lhand' mixin='controller-left' />
        </Entity>
      );
    }
    return (
      <Entity id={"myCam"}>
        <Entity
          ref='camera'
          primitive='a-camera'
          capture-mouse={needMouseControls}
          wasd-controls='enabled:false'
          look-controls='enabled: false'
        >
          {controller}
        </Entity>
      </Entity>
    );
  }
}

export default Camera;
