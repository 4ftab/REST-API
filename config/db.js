const mysql=require("mysql2");
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"students"
});
db.connect((err)=>{
    if(err){
        console.log("Error connecting database",err);
    }
    else{
        console.log("Connection Successfull");
    }
})
module.exports=db;