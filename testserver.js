const express=require("express");
const expressWs=require("express-ws");

function main()
{
    const app=express();
    expressWs(app);

    app.use(express.static(`${__dirname}/web`));

    app.listen(2001,()=>{
        console.log("express started");
    });
}

main();