import React, { Component } from "react";
import { Entity } from "aframe-react";
import GlobalEvents from "../utils/global-events";
import Billboard from "../components/Billboard";
const THREE = window.THREE;

function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

class Globeview extends Component {
  constructor() {
    super();
    this.state = {
      zoom_value: 1
    };
  }
  setZoom(zoom_value) {
    // console.log('zoom value in country view',zoom_value)
    this.setState({
      zoom_value: zoom_value
    });
  }

  componentDidMount() {
    // let phs1 = document.getElementById('LandingPhase2');
    // phs1.parentNode.removeChild(phs1)
    // let phs2 = document.getElementById('CrawlText');
    // phs2.parentNode.removeChild(phs2)
    // let phs3 = document.getElementById('skipicon');
    // phs3.parentNode.removeChild(phs3)
    // setTimeout(() => {
    //     var el = document.getElementById('myCam')
    //     var lc = el.getAttribute('look-controls')
    //     lc.enabled = false;
    // }, 1000)
    document
      .getElementById("myCam")
      .setAttribute("position", { x: 0, y: 1.6, z: 0 });
    GlobalEvents.on("cameraZoom", this.setZoom.bind(this));
    var spher = document.querySelector("#globeB");

    setTimeout(() => {
      var spherMesh = spher.getObject3D("mesh");
      // console.log(spherMesh, "sphere mesh")
      var material = new THREE.MeshPhongMaterial();
      material.map = THREE.ImageUtils.loadTexture("./earthmap1k.jpg");
      material.bumpMap = THREE.ImageUtils.loadTexture("./earthbump1k.jpg");
      material.bumpScale = 0.2;
      material.shininess = 10;
      material.specularMap = THREE.ImageUtils.loadTexture("./earthspeck1k.png");
      material.specular = new THREE.Color("grey");
      spherMesh.material = material;
    }, 2000);
  }

  render() {
    let globe_opacity = convertRange(this.state.zoom_value, [1, 1.8], [1, 0]);
    return (
      <Entity id='Globeview'>
        <a-entity
          id='globeB'
          drag-rotate-component
          position='0 1.5 -3'
          rotation='36.5 4.5 0'
          geometry='primitive: sphere; radius: 2;segmentsHeight:100'
          material={`src:#earthmap;opacity:${globe_opacity}`}
        >
          <Billboard
            id='USA'
            value='USA'
            position='-0.3042 1.38705 1.41711'
            rotation='-43.01136872267577 -4.845504073421372 1.3527533543038737'
          />
          <Billboard
            id='UK'
            value='UK'
            position='1.20114 1.61215 0.06979'
            rotation='-55.92698334051479 93.17038593960856 2.7467596698571666'
          />
          <Billboard
            id='AUS'
            value='AUS'
            position='-1.27437 -0.78299 -1.33334'
            rotation='25.238790875512763 -136.79596541866457 178.13429737955835'
          />
          <Billboard
            id='IND'
            value='IND'
            position='0.41145 0.72186 -1.84481'
            rotation='-25.516102448356083 159.94804400431087 -0.9081381052823548'
          />
          <Billboard
            id='CHN'
            value='CHN'
            position='-0.15737 1.58778 -1.21889'
            rotation='-48.479677919404345 -170.1031479652096 -8.476337621165397'
          />
        </a-entity>
      </Entity>
    );
  }
}

export default Globeview;
