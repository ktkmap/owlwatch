interface OwlStats
{
    hostname:string
    uptime:number //seconds

    cpuLoad:number //percent out of 100

    memory:{
        used:number //bytes
        total:number //bytes
    }
}