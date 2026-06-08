const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Women Safety Backend Running Successfully");
});

mongoose.connect("mongodb://127.0.0.1:27017/womenSafetyDB")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

// mongoose.connect(
// "mongodb://127.0.0.1:27017/womenSafetyDB"
// );

const User = require("./models/User");
const Alert = require("./models/Alert");
const Contact = require("./models/Contact");
const Volunteer =require("./models/Volunteer");

app.get("/alerts", async (req, res) => {

    const alerts = await Alert.find();

    res.json(alerts);

});

app.get("/users", async (req,res)=>{

const users = await User.find();

res.json(users);

});

app.get("/stats", async (req,res)=>{

const totalUsers = await User.countDocuments();
const totalAlerts = await Alert.countDocuments();
const totalContacts = await Contact.countDocuments();
const totalVolunteers = await Volunteer.countDocuments();


res.json({
totalUsers,
totalAlerts,
totalContacts,
totalVolunteers
});

});

app.get("/volunteers", async(req,res)=>{

const volunteers =
await Volunteer.find();

res.json(volunteers);

});

app.get("/contacts", async(req,res)=>{

const contacts = await Contact.find();

res.json(contacts);

});

app.delete("/contact/:id", async(req,res)=>{

await Contact.findByIdAndDelete(req.params.id);

res.json({
message:"Contact Deleted Successfully"
});

});

app.post("/register", async(req,res)=>{

const user = new User({
name:req.body.name,
email:req.body.email,
password:req.body.password,
phone:req.body.phone
});

await user.save();

res.json({
message:"User Registered Successfully"
});

});

app.post("/sos", async(req,res)=>{

const alert = new Alert({
latitude:req.body.latitude,
longitude:req.body.longitude,
status:"Pending"
});

await alert.save();

res.json({
message:"SOS Alert Sent"
});

});

app.post("/add-contact", async (req, res) => {

    const contact = new Contact({
        userEmail: req.body.userEmail,
        name: req.body.name,
        phone: req.body.phone,
        relation: req.body.relation
    });

    await contact.save();

    res.json({
        message: "Contact Added Successfully"
    });

});

app.post("/login", async (req,res)=>{

const user = await User.findOne({
email:req.body.email,
password:req.body.password
});

if(user){

res.json({
success:true,
message:"Login Successful"
});

}
else{

res.json({
success:false,
message:"Invalid Email or Password"
});

}

});

app.post("/volunteer", async(req,res)=>{

const volunteer = new Volunteer({
name:req.body.name,
phone:req.body.phone,
area:req.body.area
});

await volunteer.save();

res.json({
message:"Volunteer Registered Successfully"
});

});

app.put("/alert/:id", async(req,res)=>{

await Alert.findByIdAndUpdate(
req.params.id,
{
status:req.body.status
}
);

res.json({
message:"Alert Updated Successfully"
});

});

app.listen(5000,()=>{
console.log("Server Running on Port 5000");
});

