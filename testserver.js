const express=require("express");
const expressWs=require("express-ws");
const OwlWatchService=require("./owlwatch");

function main()
{
    const app=express();
    expressWs(app);

    var owlWatch=new OwlWatchService(app);
    owlWatch.inboundService("/owlinbound");
    owlWatch.updateService("/owlstatus");

    app.use(express.static(`${__dirname}/web`));

    app.listen(2001,()=>{
        console.log("express started");
    });
}

main();