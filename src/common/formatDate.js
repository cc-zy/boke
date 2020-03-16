
exports.Timecha=function(){ //返回当时 时间到24小时的时间差
    var Date1=new Date();
    var Date2=new Date();
    Date2.setHours(23);
    Date2.setMinutes(59);
    Date2.setSeconds(59);

    return Date2.getTime()-Date1.getTime()
}




