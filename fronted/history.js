// ================= LOAD HISTORY =================
if(!localStorage.getItem("token")){
    window.location.href = "login.html";
}

function loadHistory() {

    fetch("https://women-safety-backend-eyq2.onrender.com/alerts?email=" + localStorage.getItem("email"))

    .then(res => res.json())

    .then(history => {

        const container = document.getElementById("historyList");

        container.innerHTML = "";

        if(history.length === 0){

            container.innerHTML = `
                <p style="color:gray;font-size:18px;">
                    No SOS history found.
                </p>
            `;

            return;
        }

        history.reverse().forEach(item => {

            const div = document.createElement("div");

            div.className = "history-card";

            div.innerHTML = `
                <h3>🚨 SOS Alert</h3>

                <p>📅 ${new Date(item.createdAt).toLocaleString()}</p>

                <p>📍 Latitude : ${item.latitude}</p>

                <p>📍 Longitude : ${item.longitude}</p>

                <p>Status : ${item.status}</p>
            `;

            container.appendChild(div);

        });

    })

    .catch(err=>{

        console.log(err);

        alert("Unable to load history.");

    });

}


// ================= CLEAR HISTORY =================

function clearHistory() {

    if(!confirm("Are you sure you want to clear all history?")){

        return;

    }

    fetch("https://women-safety-backend-eyq2.onrender.com/alerts?email=" + localStorage.getItem("email"),{

        method:"DELETE"

    })

    .then(res=>res.json())

    .then(data=>{

        alert(data.message);

        loadHistory();

    })

    .catch(err=>{

        console.log(err);

        alert("Unable to clear history.");

    });

}


// ================= PAGE LOAD =================

window.onload = function () {
    loadHistory();
};