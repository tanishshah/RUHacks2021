const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    trigger:{
        type:String,
        required: true
    },
    user:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    }
},
{collection: "system_event"});

system_event = mongoose.model('system_event',eventSchema);
module.exports = system_event;