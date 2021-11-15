
console.log('reashed')
const table = document.querySelector('#itemtable');
fetch('/fetchdata')
  .then(response => response.json())
  .then((data) => {
      console.log(data)
      content = table.innerHTML
      var count = 0
      for(var item in data){
          count+=1
          console.log(item , data[item])
          content +=`<tr><td>${data[item].name}</td><td>${data[item].cost}</td><td><input type="number" name="${data[item].name}"></td></tr>`
          console.log(typeof data[item].name)
        }
      table.innerHTML=content
  });
