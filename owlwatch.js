const masterOwlStates={};

class OwlWatchService
{
    constructor(app)
    {
        this.app=app;

        this.masterOwlStates={};

        this.updateClientConnectionsId=0;
        this.updateClients={};
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

        setInterval(()=>{
            console.log(this.masterOwlStates);
        },3000);
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

        setInterval(()=>{
            console.log("clients",Object.keys(this.updateClients));
        },3000);
    }
}

module.exports=OwlWatchService;