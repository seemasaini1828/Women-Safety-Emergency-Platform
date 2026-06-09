function loginUser(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

fetch("https://women-safety-backend-eyq2.onrender.com/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
})
.then(res=>res.json())
.then(data=>{

alert(data.message);

if(data.success){

window.location.href =
"dashboard.html";

}

});

}