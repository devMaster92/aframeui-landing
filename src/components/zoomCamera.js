import GlobalEvents from '../utils/global-events.js';
const AFRAME = window.AFRAME;


AFRAME.registerComponent('change-on-zoom', {

  init: function () {
    const self = this;
    window.addEventListener("wheel", event => {
      const delta = Math.sign(event.wheelDelta);
      //getting the mouse wheel change (120 or -120 and normalizing it to 1 or -1)
      var mycam = self.el.getAttribute('camera');
      var finalZoom = self.el.getAttribute('camera').zoom + delta / 20;
      //limiting the zoom so it doesnt zoom too much in or out
      if (finalZoom < 0.5)
        finalZoom = 0.5;
      if (finalZoom > 1.8)
        finalZoom = 1.8;

      mycam.zoom = finalZoom;
      // console.log('zoom value', mycam.zoom)
      //setting the camera element
      self.el.setAttribute('camera', mycam);
      GlobalEvents.trigger('cameraZoom', mycam.zoom);
    });
  }
});

