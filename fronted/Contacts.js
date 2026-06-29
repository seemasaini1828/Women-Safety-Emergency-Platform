function addContact(){
    
const userEmail =
document.getElementById("userEmail").value;

const name =
document.getElementById("name").value;

const phone =
document.getElementById("phone").value;

const relation =
document.getElementById("relation").value;

fetch("https://women-safetd-eyq2.onrender.comy-backen/add-contact",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userEmail,
name,
phone,
relation
})
})
.then(res=>res.json())
.then(data=>{
alert(data.message);
});

}

function deleteContact(id){

fetch(`https://women-safety-backend-eyq2.onrender.com/contact/${id}`,{
method:"DELETE"
})
.then(res=>res.json())
.then(data=>{

alert(data.message);

loadContacts();

});

}

function loadContacts(){

fetch("https://women-safety-backend-eyq2.onrender.com/contacts")
.then(res=>res.json())
.then(data=>{

let output = "";

data.forEach(contact=>{

output += `
<p>
${contact.name}
<br>
${contact.phone}
<br>
${contact.relation}
<br><br>

<button onclick="deleteContact('${contact._id}')" id="deleteContactBtn">
Delete Contact
</button>

</p>
<hr>
`;

});

document.getElementById("contacts").innerHTML = output;

});

}

loadContacts();