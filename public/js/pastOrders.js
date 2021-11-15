console.log('pastOrders is accessible')


console.log('reashed')
const table = document.querySelector('#itemtable');
fetch('/fetchuserpastorders')
  .then(response => response.json())
  .then((data) => {
      console.log(data)
      content = table.innerHTML
      var count = 0
      for(var item in data){
          count+=1
          console.log(item , data[item])
          content +=`<tr><td>${data[item].item}</td><td>${data[item].address}</td><td>${data[item].qty}</td><td>${data[item].orderid}</td></tr>`
          console.log(typeof data[item].name)
        }
      table.innerHTML=content
  });
