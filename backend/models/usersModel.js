const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photoURL: String,
    bio: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;