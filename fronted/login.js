function loginUser(){

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch("https://women-safety-backend-eyq2.onrender.com/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.message || "Login Successful");
        if(data.token){
            localStorage.setItem("token",data.token);
            window.location.href="dashboard.html";
        }
    })
    .catch(err=>{
        alert("Login Failed!");
    });

}