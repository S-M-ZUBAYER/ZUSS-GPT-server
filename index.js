const { response } = require("express");
const express=require("express");
const cors=require("cors");
require("dotenv").config();
const port=process.env.PORT || 5000;


const app=express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("I am running as the server site of ZUSS GPT");
});

const  { Configuration, OpenAIApi }= require ("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    
});
const openai = new OpenAIApi(configuration);

app.post("/chat",(req,res)=>{
    const  question =req.body.question;
 
    openai.createCompletion({
     model: "text-davinci-003",
     prompt: question,
     max_tokens: 1000,
     temperature: 0,
   }).then((response)=>{
     console.log(response?.choices?.[0]?.text);
     return response?.data?.choices?.[0]?.text;
 })
 .then((answer)=>{
     console.log({answer});
     const array=answer?.split("\n").filter((value)=>value).map((value)=>value.trim());
     return array;
 })
 .then((answer)=>{
     res.json({
         answer: answer,
         prompt: question
     })
 })
 

 });



app.listen(port,()=>{
    console.log(`Listening to the ${port}`)
});