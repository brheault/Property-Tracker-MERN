import mongoose from 'mongoose';

//Define Schema
const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  register_date: {type: Date, default: Date.now}
});

/* Use your schema to instantiate a Mongoose model
Export the model to make it avaiable to other parts of your Node application */
export default mongoose.model('user', UserSchema);