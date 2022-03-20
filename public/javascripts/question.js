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

            const answerContent = document.querySelector(`#answer-${id} > .answer-body > .content`)

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
    
    // VOTE BUTTONS
    const voteButtons = document.querySelectorAll('.vote-button')
    

    voteButtons.forEach( button => {        

      const answer_id = button.id.split('-')[1];
      const question_id = window.location.pathname.split('/')[2];
      const score = document.getElementById(`score-${answer_id}`)
      
      const getValue = event => {
        if( event.target.classList.contains('upvote-button') ){
          return event.target.classList.contains('engaged') ? 0 : 1
        }else{
          return event.target.classList.contains('engaged') ? 0 : -1
        }
      }
      
      if( button.classList.contains('active') ){

        // these two functions must be named so they can be removed
        const disengageVote = event => {
          let value = getValue(event);
          const thisButton = event.target; // missing this line gave me the WORST bug
          const body = { answer_id, question_id, value }; // this lets us reuse the route
          fetch('/votes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body) 
          }).then( response => {
            if ( response.status === 200 ){
              return response.json();
            }
          }).then( data => {
            if( data ){
              thisButton.classList.remove('engaged');
              thisButton.removeEventListener('click', disengageVote);
              thisButton.addEventListener('click', engageVote);
              score.innerText = data.score
            } 
          } ).catch( error => console.log(error) ); 
        };

        const engageVote = event => {
          let value = getValue(event);
          const thisButton = event.target; // ditto above. scoping nightmare.
          const body = { answer_id, question_id, value }
          fetch('/votes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          }).then( response => {
            if( response.status === 200 || response.status === 201 ){
              return response.json();
            }
          }).then( data => {
            if( data ){
              thisButton.removeEventListener('click', engageVote); 
              thisButton.addEventListener('click', disengageVote);     
              score.innerText = data.score;
              disengageOtherButton(thisButton, answer_id);
              thisButton.classList.add('engaged'); 
            }
          }).catch( error => console.log(error));
        };

        // this works every time.
        function disengageOtherButton (aButton, answer_id) {
          let otherButton;
          if( aButton.className.includes('upvote') ){
            otherButton = document.getElementById(`downvote-${answer_id}`);
          } else if( aButton.className.includes('downvote') ){
            otherButton = document.getElementById(`upvote-${answer_id}`);
          }

          if( otherButton.className.includes('engaged') ){
            otherButton.classList.remove('engaged');
            otherButton.removeEventListener('click', disengageVote);
            otherButton.addEventListener('click', engageVote);
          }
        }


        // the engaged class is applied on initial page load, if applicable
        if( button.className.includes('engaged') ){
          button.addEventListener('click', disengageVote);
        } else {
          button.addEventListener('click', engageVote);
        }
      }  
    });


})

