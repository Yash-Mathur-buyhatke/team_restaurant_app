const dbConnection = require('../databaseConnection')
const itemsPending = (req,res) => {
  if(req.session.authenticated && req.session.admin){
    const sql = "SELECT * FROM ORDERS WHERE status=0;"
  
  dbConnection.query(sql, async (error, result) => {
    
    res.send(result);
    console.log(error);
})
  }
  else{
    res.send({msg:"you are not authorized"})
  }
      
}

module.exports ={ itemsPending}