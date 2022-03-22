const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please Add a name']
    },
    email: {
        type:String,
        required: [true, 'Please Add a EMail'],
        unique:true
    },
    password: {
        type:String,
        required: [true, 'Please Add a paassword']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)