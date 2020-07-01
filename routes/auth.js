import express from 'express';
import User from '../models/user.js';
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/authMiddleware.js'

//This should eventually be imported from elsewhere:
const jwtSecret= "pt_myJwtSecret";

const router = express.Router();

// @route  => POST api/auth
// @desc   => Authenticate the user given email and password
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

// @route  => GET api/auth/user
// @desc   => Get user data from token
// @access => Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password') //Disregard the password
        .then(user => res.json(user));
})


export default router;