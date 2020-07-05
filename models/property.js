import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    address: {type: String, required: true},
    dateAdded: {type: Date, default: Date.now},
    listedPrice: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}
});

export default mongoose.model('propertyModel', PropertySchema);