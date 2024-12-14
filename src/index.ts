import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const app = express();
dotenv.config();

app.use(express.json());
app.get("/",function (req,res){
    res.json({
        msg: "You've reached here successfully"
    })
})
app.post("/api/v1/signup",function (req,res){
   
})
app.post("/api/v1/signin",function (req,res){

})
app.post("/api/v1/content",function (req,res){

})
app.get("/api/v1/content",function(req,res){

})
app.delete("/api/v1/content",function (req,res){

})
app.listen(3000)