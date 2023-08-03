const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../Middleware/fetchuser');

// default secret maessage
const JWT_secret = "palak1998@";


/******************ROUTE-1:CREATE USER USING POST: "api/auth/CreateUser" ****************/

// ? VALIDATION CHECKS IN DATABASE FROM USER :
router.post('/createUser',
    [body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email address').isEmail(),
    body('password', 'password must be at-least 6 characters').isLength({ min: 6 })],
    async (req, res) => {

        let success = false;
// ! If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success,
                errors: errors.array()
            })
        }

//?  TRY AND CATCH IS USED FOR ERROR DETECTION AND RESOLVE :
//? TRY ALREADY EXISTS EMAIL IN DATABASE USING FINDONE FUNCTION IN JAVASCRIPT AND THEN CATCH
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    success,
                    error: "Same User with this email is already exists"
                })
            }

//? ADDING SALT USING BCRYPTJS:      
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);


//? CREATING USER SCHEMA IN DATABSASE:            
            user = await User.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
            })

            const data = {
                user: {
                    id: user.id,
                }
            }
            const authToken = jwt.sign(data, JWT_secret);
            // console.log(data);


            //respone return as user:
            // res.json(user);
            success = true;
//?  RESPONSE RETURN AS A AUTHTOKEN:
            res.json({ success, authToken })


//? CATCHING ERROR USING ERROR.MESSAGE AND SET DEAFULT STATUS (500) WITH DAFUALT MESSAGE:          
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }
    })

//******************ROUTE-2:CREATE USER USING POST: "api/auth/login" ****************//
router.post('/login',
    [
        body('email', 'enter a valid email address').isEmail(),
        body('password', 'Passwaord cannot be empty').exists(),
    ]
    , async (req, res) => {

        let success = false;
// ! If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { email, password } = req.body;

// ? COMPARING USER EMAIL FROM  INPUT EMAIL & SEND ERROR STATUS IF NOT MATCHED
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }

//? COMPARING USER PASSWORD FROM  INPUT PASSWORD & SEND ERROR STATUS IF NOT MATCHED
            const passwordComapre = await bcrypt.compare(password, user.password);
            if (!passwordComapre) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }


            const data = {
                user: {
                    id: user.id,
                }
            }
            const authToken = jwt.sign(data, JWT_secret);
            success = true;
            res.json({ success, authToken });


// ? CATCHING ERROR USING ERROR.MESSAGE AND SET DEAFULT STATUS (500) WITH DAFUALT MESSAGE:              
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }

    })

//******************ROUTE-3: GET THE USER FROM JWT-TOKEN: "api/auth/getuser" ****************//
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({ user });
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})

//?  EXPORTING MODULE:
module.exports = router;