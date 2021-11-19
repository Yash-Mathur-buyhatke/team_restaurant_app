// structuring done
console.log("reashed");
const table = document.querySelector("#itemtable");
let totalItems = new Map();
fetch("/app/items/sell")
  .then((response) => response.json())
  .then((data) => {
    
    content = table.innerHTML;
    var count = 0;
    for (var item in data.data) {
      count += 1;
      var obj = data.data[item];
      content += `<tr><td>${obj.name}</td><td>${obj.cost}</td><td><input type="number" id="${obj.name}"></td></tr>`;
      totalItems.set(obj.name, [obj.cost, 0]);
    }
    table.innerHTML = content;
  });
// payment flow
function makePayment(data){
  var total = 0;
  for (let [key, value] of totalItems) {
    qty = document.getElementById(key).value;
    if (qty != 0 && qty !=undefined) {
      total += qty * totalItems.get(key)[0];
      price = totalItems.get(key)[0];
      totalItems.set(key, [price, qty]);
    }
  }
  document.getElementById("total").textContent = total;
  totalItems.set("address", document.getElementById("address").value);
  var data = Object.fromEntries(totalItems); // Map to Json
  if (total == 0) return;
  fetch("/app/user/purchaseitems", {
        // Adding method type
        method: "POST",
    
        // Adding body or contents to send
        body: JSON.stringify({
          data,
        }),
    
        // Adding headers to the request
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((data) => data.json())
        .then((response) => {
          if (response.success === 1) {
            const stripe = Stripe("pk_test_51JxOJ3SJcXKxPen0ZqMHRdxWIVfSWDrh7jT6zlCWEEYml4hgaUMmLHs5WBxLKIjANqbo6lySPivukPNnz2w96EIH00IdlqEz23")
            fetch("/app/items/payment", {
              // Adding method type
              method: "POST",
               
              // Adding body or contents to send
              body: JSON.stringify({
                  // "product":{
                  //   "name":"iphone14",
                  //   "amount":10,
                  //   "quantity":1
                  // }
                  data
              }),
               
              // Adding headers to the request
              headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
              }
          })
           .then(data=> data.json())
           .then(function(session){
             stripe.redirectToCheckout({sessionId:session.id})
           }).then(function(result){
            
             if(result.error) {
               console.log(result)
             }
            
             
           }).catch(function(error){
             console.log("error",error)
           })
          
          };
        });
  
}












