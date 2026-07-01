// ================= ADMIN LOGIN CHECK =================

if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

// ================= LOAD ADMIN STATS =================

function loadAdminData() {

    fetch("https://women-safety-backend-eyq2.onrender.com/stats")
    .then(res => res.json())
    .then(data => {

        document.getElementById("userCount").innerText = data.totalUsers;
        document.getElementById("sosCount").innerText = data.totalAlerts;
        document.getElementById("contactCount").innerText = data.totalContacts;
        document.getElementById("volunteerCount").innerText = data.totalVolunteers;

    })
    .catch(err => {
        console.log("Error:", err);
        alert("Unable to load admin statistics.");
    });

}

// ================= PAGE LOAD =================

window.onload = function () {
    loadAdminData();
};