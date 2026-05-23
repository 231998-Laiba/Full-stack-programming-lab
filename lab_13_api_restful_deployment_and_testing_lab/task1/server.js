const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

console.log("API KEY:", process.env.API_KEY);

const app = express();

app.use(express.json());

const weatherRoutes=require("./routes/weatherRoutes");

app.use("/api/weather",weatherRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log(`Server running on ${PORT}`);

});