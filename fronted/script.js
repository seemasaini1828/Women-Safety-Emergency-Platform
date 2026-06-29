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
    .then(res=>res.json())
    .then(data=>{
        alert(data.message || "Registered Successfully!");
    })
    .catch(err=>{
        alert("Server Error! Try again later.");
        console.log(err);
    });
}

function sendSOS(){

    if(!navigator.geolocation){
        alert("Geolocation not supported in your browser");
        return;
    }

    navigator.geolocation.getCurrentPosition(
    
    (position)=>{

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

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
        .then(res=>res.json())
        .then(data=>{
            document.getElementById("status").innerHTML =
            "🚨 Emergency Alert Sent Successfully!";
        })
        .catch(err=>{
            document.getElementById("status").innerHTML =
            "❌ Failed to send SOS!";
        });

    },

    (error)=>{
        document.getElementById("status").innerHTML =
        "❌ Location access denied!";
    });

}