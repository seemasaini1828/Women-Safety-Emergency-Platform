// ================= ADD CONTACT =================
if(!localStorage.getItem("token")){
    window.location.href = "login.html";
}

function addContact() {

    const name = document.getElementById("cname").value.trim();
    const phone = document.getElementById("cphone").value.trim();

    if (name === "" || phone === "") {
        alert("Please fill all fields.");
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Duplicate check
    const exists = contacts.find(contact => contact.phone === phone);

    if (exists) {
        alert("This contact already exists.");
        return;
    }

    contacts.push({
        name: name,
        phone: phone
    });

    localStorage.setItem("contacts", JSON.stringify(contacts));

    document.getElementById("cname").value = "";
    document.getElementById("cphone").value = "";

    loadContacts();

    alert("Contact added successfully!");
}


// ================= LOAD CONTACTS =================

function loadContacts() {

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const container = document.getElementById("contactList");

    container.innerHTML = "";

    if (contacts.length === 0) {

        container.innerHTML = `
            <p style="margin-top:20px;color:gray;">
                No emergency contacts added yet.
            </p>
        `;

        return;
    }

    contacts.forEach((contact, index) => {

        const div = document.createElement("div");

        div.className = "contact-item";

        div.innerHTML = `
            <div>
                <h3>👤 ${contact.name}</h3>
                <p>📞 ${contact.phone}</p>
            </div>

            <button onclick="deleteContact(${index})">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        `;

        container.appendChild(div);

    });

}


// ================= DELETE CONTACT =================

function deleteContact(index) {

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const confirmDelete = confirm("Are you sure you want to delete this contact?");

    if (!confirmDelete) {
        return;
    }

    contacts.splice(index, 1);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    loadContacts();

}


// ================= PAGE LOAD =================

window.onload = function () {
    loadContacts();
};