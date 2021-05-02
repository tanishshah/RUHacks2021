const express = require('express');
const uRouter = express.Router();
const User = require('../models/userModel');

uRouter.get('/', (req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({sucess: false}));
});

uRouter.delete('/:id', (req,res) =>{
    User.findById(req.params.id)
        .then(users =>users.remove().then(()=>res.json({success: true})))
        .catch(err => res.status(404).json({sucess: false}));
})

uRouter.put('/:id', (req,res) =>{
    User.findById(req.params.id)
        .then(users =>users.update(req.body).then(()=>res.json({success: true})))
        .catch(err => res.status(404).json({sucess: false}));
});
module.exports = uRouter;