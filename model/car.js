const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    car_brand: {
        type: String,
        required: true
    },
    car_model: {
        type: String,
        required: true
    },
    car_age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Car', carSchema);
