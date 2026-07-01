function loginUser(){

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if(email==="" || password===""){
        alert("Please fill all fields.");
        return;
    }

    fetch("https://women-safety-backend-eyq2.onrender.com/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
    })
    .then(res=>res.json())
  .then(data=>{

    console.log(data);

    if(data.success){

        localStorage.setItem("token", data.token);

        alert("Login Successful!");

        window.location.href="./dashboard.html";

    }else{

        alert(data.message || "Invalid Email or Password");

    }

})
    .catch(err=>{

        console.log(err);

        alert("Server Error! Please try again later.");

    });

}


// ================= SHOW / HIDE PASSWORD =================

function togglePassword(){

    const password = document.getElementById("loginPassword");

    if(password.type==="password"){

        password.type="text";

    }else{

        password.type="password";

    }

}