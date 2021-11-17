// Done
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const dbConnection = require('../databaseConnection')
const registerPage = (req,res) => {
    return res.render('register')
}

const encryptPassword = async (req,res,password) => {
  try{
    var hash = crypto.createHash('sha256').update(password).digest('hex');
    return hash
  }
    
  catch(err) {
    res.send({
      msg:'something is wrong with password encryption'
    })
  }
  
};
const addPerson = async (req,res,userName,password) => {
    var encryptedPassword = await encryptPassword(req,res,password)
    var sql = `INSERT INTO user (username,password,isadmin) VALUES('${userName}','${encryptedPassword}',0);`
    
    await dbConnection.query(sql, async (error, result) => {
        
        console.log(error);
    })
    return res.send({
      msg:1
    })

}
const registerNewUser = (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
  var { userName, password} = req.body;
  
  try{
    addPerson(req,res,userName,password,0);
  }
  catch(err){
    return res.send({
      error:`${err}`,
      msg:"failed"
    })
}
}

module.exports = { registerPage, registerNewUser }