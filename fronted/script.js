function registerUser(){

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    if(!name || !email || !password || !phone){
        alert("Please fill all fields!");
        return;
    }

 fetch("https://women-safety-backend-eyq2.onrender.com/register",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({name,email,password,phone})
})
    .then(res => res.json())
    .then(data => {

    if (data.success) {

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);

        alert("Registered Successfully!");
        window.location.href = "login.html";
    }
    else {
        alert(data.message || "Registration Failed");
    }

})
    .catch(err=>{
       alert("Server Error! Try again later.");
        console.log(err);
    });
}

function sendSOS(){

     if(!navigator.geolocation){
        alert("Geolocation not supported!");
        return;
    }

    navigator.geolocation.getCurrentPosition(position=>{

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const sosData = {
            time: new Date().toLocaleString(),
            latitude: lat,
            longitude: lng
        };

        // Save in localStorage
        let history = JSON.parse(localStorage.getItem("sosHistory")) || [];
        history.push(sosData);
        localStorage.setItem("sosHistory", JSON.stringify(history));

        // Backend call
        fetch("https://women-safety-backend-eyq2.onrender.com/sos",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
    },
    body:JSON.stringify({
        latitude:lat,
        longitude:lng
    })
})
    .then(() => {
        document.getElementById("status").innerText =
        "🚨 SOS Sent Successfully!";
})
    .catch(err=>{
        document.getElementById("status").innerText =
        "❌ Failed to send SOS";
});
 },

    (error)=>{
        document.getElementById("status").innerText =
        "❌ Location access denied!";

    });

}

function logout(){
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

if(window.location.pathname.includes("history.html")){

    const history = JSON.parse(localStorage.getItem("sosHistory")) || [];

    const container = document.getElementById("historyList");

    history.slice().reverse().forEach(item=>{

        const div = document.createElement("div");
        div.className = "history-card";

        div.innerHTML = `
            <h3>🚨 Emergency Alert</h3>
            <p>📅 Time: ${item.time}</p>
            <p>📍 Latitude: ${item.latitude}</p>
            <p>📍 Longitude: ${item.longitude}</p>
        `;

        container.appendChild(div);
    });
}