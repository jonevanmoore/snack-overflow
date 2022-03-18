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

})
