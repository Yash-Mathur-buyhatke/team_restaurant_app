const dbConnection = require('../databaseConnection')
const itemsForSell = (req,res) => {
  if(req.session.authenticated){
    const sql = "SELECT * FROM ITEMS;"
  
  dbConnection.query(sql, async (error, result) => {
    
    res.send(result);
    console.log(error);
})
  }
  else{
    res.send({msg:"you are not authorized"})
  }
      
}

module.exports ={ itemsForSell}