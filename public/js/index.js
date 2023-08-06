const mymodal = new bootstrap.Modal ("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkdLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;  
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked; 

    const account = getAccount(email);

    if(!account) {
        alert("Opps! Verifique o usuário ou a senha.") 
        return;
    }

    if(account) {
        if(account.password !== password){
            alert("Opps! Verifique o usuário ou a senha.") 
        return;
        }
       
        saveSession(email, checkSession);

        
        window.location.href = "home.html";
    }

   

});

//criar conta
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;  
    const password = document.getElementById("password-create-input").value; 
    
    if(email.length < 5) {
        alert("Email inválido");
        return;
    }

    if(password.length < 4) { 
        alert("preencha a senha com no minímo 4 digitos");
        return; 
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
     });

    mymodal.hide();

    alert("Conta criada com sucesso."); 
   
});

function checkdLogged() {
    if(session){
        sessionStorage.setItem("logged", session); 
        logged = session; 
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html"; 
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    const acconut = localStorage.getItem(key);

    if(acconut){
        return JSON.parse(acconut);
    }

    return ""; 
}