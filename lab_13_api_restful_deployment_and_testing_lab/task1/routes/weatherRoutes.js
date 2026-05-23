const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/test", (req,res)=>{

res.json({
message:"Weather route working"
});

});

router.get("/:city", async (req,res)=>{

try{

const city=req.params.city;
const apiKey=process.env.API_KEY;

const response=await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

res.json({

city:response.data.name,
temperature:response.data.main.temp,
condition:response.data.weather[0].main,
humidity:response.data.main.humidity

});

}catch(error){

console.log(error.response?.data || error.message);

res.status(404).json({
message:"City not found or API error"
});

}

});

module.exports=router;