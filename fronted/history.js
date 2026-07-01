// ================= LOAD HISTORY =================
if(!localStorage.getItem("token")){
    window.location.href = "login.html";
}

function loadHistory() {

    const history = JSON.parse(localStorage.getItem("sosHistory")) || [];

    const container = document.getElementById("historyList");

    container.innerHTML = "";

    if (history.length === 0) {

        container.innerHTML = `
            <p style="color:gray;font-size:18px;">
                No SOS history found.
            </p>
        `;

        return;
    }

    history.slice().reverse().forEach(item => {

        const div = document.createElement("div");

        div.className = "history-card";

        div.innerHTML = `
            <h3>🚨 SOS Alert</h3>
            <p>📅 Time: ${item.time}</p>
            <p>📍 Latitude: ${item.latitude}</p>
            <p>📍 Longitude: ${item.longitude}</p>
        `;

        container.appendChild(div);
    });
}


// ================= CLEAR HISTORY =================

function clearHistory() {

    if (confirm("Are you sure you want to clear all history?")) {

        localStorage.removeItem("sosHistory");

        loadHistory();

        alert("History cleared successfully!");
    }
}


// ================= PAGE LOAD =================

window.onload = function () {
    loadHistory();
};