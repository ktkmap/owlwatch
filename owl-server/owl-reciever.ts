// the current owl stats. key is hostname
var _currentOwls:Record<string,OwlStats>={};

// update current owl stats
export function updateOwl(stats:OwlStats):void
{
    _currentOwls[stats.hostname]=stats;
    console.log(_currentOwls);
}