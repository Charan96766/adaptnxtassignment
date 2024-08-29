const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();
app.use(cors()); 

dotenv.config(); 

app.listen(process.env.port, () => {
    console.log(`listening to port ${process.env.port}`);
}); 

app.get("/climate", async (req, res) => {   
    const city = req.query.city;
    const options = {  
        
        method: 'GET',
        url: 'https://api.weatherstack.com/current',
        params: {
          access_key: process.env.accesskey, 
          query: city,
        }
      };
      
      try {
        const response = await axios.request(options);
          console.log(response.data); 
          res.json({ data: response.data, msg: "data fetched successfully" });
      } catch (error) {
          console.error(error); 
          res.json({ status: "failure", msg: "unable to fetch data" });
      }
});


