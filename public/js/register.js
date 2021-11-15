console.log('reached')
var addresses= [];

const addAddress = () => {
  var address = document.getElementById("event").value;
    
  if (addresses.includes(address)) {
    alert("Activity already added")
  } else {
    addresses.push(address)
    document.getElementById("sec").innerHTML += `<li idx="${address.length-1}">${address} <button type="button" onclick="deleteAddress()">Delete</button></li>`
  }
}

const deleteAddress = () => {
  const btn = event.target;
  const index = parseInt(btn.parentElement.getAttribute("idx"), 10);
  addresses.splice(index, 1);
  document.getElementById("sec").innerHTML = addresses.map((address, i) => {
    return `<li idx="${i}">${address} <button type="button" onclick="deleteAddress()">Delete</button></li>`
  });
}