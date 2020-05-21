const osu=require("node-os-utils");
const WebSocket=require("ws");

const owlWatchConnection=new WebSocket("ws://fox:2000/watch");

async function main()
{
    setInterval(async ()=>{
        var usage=await Promise.all([
            osu.cpu.usage(),
            osu.mem.used()
        ]);

        var message={
            name:osu.os.hostname(),
            cpu:usage[0],
            mem:usage[1],
            time:new Date().toLocaleString()
        };

        owlWatchConnection.send(JSON.stringify(message));
    },2000);
}

owlWatchConnection.on("open",()=>{
    main();
    console.log("owl flying...");
});