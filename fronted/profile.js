// ================= CHECK LOGIN =================
if(!localStorage.getItem("token")){
    alert("Please login first.");
    window.location.href = "login.html";
}

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}


// ================= LOAD PROFILE =================

function loadProfile() {

    const name = localStorage.getItem("name") || "User";
    const email = localStorage.getItem("email") || "Not Available";
    const phone = localStorage.getItem("phone") || "Not Available";

    document.getElementById("pname").textContent = name;
    document.getElementById("pemail").textContent = email;
    document.getElementById("pphone").textContent = phone;
}


// ================= LOGOUT =================

function logout() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");

    alert("Logged out successfully.");

    window.location.href = "login.html";
}


// ================= PAGE LOAD =================

window.onload = function () {
    loadProfile();
};