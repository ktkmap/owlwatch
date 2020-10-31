import si from "systeminformation";

function main()
{
    getOwlStats();
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

main();