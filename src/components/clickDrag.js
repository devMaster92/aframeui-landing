// Function to Click and Drag the Globe (DO NOT CHANGE)

const AFRAME = window.AFRAME;
const THREE = window.THREE;
var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;

AFRAME.registerComponent("drag-rotate-component", {
  schema: { speed: { default: 1 } },
  init: function() {
    this.ifMouseDown = false;
    document.addEventListener("mousedown", this.OnDocumentMouseDown.bind(this));
    document.addEventListener("mouseup", this.OnDocumentMouseUp.bind(this));
    document.addEventListener("mousemove", this.OnDocumentMouseMove.bind(this));
  },
  OnDocumentMouseDown: function(event) {
    this.ifMouseDown = true;
  },
  OnDocumentMouseUp: function() {
    this.ifMouseDown = false;
  },
  OnDocumentMouseMove: function(event) {
    if (timestamp === null) {
      timestamp = Date.now();
      lastMouseX = event.screenX;
      lastMouseY = event.screenY;
      return;
    }

    var now = Date.now();
    var dt = now - timestamp;
    var dx = event.screenX - lastMouseX;
    var dy = event.screenY - lastMouseY;
    var speedX = Math.round((dx / dt) * 100);
    var speedY = Math.round((dy / dt) * 100);

    timestamp = now;
    lastMouseX = event.screenX;
    lastMouseY = event.screenY;
    // console.log('speed', speedX, speedY)
    if (this.ifMouseDown) {
      var rot = this.el.getAttribute("rotation");
      // console.log("rotation", rot.x%360, rot.y%360, rot.z%360)

      var ob3d = this.el.object3D;
      // console.log('object', ob3d)

      if ((rot.y % 360 <= 90) & (rot.y % 360 >= -90)) {
        ob3d.rotateOnAxis(new THREE.Vector3(1, 0, 0), speedY / 5000);
      } else {
        ob3d.rotateOnAxis(new THREE.Vector3(1, 0, 0), -speedY / 5000);
      }
      if ((rot.x % 360 <= 90) & (rot.x % 360 >= -90)) {
        ob3d.rotateOnAxis(new THREE.Vector3(0, 1, 0), speedX / 5000);
      } else {
        ob3d.rotateOnAxis(new THREE.Vector3(0, 1, 0), -speedX / 5000);
      }
      // if (rot.x !== Infinity || rot.y !== Infinity) {
      //     this.el.setAttribute('rotation', rot)
      // }
    }
  }
});
