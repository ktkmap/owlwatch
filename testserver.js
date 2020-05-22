const express=require("express");
const expressWs=require("express-ws");
const {owlWatchService,owlUpdatesService}=require("./owlwatch");

function main()
{
    const app=express();
    expressWs(app);

    owlWatchService(app,"/owlinbound");
    owlUpdatesService(app,"/owlstatus");

    app.use(express.static(`${__dirname}/web`));

    app.listen(2001,()=>{
        console.log("express started");
    });
}

main();