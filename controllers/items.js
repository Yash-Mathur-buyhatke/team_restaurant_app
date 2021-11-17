const dbConnection = require('../databaseConnection')
const orderPlacedPage = (req,res)=>{
  
  
    if(req.session.authenticated) return res.render("orderPlaced");
    else res.send({msg:"you are not authorized"})
  
}
const purchaseItemsPage = (req, res) => {
  
    if(req.session.authenticated) return res.render("purchaseItems");
    else res.send({msg:"you are not authorized"})
  };

  
const historyPage = (req,res) => {
  if(req.session.authenticated) return res.render("history");
    else res.send({msg:"you are not authorized"})
  };

  const purchaseItemsForUser = (req,res) => {
    
    var data =new Map(Object.entries(req.body.data))             // Json to Map
    
    for (let [item, value] of data) {
      var address = data.get('address')
      if(item!='address'){
        console.log(address,item,req.session.userName,data.get(item)[1],'pos')
        let sql = `INSERT INTO orders(address,item,username,quantity,status) values('${address}','${item}','${req.session.userName}','${data.get(item)[1]}',0)`;
            dbConnection.query(sql,(error, result) => {
                if (error) {
                  console.log('MAIN ' , sql);
                   
                  return res.status(501).json({ msg: `${error}` });
                }
                
            });
      
      }
      

  }
  return res.send({
    msg:1
  })

  }

  module.exports = { purchaseItemsPage, historyPage, purchaseItemsForUser, orderPlacedPage };