const mongoose = require("mongoose");
let schema =new mongoose.Schema({
   content:{
     type:String,
     required:[true,"此内容为必填项"],
        unique:[true,"此内容不可重复"]
   },
    isDone:{
      type: Boolean,
      default:false
    },
    createTime:{
       type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model("todo",schema)
