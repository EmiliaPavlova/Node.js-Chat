import mongoose, { Schema } from 'mongoose';

const MessageModel = new Schema({
    name: {
        type: String,
        required: [true, 'the sender name is required']
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Message', MessageModel);
