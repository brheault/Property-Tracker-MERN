import express from 'express';
import testModel from '../models/basicSchema.js';

const router = express.Router();

//For now, set up simple responses
//Send all test data for an api path
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

router.get('/*', (req, res) => {
    res.send("Unavailable Route.");
});

router.post('/save', (req, res) => {
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