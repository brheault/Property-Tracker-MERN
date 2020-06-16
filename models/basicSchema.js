import mongoose from 'mongoose';

//Define Schema
const testSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String}
});

/* Use your schema to instantiate a Mongoose model
Export the model to make it avaiable to other parts of your Node application */
export default mongoose.model('testModel', testSchema);