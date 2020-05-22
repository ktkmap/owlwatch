const masterOwlStates={};

// websocket endpoint listening for incoming owl status messages
function owlWatchService(app,path)
{
    console.log("watching for owls...");

    app.ws(path,(owlConnection)=>{
        console.log("owl connected");

        owlConnection.on("message",(message)=>{
            message=JSON.parse(message);
            masterOwlStates[message.name]=message;
        });

        owlConnection.on("close",()=>{
            console.log("owl disconnected");
        });
    });

    setInterval(()=>{
        console.log(masterOwlStates);
    },2500);
}

// service that provides continuous owl state updates to connected clients
function owlUpdatesService(app,path)
{
    app.ws(path,(owlWatcher)=>{
        console.log("owl watcher connected");
    });
}

module.exports={
    owlWatchService,
    owlUpdatesService
};