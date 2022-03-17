window.addEventListener("DOMContentLoaded", (event) => {

    const editButtons = document.querySelectorAll(".answer-edit")

    editButtons.forEach(button => {
        const id = button.id.split('-')[2]
        button.addEventListener('click', e => {
            const updateButton = document.createElement('button')
            updateButton.innerText = "Update"

            const cancelButton = document.createElement('button')
            cancelButton.innerText = "Cancel"

            const textarea = document.createElement('textarea')
            const answerContent = document.querySelector(`.answer-${id} > .answer-body > .content`)
            textarea.innerText = answerContent.innerText

            const editDiv = document.getElementById(`edit-answer-form-${id}`)
            button.hidden = true
            editDiv.append(textarea, updateButton, cancelButton)

            cancelButton.addEventListener('click', ev => {
                button.hidden = false
                updateButton.remove()
                cancelButton.remove()
                textarea.remove()
            })

            updateButton.addEventListener('click', ev => {
                fetch(`/answers/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'content': textarea.value
                    }),
                    credentials: 'include'
                }).then(response => response.json())
                    .then(data => {
                        answerContent.innerText = data.answer.body
                        button.hidden = false
                        updateButton.remove()
                        cancelButton.remove()
                        textarea.remove()
                    })
                    .catch(error => console.log(error))

            })
        })
    })

})
