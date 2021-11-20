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
  console.log(data)
  var stripeHandler = StripeCheckout.configure(
    { 
      key: "pk_test_51JxOJ3SJcXKxPen0ZqMHRdxWIVfSWDrh7jT6zlCWEEYml4hgaUMmLHs5WBxLKIjANqbo6lySPivukPNnz2w96EIH00IdlqEz23", //publishable key
      locale:'en',
      token:function(token){
          token["items_detail"]=data
          fetch("/app/items/payment", {
            // Adding method type
           method: "POST",            
            // Adding body or contents to send
            body: JSON.stringify({
                token
            }),        
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
         .then(data=> data.json())
         .then(response=> {
           console.log(response)
             if(response.success===1) alert(response.message)
             
         })
      }

    }
  );
  stripeHandler.open({
    amount:total,
  })
  
  
}












