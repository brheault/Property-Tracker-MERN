import express from 'express';
import User from '../models/user.js';
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';

//This should eventually be imported from elsewhere:
const jwtSecret= "pt_myJwtSecret";

const router = express.Router();

// @route  => GET api/auth
// @desc   => Authenticate the user
// @access => Public
router.post('/', (req, res) => {
    //Data for registration comes in through the request
    const {email, password} = req.body;

    //Verify that everything is included
    if (!password || !email){
        return res.status(400).json({msg: "Please enter all fields"});
    }

    //Make sure the user exists
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: "User does not exist"});

            //Validate the password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    //If passwords don't match, send a 400 response
                    if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

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
                })
           
        });
});

export default router;