import express from 'express';
import testModel from '../models/basicSchema.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();


// @route  => GET api/test
// @desc   => Returns all test objects
// @access => Public
router.get('/', (req, res) => {
    testModel.find({ })
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('Error retreiving data: ', error);
    });
});

// @route  => DELETE api/test/delete
// @desc   => Deletes a test object given the title in the request
// @access => Private
router.delete('/delete', auth, (req, res) => {
    const title = req.body.title;
    testModel.findOneAndDelete({ title })
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('Error deleting data: ', error);
    });
});

// @route  => GET api/test/*
// @desc   => Returns a response of "Unavailable Route" for any undefined route
// @access => Public
router.get('/*', (req, res) => {
    res.send("Unavailable Route.");
});

// @route  => POST api/test/save
// @desc   => Saves a new test object given the JSON in the response
// @access => Private
router.post('/save', /*auth,*/ (req, res) => {
    const data = req.body;
    const basic = new testModel(data);
    basic.save((error) => {
        if(error){
            res.status(500).json({msg: "Problem saving data!"});
            return;
        }
        
        return res.status(200).json({msg: "We received your data"});
        
    });
    
});

export default router;