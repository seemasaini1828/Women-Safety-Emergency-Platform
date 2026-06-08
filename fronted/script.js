function registerUser(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const phone = document.getElementById("phone").value;

fetch("http://localhost:5000/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({name,email,password,phone})
})
.then(res=>res.json())
.then(data=>{
alert(data.message);
});
}

function sendSOS(){

navigator.geolocation.getCurrentPosition(position=>{

const lat = position.coords.latitude;
const lng = position.coords.longitude;

fetch("http://localhost:5000/sos",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
latitude:lat,
longitude:lng
})
})
.then(res=>res.json())
.then(data=>{
document.getElementById("status").innerHTML =
"Emergency Alert Sent Successfully!";
});
});
}