const io = require('socket.io-client');
const config = require('../utils/config')

let socket = null;

function connectSocket(connectCallBack, disconnectCallBack) {
    if (socket === null) {
        // socket = io.connect(config.sockets.simulationSocket.url)
        socket = io.connect(config.sockets.simulationSocket.url,config.sockets.simulationSocket.options)
        socket.on("connect", (connectCallBack ? connectCallBack : () => {
            console.log("Simulation socket connected");
            sessionStorage.setItem('socketStatus',true)
        }));
        socket.on("disconnect", (disconnectCallBack ? disconnectCallBack : () => {
            console.error("Simulation socket disconnected");
            sessionStorage.setItem('socketStatus',false)

        }));
        socket.on('error', function (err) {
            console.log("Error: " + err);
        })
    }
}

function startSimualation(jsonObject) {
    socket.emit('trigger muflow', jsonObject);
}

function disconnectSocket() {
    // stompClient.disconnect(() => {
    //     stompClient = null;
    // });
    socket.close();
}

// function getData() {
// // let Simulation_Data = null;
//  let SimDatapromise=  new Promise(function(resolve,reject){
//         socket.on('simulation data', function(data){
//             resolve(data)
//         })
//     })
// SimDatapromise.then((data)=>{
//     return(data);
// })

// }

function emitData(event, msg) {
    socket.emit(event, msg);
}

function subscribeToNamespace(namespace, callback) {
    // stompClient.subscribe(namespace, callback);
    socket.on(namespace, callback);
    socket.emit("join_room", namespace);
}

function unsubscribeToNamespace(namespace, callback) {
    socket.off(namespace,callback)
}

function emitZipData(event,msg){
    socket.emit(event,msg);
}

export { connectSocket, startSimualation, disconnectSocket, subscribeToNamespace, emitData, unsubscribeToNamespace, emitZipData};