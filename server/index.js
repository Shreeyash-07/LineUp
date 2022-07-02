require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const schedule = require('node-schedule')
const cors = require('cors')
// routes

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express();
app.use(cors())
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI,{
    useNewUrlParser    : true,
    useUnifiedTopology : true,
})
.then(()=>{
    console.log('Connected To MongoDB');
})
.catch((err)=>{
    console.log('Connection failed with: '+err);
})


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',adminRoutes);
app.use('/',userRoutes);
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
})

app.listen(PORT,function(){
    console.log(`listening to ${PORT}`);
});
