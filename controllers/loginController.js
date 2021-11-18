const dbConnection = require("../databaseConnection");
var crypto = require('crypto');

const comparePassword = async (req, res, password, hashedPassword) => {
try {
  const encodedPassword = crypto.createHash('sha256').update(password).digest('hex');
  if(encodedPassword===hashedPassword) return true;
  return false
} catch (err) {
  res.status(501).json({ msg: `${err}` });
}
};

const loginUserWithEmailAndPassword = (req, res) => {
  const { userName, password } = req.body;
  
  
  try {
    if (req.session.authenticated) {
      console.log('Already')
      res.send({
        msg:1
      })
    }
    else{
      if(userName===undefined || userName==="") return res.send({msg:"you can't sign in"})
    let sql = `Select * from user where username = ?`;
    dbConnection.query(sql, [userName], async (error, result) => {
      let obj = Object.assign({}, result);
      console.log(result);
        
      if (Object.keys(obj).length === 1) {
        let flag = await comparePassword(
          req,
          res,
          password,
          obj[0].password
        );
        if (!flag) {

          return res.send({ error: "sorry try again" });
        } else {
            
            req.session.authenticated = true;
            req.session.userName = userName;
            if(obj[0].isadmin===1) {
              console.log("admin")
              req.session.admin = true;
              res.send({ msg:2})
            }
            else {
              res.send({
                msg:1
              })
            }
          
        }
      } else {
        return res.status(400).json({ msg: "invalid user" });
      }
    });
        }

  } catch (err) {
    
    return res.status(500).json({ msg: `${err}` });
  }
};

const loginPage = (req, res) => {
  return res.render("login");
};

module.exports = { loginUserWithEmailAndPassword, loginPage };
