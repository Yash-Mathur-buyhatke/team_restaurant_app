// structuring done
console.log("pastOrders is accessible");

console.log("reached");
const table = document.querySelector("#itemtable");
fetch("/app/items/history")
  .then((response) => response.json())
  .then((data) => {
    
      
      
      content = table.innerHTML;
      var count = 0;
      for (var item in data.data) {
        count += 1;
        var obj = data.data[item];
        content += `<tr><td>${obj.item}</td><td>${obj.address}</td><td>${obj.quantity}</td><td>${obj.orderid}</td></tr>`;
        
      }
      table.innerHTML = content;
      alert("history fetched!");
    
  });
