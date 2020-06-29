//import config from './config/config.js';

//Import Routes
import testRoutes from './routes/postApi.js'
import userRoutes from './routes/userApi.js'
import authRoutes from './routes/auth.js'
import itemRoutes from './routes/itemApi.js'

//Import Packages
import mongoose from 'mongoose';
import morgan from 'morgan';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

/*************************************************************** 
At some point, this URI needs to be moved to config.js,
once i figure out how to get it there and still work with Heroku */
const uri = 'mongodb+srv://ben-test:test123@cluster0-rou6o.mongodb.net/GuideBuild?retryWrites=true&w=majority';
/******************************************************************/


//Initialize an express application
const app = express();

//Set up port
const PORT = process.env.PORT || 8080;

//Connect to the Atlas Database
mongoose
    .connect(process.env.MONGODB_URI || uri, 
        {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => { console.log(`Successfully connected to MongoDB.`) });
mongoose.connection.on('connected', () => {
    console.log('Mongoose Status: Connected');
});


//Parse incoming JSON data and encoded URL's (Makes data available through req.body)
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Bodyparser will allow access to specific elements on req.body
app.use(bodyParser.json());

//Set up every request to be logged
app.use(morgan('tiny'));

//Send api requests to the correct folders
app.use('/api/test', testRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));