// structuring done
const dbConnection = require('../databaseConnection')
const itemsForSell = (req,res) => {
  if(req.session.authenticated){
    const sql = "SELECT * FROM ITEMS;"
  
  dbConnection.query(sql, async (error, result) => {
    
    if(result) {
      var size = result.length;
      return res.status(200).send({
        success: 1,
        message: "records fetched successfully",
        data: result,
        totalCount: size,
      });
    }
    else {
      return res.status(400).send({
        success: 0,
        message: "something went wrong with sql query!",
        errors:[
          {message:`${error}`}
        ]
    })
    }
    
})
  }
  else{
    return res.status(401).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `either you are not authorized or you have not logged in!` },
      ],
    });
  }
      
}

module.exports ={ itemsForSell}