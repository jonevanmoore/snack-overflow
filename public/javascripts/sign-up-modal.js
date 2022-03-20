
window.addEventListener("DOMContentLoaded", () => {
    // MODAL STUFF
    const btn = document.getElementById("modalBtn");
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // MODAL STUFF END



    // ERROR MESSAGES
    const usernameTaken = document.createElement('text')
    const usernameLong = document.createElement('text')
    const usernameShort = document.createElement('text')
    const usernameNull = document.createElement('text')
    const usernameErrorDiv = document.querySelector('.username-error-div')
    usernameTaken.id = 'error-handle'
    usernameLong.id = 'error-handle'
    usernameShort.id = 'error-handle'
    usernameNull.id = 'error-handle'
    usernameTaken.innerText = 'username is already taken'
    usernameLong.innerText = 'username is too long'
    usernameShort.innerText = 'username is too short'
    usernameNull.innerText = 'username cannot have spaces'

    const emailTaken = document.createElement('text')
    const emailLong = document.createElement('text')
    const emailShort = document.createElement('text')
    const emailNull = document.createElement('text')
    const emailErrorDiv = document.querySelector('.email-error-div')
    emailTaken.id = 'error-handle'
    emailLong.id = 'error-handle'
    emailShort.id = 'error-handle'
    emailNull.id = 'error-handle'
    emailTaken.innerText = 'email is already in use'
    emailLong.innerText = 'email is too long'
    emailShort.innerText = 'email is too short'
    emailNull.innerText = 'email cannot have spaces'

    const passwordNull = document.createElement('text')
    const passwordErrorDiv = document.querySelector('.password-error-div')
    passwordNull.id = 'error-handle'
    passwordNull.innerText = 'please enter a password'

    const confirmPassNotMatched = document.createElement('text')
    const confirmPassErrorDiv = document.querySelector('.confirm-pass-error-div')
    confirmPassNotMatched.id = 'error-handle'
    confirmPassNotMatched.innerText = 'password does not match'

    const signUpError = document.createElement('text')
    const signUpErrorDiv = document.querySelector('.sign-up-error-div')
    signUpError.id = 'error-button-text'
    signUpError.innerText = 'please complete the form first'

    //ERROR MESSAGES END

    //VALIDATION MESSAGES

    const usernameValid = document.createElement('text')
    const usernameValidDiv = document.querySelector('.username-valid-div')
    usernameValid.id = 'valid-input'
    usernameValid.innerText = 'username is available'

    const emailValid = document.createElement('text')
    const emailValidDiv = document.querySelector('.email-valid-div')
    emailValid.id = 'valid-input'
    emailValid.innerText = 'email is available'

    const passwordValid = document.createElement('text')
    const passwordValidDiv = document.querySelector('.password-valid-div')
    passwordValid.id = 'valid-input'
    passwordValid.innerText = 'password acceptable'

    const confirmPassValid = document.createElement('text')
    const confirmPassValidDiv = document.querySelector('.confirm-pass-valid-div')
    confirmPassValid.id = 'valid-input'
    confirmPassValid.innerText = 'password confirmed'

    const signUpFormValid = document.createElement('text')
    const signUpFormValidDiv = document.querySelector('.sign-up-form-valid-div')
    signUpFormValid.id = 'valid-button-text'
    signUpFormValid.innerText = 'sign-up form is valid'

    //VALIDATION MESSAGES END

    const userList = []
    const existingUsers = document.querySelectorAll('.existing-user')
    existingUsers.forEach(user => {
        userList.push(user.innerText)
    })

    const emailList = []
    const existingEmails = document.querySelectorAll('.existing-email')
    existingEmails.forEach(email => {
        emailList.push(email.innerText)
    })

    let usernameGood;
    let emailGood;
    let passwordGood;
    let confirmPassGood;

    const userSignUpDiv = document.querySelector('.user-sign-up-div')
    const signUpCriteria = document.querySelector('.sign-up-criteria')
    const usernameInput = document.querySelector('.username-input')
    const emailInput = document.querySelector('.email-input')
    const passwordInput = document.querySelector('.password-input')
    const confirmPassInput = document.querySelector('.confirm-pass-input')
    const signUpButton = document.querySelector('.sign-up-button')


    function signUpErrorFunc() {
        userSignUpDiv.style.width = '360px'
        userSignUpDiv.style.height = '380px'
        signUpCriteria.style.paddingTop = '5px'
        signUpFormValidDiv.innerHTML = ''
        signUpButton.onclick = (e) => {
            signUpErrorDiv.appendChild(signUpError)
            e.preventDefault()
        }
    }

    function signUpComplete() {
        signUpErrorDiv.innerHTML = ''
        signUpFormValidDiv.appendChild(signUpFormValid)
        signUpButton.onclick = (e) => {
            e.stopPropagation()
        }
    }

    function checkValidation() {
        if (usernameGood && emailGood && passwordGood && confirmPassGood) {
            signUpComplete()
        }
    }

    // USERNAME INPUT ERROR HANDLER
    usernameInput.addEventListener('input', e => {
        if (userList.includes(usernameInput.value) && usernameInput.value.length <= 20 && usernameInput.value.length >= 1) {
            usernameInput.style.border = '1px red solid'
            usernameErrorDiv.innerHTML = ''
            usernameValidDiv.innerHTML = ''
            usernameErrorDiv.appendChild(usernameTaken)
            usernameGood = false;
        } else if (usernameInput.value.length > 20 && !userList.includes(usernameInput.value)) {
            usernameInput.style.border = '1px red solid'
            usernameErrorDiv.innerHTML = ''
            usernameValidDiv.innerHTML = ''
            usernameErrorDiv.appendChild(usernameLong)
            usernameGood = false;
        } else if (usernameInput.value.length < 1 && !userList.includes(usernameInput.value)) {
            usernameInput.style.border = '1px red solid'
            usernameErrorDiv.innerHTML = ''
            usernameValidDiv.innerHTML = ''
            usernameErrorDiv.appendChild(usernameShort)
            usernameGood = false;
        } else if (usernameInput.value.includes(' ') && usernameInput.value.length >= 1 && usernameInput.value.length <= 20 && !userList.includes(usernameInput.value)) {
            usernameInput.style.border = '1px red solid'
            usernameErrorDiv.innerHTML = ''
            usernameValidDiv.innerHTML = ''
            usernameErrorDiv.appendChild(usernameNull)
            usernameGood = false;
        } else if (usernameInput.value.length >= 1 && usernameInput.value.length <= 20 && !userList.includes(usernameInput.value)) {
            usernameErrorDiv.innerHTML = ''
            usernameValidDiv.appendChild(usernameValid)
            usernameInput.style.border = '1px green solid'
            usernameGood = true
            console.log(usernameGood, emailGood, passwordGood, confirmPassGood)
        }
        checkValidation()

    })

    //EMAIL INPUT ERROR HANDLER
    emailInput.addEventListener('input', e => {
        if (emailList.includes(emailInput.value) && emailInput.value.length <= 20 && emailInput.value.length >= 3) {
            emailInput.style.border = '1px red solid'
            emailErrorDiv.innerHTML = ''
            emailValidDiv.innerHTML = ''
            emailErrorDiv.appendChild(emailTaken)
            emailGood = false;
        } else if (emailInput.value.length > 20 && !emailList.includes(emailInput.value)) {
            emailInput.style.border = '1px red solid'
            emailErrorDiv.innerHTML = ''
            emailValidDiv.innerHTML = ''
            emailErrorDiv.appendChild(emailLong)
            emailGood = false;
        } else if (emailInput.value.length < 3 && !emailList.includes(emailInput.value)) {
            emailInput.style.border = '1px red solid'
            emailErrorDiv.innerHTML = ''
            emailValidDiv.innerHTML = ''
            emailErrorDiv.appendChild(emailShort)
            emailGood = false;
        } else if (emailInput.value.includes(' ') && emailInput.value.length <= 20 && emailInput.value.length >= 3) {
            emailInput.style.border = '1px red solid'
            emailErrorDiv.innerHTML = ''
            emailValidDiv.innerHTML = ''
            emailErrorDiv.appendChild(emailNull)
            emailGood = false;
        } else if (emailInput.value.length >= 1 && emailInput.value.length <= 20 && !emailList.includes(emailInput.value)) {
            emailErrorDiv.innerHTML = ''
            emailValidDiv.appendChild(emailValid)
            emailInput.style.border = '1px green solid'
            emailGood = true
            console.log(usernameGood, emailGood, passwordGood, confirmPassGood)
        }
        checkValidation()
    })

    //PASSWORD ERROR HANDLER
    passwordInput.addEventListener('input', e => {
        if (!passwordInput.value.length) {
            passwordInput.style.border = '1px red solid'
            passwordErrorDiv.innerHTML = ''
            passwordValidDiv.innerHTML = ''
            passwordErrorDiv.appendChild(passwordNull)
            passwordGood = false;
        } else if (passwordInput.value.length) {
            passwordErrorDiv.innerHTML = ''
            passwordValidDiv.appendChild(passwordValid)
            passwordInput.style.border = '1px green solid'
            passwordGood = true
            console.log(usernameGood, emailGood, passwordGood, confirmPassGood)
        }
        checkValidation()
    })

    //CONFIRM PASSWORD ERROR HANDLER
    confirmPassInput.addEventListener('input', e => {
        if (confirmPassInput.value !== passwordInput.value && usernameGood && emailGood) {
            confirmPassInput.style.border = '1px red solid'
            confirmPassErrorDiv.innerHTML = ''
            confirmPassValidDiv.innerHTML = ''
            confirmPassErrorDiv.appendChild(confirmPassNotMatched)
            confirmPassGood = false
        } else if (!confirmPassInput.value) {
            confirmPassInput.style.border = '1px red solid'
            confirmPassErrorDiv.innerHTML = ''
            confirmPassValidDiv.innerHTML = ''
            confirmPassErrorDiv.appendChild(confirmPassNotMatched)
            confirmPassGood = false
        } else if (confirmPassInput.value === passwordInput.value) {
            confirmPassErrorDiv.innerHTML = ''
            confirmPassValidDiv.appendChild(confirmPassValid)
            confirmPassInput.style.border = '1px green solid'
            confirmPassGood = true
            console.log(usernameGood, emailGood, passwordGood, confirmPassGood)
        }
        checkValidation()
    })


    console.log(usernameGood, emailGood, passwordGood, confirmPassGood)
    if (!usernameGood || !emailGood || !passwordGood || !confirmPassGood) {
        signUpErrorFunc()
        console.log('NOT GOOD')
    }





})
