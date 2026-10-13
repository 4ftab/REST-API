const studentroute=require("./routes/studentroute");
const db=require("./config/db");
const express=require("express");
const app= express();

app.use(express.json());
app.use("/api",studentroute);
app.get("/",(req,res)=>{
    res.send("Student CRUD Api is running");
});
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})