const NanoTimer=require("nanotimer");

class OwlWatchService
{
    constructor(app)
    {
        this.app=app;

        this.masterOwlStates={};

        this.updateClientConnectionsId=0;
        this.updateClients={};

        this.heartbeat();
    }

    // websocket service listening for inbound status updates from owls
    inboundService(path)
    {
        console.log("watching for owls...");

        this.app.ws(path,(owlConnection)=>{
            console.log("owl connected");

            owlConnection.on("message",(message)=>{
                message=JSON.parse(message);
                this.masterOwlStates[message.name]=message;
            });

            owlConnection.on("close",()=>{
                console.log("owl disconnected");
            });
        });
    }

    // websocket outbound service broadcasting owl master state
    updateService(path)
    {
        this.app.ws(path,(owlWatcher)=>{
            console.log("owl watcher connected");

            var clientid=++this.updateClientConnectionsId;
            this.updateClients[clientid]=owlWatcher;

            owlWatcher.on("close",()=>{
                console.log("owl watcher closed");
                delete this.updateClients[clientid];
            });
        });
    }

    heartbeat()
    {
        var timer=new NanoTimer();
        timer.setInterval(()=>{
            console.log("status",this.masterOwlStates);
            console.log("clients",Object.keys(this.updateClients));
        },"","3s");
    }
}

module.exports=OwlWatchService;