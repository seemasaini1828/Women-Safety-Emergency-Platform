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

  fetch("https://women-safety-backend-eyq2.onrender.com/add-contact", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        userEmail: localStorage.getItem("email"),
        name: name,
        phone: phone
    })
})
.then(res => res.json())
.then(data => {

    alert(data.message);

    document.getElementById("cname").value = "";
    document.getElementById("cphone").value = "";

    loadContacts();

})
.catch(err => {
    console.log(err);
    alert("Unable to add contact.");
});
}

// ================= LOAD CONTACTS =================

function loadContacts() {

    fetch("https://women-safety-backend-eyq2.onrender.com/contacts?email=" + localStorage.getItem("email"))

    .then(res => res.json())

    .then(contacts => {

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

        contacts.forEach(contact => {

            const div = document.createElement("div");

            div.className = "contact-item";

            div.innerHTML = `
                <div>
                    <h3>👤 ${contact.name}</h3>
                    <p>📞 ${contact.phone}</p>
                </div>

                <button onclick="deleteContact('${contact._id}')">
                    Delete
                </button>
            `;

            container.appendChild(div);

        });

    })

    .catch(err => {

        console.log(err);

        alert("Unable to load contacts.");

    });

}


// ================= DELETE CONTACT =================

function deleteContact(id) {

    const confirmDelete = confirm("Are you sure you want to delete this contact?");

    if (!confirmDelete) {
        return;
    }

    fetch("https://women-safety-backend-eyq2.onrender.com/contact/" + id, {

        method: "DELETE"

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        loadContacts();

    })

    .catch(err => {

        console.log(err);

        alert("Unable to delete contact.");

    });

}

// ================= PAGE LOAD =================

window.onload = function () {
    loadContacts();
};
