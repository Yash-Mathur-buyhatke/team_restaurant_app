const dbConnection = require('../databaseConnection')
const itemsToBeDelivered = (req,res) => {

  if(req.session.authenticated && req.session.admin){
      console.log('ght')
      console.log(req.body,'ther')
      var orderId = req.body.value
    const sql = `UPDATE ORDERS SET status=1 WHERE orderid='${orderId}';`
  
  dbConnection.query(sql, async (error, result) => {
    
    //res.send(result);
    res.send({msg:1})
    console.log(error);
})
  }
  else{
    res.send({msg:"you are not authorized"})
  }
      
}

module.exports ={ itemsToBeDelivered}