const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/apiKey').DB;
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const uRoute = require('./routes/userRoutes');
const eRoute = require('./routes/eventRoutes')
app.use(express.urlencoded()); 
app.use(express.json()); 
app.use(cors());

mongoose.connect(db,{ useUnifiedTopology: true , useNewUrlParser: true}, ()=>console.log('connected'));

app.use('/users',uRoute);
app.use('/events',eRoute);
app.listen(port);