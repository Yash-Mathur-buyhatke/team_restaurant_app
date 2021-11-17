const dbConnection = require('../databaseConnection')
const itemsPurchased = (req,res) => {
  if(req.session.authenticated){
      const sql = `SELECT * FROM ORDERS WHERE username='${req.session.userName}' and status = 1`
  
    dbConnection.query(sql, async (error, result) => {
    console.log(result)
    res.send(result);
    console.log(error);
})
}
else{
  res.send({
    msg:"you are not authorized"
  })
}
}

module.exports ={ itemsPurchased }