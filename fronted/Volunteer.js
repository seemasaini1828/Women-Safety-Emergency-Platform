function registerVolunteer(){

const name =
document.getElementById("name").value;

const phone =
document.getElementById("phone").value;

const area =
document.getElementById("area").value;

fetch("https://women-safety-backend-eyq2.onrender.com/volunteer",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
phone,
area
})
})
.then(res=>res.json())
.then(data=>{

alert(data.message);

loadVolunteers();

});

}

function loadVolunteers(){

fetch("https://women-safety-backend-eyq2.onrender.com/volunteers")
.then(res=>res.json())
.then(data=>{

let output="";

data.forEach(v=>{

output += `
<p>
<b>${v.name}</b>
<br>
${v.phone}
<br>
${v.area}
<br>
Status: ${v.status}
</p>
<hr>
`;

});

document.getElementById("volunteers").innerHTML =
output;

});

}

loadVolunteers();

function loadAlerts(){

fetch("https://women-safety-backend-eyq2.onrender.com/alerts")
.then(res=>res.json())
.then(data=>{

let output="";

data.forEach(alert=>{

output += `
<p>
Latitude: ${alert.latitude}
<br>
Longitude: ${alert.longitude}
<br>
Status: ${alert.status}
<br><br>

<button onclick="acceptAlert('${alert._id}')">
Accept Alert
</button>i

<button onclick="completeAlert('${alert._id}')">
Complete Alert
</button>

</p>
<hr>
`;

});

document.getElementById("alerts").innerHTML =
output;

});

}

function acceptAlert(id){

fetch(`https://women-safety-backend-eyq2.onrender.com/alert/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
status:"Accepted"
})

})
.then(res=>res.json())
.then(data=>{

alert(data.message);

loadAlerts();

});

}

loadAlerts();

function completeAlert(id){

fetch(`https://women-safety-backend-eyq2.onrender.com/alert/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
status:"Completed"
})

})
.then(res=>res.json())
.then(data=>{

alert(data.message);

loadAlerts();

});

}
