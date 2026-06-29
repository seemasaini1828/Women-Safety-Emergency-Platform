function addContact(){

    const name = document.getElementById("cname").value;
    const phone = document.getElementById("cphone").value;

    if(!name || !phone){
        alert("Please fill all fields");
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({ name, phone });

    localStorage.setItem("contacts", JSON.stringify(contacts));

    document.getElementById("cname").value = "";
    document.getElementById("cphone").value = "";

    loadContacts();
}

function loadContacts(){

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const container = document.getElementById("contactList");
    container.innerHTML = "";

    contacts.forEach((c, index)=>{

        const div = document.createElement("div");
        div.className = "contact-card";

        div.innerHTML = `
            <h3>👤 ${c.name}</h3>
            <p>📞 ${c.phone}</p>
            <button onclick="deleteContact(${index})">Delete</button>
        `;

        container.appendChild(div);
    });
}

function deleteContact(index){

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.splice(index, 1);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    loadContacts();
}

// page load
loadContacts();