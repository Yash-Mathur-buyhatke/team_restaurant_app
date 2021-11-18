// structuring Done
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
     if(response.success===1) {
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
      for(var item in data.data){
          count+=1
          var obj = data.data[item]

          content +=`<tr id='${obj.orderid}row'><td>${obj.item}</td><td>${obj.username}</td><td>${obj.address}</td><td>${obj.quantity}</td><td>${obj.orderid}</td><td><input type="button" value="Delivered" id=${obj.orderid} onclick="deliverButtonClicked(this.id)"></td></tr>`
          
        }
      table.innerHTML=content
  });
  