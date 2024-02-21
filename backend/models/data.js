const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamp: true})

const Data = mongoose.model('Data', dataSchema)
module.exports = Data