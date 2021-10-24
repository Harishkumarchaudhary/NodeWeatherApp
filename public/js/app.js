/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{ //e stands for event
    e.preventDefault() //-> so that page doesn't reload automatically on form submission
    //console.log('Submitting')
    const location = search.value

    messageone.textContent = 'Loading...'
    messagetwo.textContent = '' //Clear value if any from previous search

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
          messageone.textContent = data.error
        } else {
            messageone.textContent = data.forecast
            messagetwo.textContent = data.location
        }
    })
   })
    
})
