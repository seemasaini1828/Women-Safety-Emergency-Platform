// ================= ADD VOLUNTEER =================
if(!localStorage.getItem("token")){
    window.location.href = "login.html";
}

function addVolunteer() {

    const name = document.getElementById("vname").value.trim();
    const phone = document.getElementById("vphone").value.trim();
    const city = document.getElementById("vcity").value.trim();

    if (name === "" || phone === "" || city === "") {
        alert("Please fill all fields.");
        return;
    }

 fetch("https://women-safety-backend-eyq2.onrender.com/volunteer", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        userEmail: localStorage.getItem("email"),
        name: name,
        phone: phone,
        area: city
    })
})
.then(res => res.json())
.then(data => {

    alert(data.message);

    document.getElementById("vname").value = "";
    document.getElementById("vphone").value = "";
    document.getElementById("vcity").value = "";

    loadVolunteers();

})
.catch(err => {

    console.log(err);

    alert("Unable to register volunteer.");

});
}

// ================= LOAD VOLUNTEERS =================

function loadVolunteers() {

    fetch("https://women-safety-backend-eyq2.onrender.com/volunteers")

    .then(res => res.json())

    .then(volunteers => {

        const container = document.getElementById("volunteerList");

        container.innerHTML = "";

        if (volunteers.length === 0) {

            container.innerHTML = `
                <p style="color:gray;margin-top:20px;">
                    No volunteers registered yet.
                </p>
            `;

            return;
        }

        volunteers.forEach(volunteer => {

            const div = document.createElement("div");

            div.className = "volunteer-item";

            div.innerHTML = `
                <div>
                    <h3>👤 ${volunteer.name}</h3>
                    <p>📞 ${volunteer.phone}</p>
                    <p>📍 ${volunteer.area}</p>
                    <p>🟢 ${volunteer.status}</p>
                </div>

                <button onclick="deleteVolunteer('${volunteer._id}')">
                    Delete
                </button>
            `;

            container.appendChild(div);

        });

    })

    .catch(err => {

        console.log(err);

        alert("Unable to load volunteers.");

    });

}


// ================= DELETE VOLUNTEER =================

function deleteVolunteer(id) {

    const confirmDelete = confirm("Delete this volunteer?");

    if (!confirmDelete) return;

    fetch("https://women-safety-backend-eyq2.onrender.com/volunteer/" + id, {

        method: "DELETE"

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        loadVolunteers();

    })

    .catch(err => {

        console.log(err);

        alert("Unable to delete volunteer.");

    });

}


// ================= PAGE LOAD =================

window.onload = function () {

    loadVolunteers();

};