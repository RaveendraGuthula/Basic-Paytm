const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const userRoute=require("./Routes/index.js");
const cors=require("cors");

app.use(cors({}));
app.use(bodyParser.json());
app.use("/api/v1",userRoute);

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})






// const {User} =require( "./db.js");
//  const aa = async()=>{
// await User.create({
//     username:"Raveendra",
//     password:"fjfjfj",
   
// })
// return "done";
//  }
// console.log(aa());