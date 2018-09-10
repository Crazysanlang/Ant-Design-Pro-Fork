let driverList = [
    {
        key:0,
        carNumber: "鲁D83860",
        weight:"46.0",
        carType:"仓栅式挂车",
        name:"枣庄市东顺汽车运输有限公司",
        phone:"13776791723",
        status:"空载",
        isUse:"1",
        operation:0
        
    },
    {
        key:1,
        carNumber: "鲁D83860",
        weight:"46.0",
        carType:"仓栅式挂车",
        name:"枣庄市东顺汽车运输有限公司",
        phone:"13776791723",
        status:"空载",
        isUse:"0",
        operation:1
        
    },
    {
        key:2,
        carNumber: "鲁D83860",
        weight:"46.0",
        carType:"仓栅式挂车",
        name:"枣庄市东顺汽车运输有限公司",
        phone:"13776791723",
        status:"空载",
        isUse:"1",
        operation:0
        
    },
    {
        key:3,
        carNumber: "鲁D83860",
        weight:"46.0",
        carType:"仓栅式挂车",
        name:"枣庄市东顺汽车运输有限公司",
        phone:"13776791723",
        status:"空载",
        isUse:"0",
        operation:1
        
    },
    {
        key:4,
        carNumber: "鲁D83860",
        weight:"46.0",
        carType:"仓栅式挂车",
        name:"枣庄市东顺汽车运输有限公司",
        phone:"13776791723",
        status:"空载",
        isUse:"1",
        operation:0
        
    }
]


function getDriverList(req,res){
    let paging = req.params.paging;
    let loadNumber= req.params.loadNumber;
    let list= [];
    return res.json(driverList)
}

export default {
    "POST /api/driverList":getDriverList
}