import si from "systeminformation";
import ws from "ws";
import NanoTimer from "nanotimer";

// uri to send updates to
const _owlWatchUrl:string="ws://localhost:2001/owl-inbound";

function main()
{
    const owlWatchConnection=new ws(_owlWatchUrl);

    var timer=new NanoTimer();
    timer.setInterval(async ()=>{
        var stats:OwlStats=await getOwlStats();
        broadcastOwlStats(owlWatchConnection,stats);
    },"","3s");

    console.log("owl flying...");
}

// return owl stats of the current computer
async function getOwlStats():Promise<OwlStats>
{
    var memInfo:si.Systeminformation.MemData;
    var loadInfo:si.Systeminformation.CurrentLoadData;
    var osInfo:si.Systeminformation.OsData;

    var [memInfo,loadInfo,osInfo]=await Promise.all([
        si.mem(),
        si.currentLoad(),
        si.osInfo()
    ]);

    return {
        hostname:osInfo.hostname,
        uptime:parseInt(si.time().uptime),
        cpuLoad:loadInfo.currentload,
        memory:{
            used:memInfo.used,
            total:memInfo.total
        }
    };
}

// send stats to a connection
function broadcastOwlStats(connection:ws,stats:OwlStats):void
{
    connection.send(JSON.stringify(stats));
}

main();