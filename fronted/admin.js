// ================= LOAD COUNTS =================
if(!localStorage.getItem("token")){
    window.location.href = "login.html";
}

function loadAdminData(){

    const sos = JSON.parse(localStorage.getItem("sosHistory")) || [];
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

    document.getElementById("sosCount").innerText = sos.length;
    document.getElementById("contactCount").innerText = contacts.length;
    document.getElementById("volunteerCount").innerText = volunteers.length;
}


// ================= PAGE LOAD =================

window.onload = function(){
    loadAdminData();
};