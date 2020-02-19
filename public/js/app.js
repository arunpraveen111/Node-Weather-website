const weatherform = document.querySelector('form') //getting "form" from home.hbs file
const userinput= document.querySelector('input') //getting "input" from home.hbs file
const msg1= document.querySelector('#msg1')//Accessing "msg1" from home.hbs file
const msg2= document.querySelector('#msg2')//Accessing "msg2" from home.hbs file

weatherform.addEventListener('submit',(browserevent)=>{ //submit is the predefined event
    
    const location = userinput.value
    msg1.textContent = 'Loading...'
    msg2.textContent =''
    browserevent.preventDefault()

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent= data.error
                msg2.textContent= ''
            }else{
                msg1.textContent = data.location
                msg2.textContent = data.Forecast
            }
        })  
    })
})