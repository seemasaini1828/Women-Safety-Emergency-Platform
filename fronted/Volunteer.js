function addVolunteer(){

    const name = document.getElementById("vname").value;
    const phone = document.getElementById("vphone").value;
    const city = document.getElementById("vcity").value;

    if(!name || !phone || !city){
        alert("Please fill all fields");
        return;
    }

    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

    volunteers.push({ name, phone, city });

    localStorage.setItem("volunteers", JSON.stringify(volunteers));

    document.getElementById("vname").value = "";
    document.getElementById("vphone").value = "";
    document.getElementById("vcity").value = "";

    loadVolunteers();
}

function loadVolunteers(){

    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

    const container = document.getElementById("volunteerList");
    container.innerHTML = "";

    volunteers.forEach((v, index)=>{

        const div = document.createElement("div");
        div.className = "volunteer-card";

        div.innerHTML = `
            <h3>🤝 ${v.name}</h3>
            <p>📞 ${v.phone}</p>
            <p>📍 ${v.city}</p>
            <button onclick="deleteVolunteer(${index})">Remove</button>
        `;

        container.appendChild(div);
    });
}

function deleteVolunteer(index){

    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

    volunteers.splice(index, 1);

    localStorage.setItem("volunteers", JSON.stringify(volunteers));

    loadVolunteers();
}

// page load
loadVolunteers();