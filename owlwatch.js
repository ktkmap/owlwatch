const WebSocket=require("ws");

var masterOwlStates={};

function main()
{
    var owlWatchServer=new WebSocket.Server({port:2000});
    console.log("watching for owls...");

    owlWatchServer.on("connection",(owlConnection)=>{
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
    },2000);
}

main();