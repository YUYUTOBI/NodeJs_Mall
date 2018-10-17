const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/newys",{ useNewUrlParser: true })
let mdb = mongoose.connection;
mdb.on("error",err=>{
    if(err){
        throw err
    }
})
mdb.once("open",()=>{
    console.log("mongodb连接成功")
})
