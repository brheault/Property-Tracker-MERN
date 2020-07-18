import express from 'express';
import User from '../models/user.js';
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';
import Property from "../models/property.js";
import auth from '../middleware/authMiddleware.js';
import mongoose from 'mongoose';

//This should eventually be imported from elsewhere:
const jwtSecret= "pt_myJwtSecret";


const router = express.Router();

// @route  => POST api/users
// @desc   => Register a new user
// @access => Public
router.post('/', (req, res) => {
    //Data for registration comes in through the request
    const {name, email, password} = req.body;

    //Verify that everything is included
    if (!name || !password || !email){
        console.log("Not all information given");
        return res.status(400).json({msg: "Please enter all fields"});
    }

    //Check if the email is already in use
    User.findOne({email})
        .then(user => {
            if (user) return res.status(400).json({msg: "Email already in use"})

            //Otherwise, create a new user
            const newUser = new User({
                name,
                email,
                password
            });

            //Hash the password for security
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    //How we have the hash
                    if(err) throw err;
                    newUser.password = hash;

                    //Save the new user
                    newUser.save().then(user => {
                        //Create JSON Web Token Payload, secret, and expiration time
                        jwt.sign(
                            {id: user.id}, 
                            jwtSecret, 
                            {expiresIn: 3600},
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


/*********************************
 ********** Properties ***********
 *********************************/
// @route  => GET api/users/properties
// @desc   => Returns ALL properties of all users (For development only)
// @access => Public
// router.get('/properties', (req, res) => {
//     Property.find()
//         .sort({ dateAdded: -1 })
//         .then(properties => res.json(properties))
// });

// @route  => GET api/users/properties/<id>
// @desc   => Returns the properties of a user given their ID
// @access => Private
router.get('/properties/:id', (req, res) => {
    Property.find({userId: req.params.id})
        .sort({ dateAdded: -1 })
        .then(properties => res.json(properties))
});

// @route  => POST api/users/properties/<id>
// @desc   => Creates a new property object tied to a user's id
// @access => Private
router.post('/properties', auth, (req, res) => {
    const newProperty = new Property({
        address: req.body.address,
        listedPrice: req.body.listedPrice,
        userId: mongoose.Types.ObjectId(req.body.userId)
    });
    newProperty.save()
        .then(property => res.json(property));
});

// @route  => DELETE api/users/properties/<id>
// @desc   => Deletes a property given its ID
// @access => Private
router.delete('/properties/:id', (req, res) => {
    Property.findById(req.params.id)
        .then(property => property.remove()
        .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});


export default router;