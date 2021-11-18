console.log('Reached here')
const table = document.querySelector('#itemtable');
function deliverButtonClicked(value){
    fetch("/app/items/delivered", {
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify({
          value
      }),
       
      // Adding headers to the request
      headers: {
          'Content-Type': 'application/json; charset=UTF-8',
      }
  }).then(data=> data.json())
 .then(response=> {
     if(response.msg===1) {
      alert('Done')
      document.getElementById(`${value}row`).innerHTML=""
     }

     
 })
}

fetch('/app/items/pending')
  .then(response => response.json())
  .then((data) => {
      
      content = table.innerHTML
      var count = 0
      for(var item in data){
          count+=1
          console.log(item , data[item])

          content +=`<tr id='${data[item].orderid}row'><td>${data[item].item}</td><td>${data[item].userName}</td><td>${data[item].address}</td><td>${data[item].quantity}</td><td>${data[item].orderid}</td><td><input type="button" value="Delivered" id=${data[item].orderid} onclick="deliverButtonClicked(this.id)"></td></tr>`
          
        }
      table.innerHTML=content
  });
  