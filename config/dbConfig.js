const mongoose=require("mongoose");
require("dotenv").config();
const dburl=process.env.DBURL;
function dbConnection(){
    mongoose.connect(dburl).then(()=>{
        console.log("Database connected")
    }).catch(err=>{
        console.log('Database connection error',err)
    })
}
dbConnection()

module.export=dbConnection