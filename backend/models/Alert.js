const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({

    userEmail: String,
    latitude:Number,
    longitude:Number,
    status:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Alert", AlertSchema);