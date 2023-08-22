const   mongoose  = require("mongoose");

const UserSchema=new mongoose.Schema({
   uname:String,
   email:String,
   password:String,
   is_admin:{
    type:Boolean,
    default:false
   }
},{
    timestamps:true
})

const User=mongoose.model("User",UserSchema);
module.exports=User;