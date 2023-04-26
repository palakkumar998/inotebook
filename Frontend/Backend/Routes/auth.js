const express = require('express');
const User = require('../Models/User');
const router = express.Router();
// IMPORTING EXPRESS VALIDATOR USING DESTRUCTURING :
const { body, validationResult } = require('express-validator');

router.post('/createUser',
//VALIDATION CHECKS IN DATABASE FROM USER :
    [body('name', 'enter a valid name').isLength({ min: 3 }), 
    body('email', 'enter a valid email address').isEmail(),
    body('password', 'password must be at-least 6 characters').isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }   
// TRY AND CATCH IS USED FOR ERROR DETECTION AND RESOLVE :
// TRY ALREADY EXISTS EMAIL IN DATABASE USING FINDONE FUNCTION IN JAVASCRIPT AND THEN CATCH
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    error: "Same User with this email is already exists"
                })
            }
//CREATING USER SCHEMA IN DATABSASE:            
            user =  await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            })

//respone return as user:
            res.json(user);
// CATCHING ERROR USING ERROR.MESSAGE AND SET DEAFULT STATUS (500) WITH DAFUALT MESSAGE:          
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error has occured pls check")
        }
    })
// EXPORTING MODULE:
module.exports = router;