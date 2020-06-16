//import config from './config.js';
import testModel from './models/basicSchema.js';
import routes from './routes/api.js'
import mongoose from 'mongoose';
import morgan from 'morgan';
import express from 'express';
import path from 'path';


// const uri = config.db.uri;
const uri = 'mongodb+srv://ben-test:test123@cluster0-rou6o.mongodb.net/GuideBuild?retryWrites=true&w=majority';

//Initialize an express application
const app = express();

//Set up port
const PORT = process.env.PORT || 8080;

//Connect to the Atlas Database
mongoose.connect(process.env.MONGODB_URI || uri, 
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log(`Successfully connected to mongoose database.`)
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose Status: Connected');
});


/***** Uncomment and Save to Clear Database of Test Models *****/
// const clearDatabase = async () => {
//       await testModel.remove({});
// };
// clearDatabase();

//Parse incoming JSON data and encoded URL's (Makes data available through req.body)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Set up every request to be logged
app.use(morgan('tiny'));
//Send every api request through the api.js folder
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));