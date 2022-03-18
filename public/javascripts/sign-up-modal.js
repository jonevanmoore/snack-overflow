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

    const usernameInput = document.getElementByClassName('username-input')
    const signUpBtn = document.getElementByClassName('sign-up-button')
    usernameInput.style.backgroundColor = 'red'

    usernameInput.addEventListener('input', e => {
        if (e.target.value === 'jonevanmoore') {
            signUpBtn.onclick = ev => {
                ev.preventDefault()
            }
        }
    })
})
