import express from "express";
import expressWs from "express-ws";
import ws from "ws";

import {updateOwl} from "./owl-reciever";

const {app}=expressWs(express());

// --- apis ---
// inbound point to recieve stats from owls
app.ws("/owl-inbound",(connection:ws)=>{
    console.log("owl connected");

    connection.on("message",(message:string)=>{
        updateOwl(JSON.parse(message) as OwlStats);
    });

    connection.on("close",()=>{
        console.log("owl disconnected");
    });
});
// --- END apis ---

app.listen(2001,()=>{
    console.log("owl server watching...");
});