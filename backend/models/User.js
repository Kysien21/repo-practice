const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    First_name: { type: String, required: true },
    Last_name: { type: String, required: true },
    Mobile_No: { type: String, required: true },
    Email_Address: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

//console.log("Saving new user...");


module.exports = mongoose.model('User', userSchema)