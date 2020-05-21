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
            console.log(masterOwlStates);
        });

        owlConnection.on("close",()=>{
            console.log("owl disconnected");
        });
    });
}

main();