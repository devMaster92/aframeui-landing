// import GlobalEvents from '../utils/global-events.js';

function zoom() {
    var des_height = 11.5;
    var delta = 0.05;

    // clearInterval(cam_interval);
    var promise1 = new Promise(function (reseolve, reject) {
        window.cam_interval = setInterval(() => {
            let mycam_pos = document.getElementById('myCam').getAttribute('position')
            let y_diff = (des_height) - mycam_pos.y;
            let x_diff = (0) - mycam_pos.x;

            let delta_x = Math.sign(x_diff) * delta;
            let delta_y = Math.sign(y_diff) * delta;

            mycam_pos.x = mycam_pos.x + delta_x;
            mycam_pos.y = mycam_pos.y + delta_y;
            mycam_pos.z = mycam_pos.z + delta_y * 2;
            // console.log('mycam_desired_pos', mycam_pos)
            document.getElementById('myCam').setAttribute('position', mycam_pos)
            if (Math.abs(y_diff) <= 0.01) {
                reseolve('success')
                clearInterval(window.cam_interval);
            }
        }, 80);


    })

    promise1.then(function (value) {

        // console.log("done")
        var phase2event = new CustomEvent('phase2trigger');

        setTimeout(() => {
            // console.log('dispatching event')
            // document.getElementById('myCam').setAttribute('rotation', { x: 0, y: 0, z: 0 })

            document.body.dispatchEvent(phase2event);
        }, 100)

        // GlobalEvents.trigger("phase2trigger");
        // console.log('done 2 crawl')
        return ("done")
    })


}

export default {
    zoom: zoom
}
