function loginUser(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

fetch("http://localhost:5000/login",{
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