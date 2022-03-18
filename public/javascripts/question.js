window.addEventListener("DOMContentLoaded", (event) => {

    const editButtons = document.querySelectorAll(".answer-edit")

    editButtons.forEach(button => {
        const id = button.id.split('-')[2]
        button.addEventListener('click', e => {
            const updateButton = document.createElement('button')
            updateButton.innerText = "Update"
            updateButton.className = 'edit-button'

            const cancelButton = document.createElement('button')
            cancelButton.innerText = "Cancel"
            cancelButton.className = 'cancel-button'

            const answerContent = document.querySelector(`.answer-${id} > .answer-body > .content`)

            const editDiv = document.getElementById(`edit-answer-form-${id}`)
            button.hidden = true
            editDiv.append( updateButton, cancelButton)

            answerContent.setAttribute('contenteditable', true); 
            answerContent.classList.add('editing');            

            cancelButton.addEventListener('click', ev => {
                button.hidden = false
                updateButton.remove()
                cancelButton.remove()
                answerContent.classList.remove('editing');
            })

            updateButton.addEventListener('click', ev => {
                fetch(`/answers/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'content': answerContent.innerText
                    }),
                    credentials: 'same-origin' //this is default behavior, not required
                }).then(response => response.json())
                    .then(data => {
                        if( data.answer ){
                          answerContent.innerText = data.answer.body
                          button.hidden = false
                          updateButton.remove()
                          cancelButton.remove()
                          answerContent.classList.remove('editing');
                        }
                    })
                    .catch(error => console.log(error))

            })
        })
    })

    // DELETE BUTTONS

    const deleteButtons = document.querySelectorAll('.answer-delete');

    deleteButtons.forEach( button => {
      // send fetch delete
        const id = button.id.split('-')[2];
        button.addEventListener('click', event => {
            fetch(`/answers/${id}`, {
              method: 'DELETE',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({})
            }).then( response => {
                if( response.status === 200 ){
                  const answer = document.getElementById(`answer-${id}`);
                  answer.remove();
                }
              })
              .catch( error => console.log(error));
        });  

      // on success, delete entire section
    });

})
