// structuring done
console.log('reached')
function submitButtonClicked() {
    var userName = document.getElementById('userName').value;
    var password = document.getElementById('password').value;
    fetch("/app/register/addnewuser", {
        // Adding method type
        method: "POST",
         
        // Adding body or contents to send
        body: JSON.stringify({
            userName, password
        }),
         
        // Adding headers to the request
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
     .then(data=> data.json())
     .then(response=> {
         if(response.success===1){
             alert('you have been registered!')
            window.location = '/app/login'
         }
         if(response.success===0){
             alert(response.message)
         }
     })
}