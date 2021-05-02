const express = require('express');
const eRouter = express.Router();
const system_event = require('../models/eventModel');

eRouter.get('/', (req,res) => {
    system_event.find()
        .then(events => res.json(events))
        .catch(err => res.status(404).json({sucess: false}));
});

module.exports = eRouter;