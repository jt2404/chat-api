const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema(
    {
        msg_from:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        msg_to:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        msg:
        {
            type:String,
            required:true
        }
    }
)
const Message =  mongoose.model('Message',messageSchema);
module.exports = Message;