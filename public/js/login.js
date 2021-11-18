console.log('reached')
const submitButtonClicked = () =>{
    var userName = document.getElementById('userName').value
    var password = document.getElementById('password').value
    if(userName.length===0 && password.length===0) return
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
     if(response.msg===1) window.location = '/app/user/purchaseitems'
     if(response.msg===2) window.location = '/app/admin/orderconfirmation'
 })


}