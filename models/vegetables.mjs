import mongoose, { mongo } from 'mongoose';

const vegetableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    readyToEat: Boolean
});

const Vegetable = mongoose.model('Vegetable', vegetableSchema);

export default Vegetable;