const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect("mongodb+srv://jay2404thakkar:B6g9fnlp0kmOaRtg@cluster0.a7mvmbr.mongodb.net/").then(() => 
{
    console.log(`Connection Successful`);
}).catch((err)=> console.log(err));