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

    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

    // Duplicate check
    const exists = volunteers.find(v => v.phone === phone);

    if (exists) {
        alert("Volunteer already exists.");
        return;
    }

    volunteers.push({
        name,
        phone,
        city
    });

    localStorage.setItem("volunteers", JSON.stringify(volunteers));

    document.getElementById("vname").value = "";
    document.getElementById("vphone").value = "";
    document.getElementById("vcity").value = "";

    loadVolunteers();

    alert("Volunteer registered successfully!");
}


// ================= LOAD VOLUNTEERS =================

function loadVolunteers() {

    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

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

    volunteers.forEach((volunteer, index) => {

        const div = document.createElement("div");

        div.className = "volunteer-item";

        div.innerHTML = `
            <div>
                <h3>👤 ${volunteer.name}</h3>
                <p>📞 ${volunteer.phone}</p>
                <p>📍 ${volunteer.city}</p>
            </div>

            <button onclick="deleteVolunteer(${index})">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        `;

        container.appendChild(div);

    });

}


// ================= DELETE VOLUNTEER =================

function deleteVolunteer(index) {

    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

    const confirmDelete = confirm("Delete this volunteer?");

    if (!confirmDelete) return;

    volunteers.splice(index, 1);

    localStorage.setItem("volunteers", JSON.stringify(volunteers));

    loadVolunteers();

}


// ================= PAGE LOAD =================

window.onload = function () {

    loadVolunteers();

};