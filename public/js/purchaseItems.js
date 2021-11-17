
console.log('reashed')
const table = document.querySelector('#itemtable');
let totalItems = new Map();
fetch('/app/items/sell')
  .then(response => response.json())
  .then((data) => {
      
      content = table.innerHTML
      var count = 0
      for(var item in data){
          count+=1
          console.log(item , data[item])

          content +=`<tr><td>${data[item].name}</td><td>${data[item].cost}</td><td><input type="number" id="${data[item].name}"></td></tr>`
          totalItems.set(data[item].name,[data[item].cost,0])
        }
      table.innerHTML=content
  });
  function submitButtonClicked(){

    var total = 0
    for (let [key, value] of totalItems) {
      qty = document.getElementById(key).value
      if(qty!=0){
        
        total+=(qty*totalItems.get(key)[0])
        price = totalItems.get(key)[0]
        totalItems.set(key,[price,qty])
        console.log(totalItems.get(key))
      }

  }
  document.getElementById('total').textContent = total
  totalItems.set('address',document.getElementById('address').value)
  var data = Object.fromEntries(totalItems)         // Map to Json
  // var y =new Map(Object.entries(data))             // Json to Map
  if(total==0) return
  fetch("/app/user/purchaseitems", {
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        data
    }),
     
    // Adding headers to the request
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    }
    })
    .then(data=> data.json())
    .then(response=> {
        if(response.msg===1) window.location='/app/user/orderplaced'
    })
}
