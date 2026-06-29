function addContact(){

    const name = document.getElementById("cname").value;
    const phone = document.getElementById("cphone").value;

    if(!name || !phone){
        alert("Please fill all fields");
        return;
    }

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <h3>${name}</h3>
        <p>${phone}</p>
    `;

    document.getElementById("contactList").appendChild(div);

    document.getElementById("cname").value = "";
    document.getElementById("cphone").value = "";
}