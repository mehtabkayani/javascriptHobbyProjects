const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className= " form-control error";
    const small = formControl.querySelector("small")
    small.innerText = message
}

// Show successs outline

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className= " form-control success";
}

//Check Email

// function isValidEmail(email){
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if (re.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input,`Email is not valid`)
    }
}

//Check required
function checkRequired(inputArr){
    inputArr.forEach(function(input) {
        if(input.value.trim() === ""){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showSuccess(input)
        }
    });
}

//Check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input,`${getFieldName(input)} must be at least ${min} characters `)
    }else if(input.value.length > max){
        showError(input,`${getFieldName(input)} must be at less than ${max} characters `)

    }else{
        showSuccess(input)
    }
}

//Check password
function checkPasswordsMatch(password,password2){
    if (password.value !== password2.value) {
        showError(password2, `${getFieldName(password)} does not match`)
        
    } 
}
//Get fieldname
function getFieldName(input){
   return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//Event listeners
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    checkRequired([username,email,password,password2])
    checkLength(username,3,15);
    checkLength(password, 6,25);
    checkEmail(email);
    checkPasswordsMatch(password,password2);
    
    // if(username.value === ""){
    //     showError(username, "Username is required");
    // }else{
    //     showSuccess(username);
    // }
   
});