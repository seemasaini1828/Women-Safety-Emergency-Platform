const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({

    userEmail: String,
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
