import express from 'express';
import User from '../models/user.js';
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';

//This should eventually be imported from elsewhere:
const jwtSecret= "pt_myJwtSecret";

const router = express.Router();

// @route  => GET api/users
// @desc   => Register a new user
// @access => Public
router.post('/', (req, res) => {
    //Data for registration comes in through the request
    const {name, email, password} = req.body;

    //Verify that everything is included
    if (!name || !password || !email){
        return res.status(400).json({msg: "Please enter all fields"});
    }

    //Check if the email is already in use
    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: "Email already in use"})

            //Otherwise create a new user
            const newUser = new User({
                name,
                email,
                password
            });

            //Hash the password for the user for security
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;

                    //Save the new user
                    newUser.save().then(user => {
                        //Create JSON Web Token Payload, secret, and expiration time
                        jwt.sign({id: user.id}, jwtSecret, {expiresIn: 3600},
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    //Respond with the user and token
                                    token: token,
                                    user:{
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            });

                        
                    });
                })
            })
        })
});

export default router;