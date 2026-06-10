const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
    name:String,
    phone:String,
    area:String,
    status:{
        type:String,
        default:"Available"
    }
});

module.exports =
mongoose.model("Volunteer", VolunteerSchema);
