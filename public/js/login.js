// structuring done
console.log('reached')
const submitButtonClicked = () =>{
    var userName = document.getElementById('userName').value
    var password = document.getElementById('password').value
    
    if(userName.length===0 || userName===undefined || password===undefined || password.length===0) return
    else {
        fetch("/app/login", {
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
             if(response.success===1 && response.message==='user found') window.location = '/app/user/purchaseitems'
             if(response.success===1 && response.message==='admin found') window.location = '/app/admin/orderconfirmation'
             if(response.success==0) alert('you are not authorized')
         })
        
    }
    

}