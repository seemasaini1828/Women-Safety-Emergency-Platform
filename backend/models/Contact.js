const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    userEmail: String,
    name: String,
    phone: String,
});

module.exports = mongoose.model("Contact", ContactSchema);