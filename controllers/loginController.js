//structuring done
// response added
const dbConnection = require("../databaseConnection");
var crypto = require("crypto");
const responseGen = require("../responseGen");
const comparePassword = async (req, res, password, hashedPassword) => {
  try {
    const encodedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    if (encodedPassword === hashedPassword) return true;
    return false;
  } catch (err) {
    return false;
  }
};

const loginUserWithEmailAndPassword = (req, res) => {
  const { userName, password } = req.body;

  try {
    if (req.session.authenticated) {
      responseGen.generatePositiveReponse(req,res,"you signed in!",[],0,200);
    } else {
      if (userName === undefined || userName === "") {
        responseGen.generateNegativeReponse(req,res,"failed",`either you are not authorized or you have not logged in!`,401);
      }
      let sql = `Select * from user where username = ?`;
      dbConnection.query(sql, [userName], async (error, result) => {
        let obj = Object.assign({}, result);

        if (Object.keys(obj).length === 1) {
          let flag = await comparePassword(req, res, password, obj[0].password);

          if (!flag) {
            responseGen.generateNegativeReponse(req,res,"password was incorrect!","",400);
          } else {
            req.session.authenticated = true;
            req.session.userName = userName;
            if (obj[0].isadmin === 1) {
              req.session.admin = true;
              responseGen.generatePositiveReponse(req,res,"admin found",[],0,200); 
            } else {
              responseGen.generatePositiveReponse(req,res,"user found",[],0,200);
            }
          }
        } else {
          responseGen.generateNegativeReponse(req,res,"failed",`either you are not authorized or you have not logged in!`,401);
        }
      });
    }
  } catch (err) {
    responseGen.generateNegativeReponse(req,res,"failed",err,400);
  }
};

const loginPage = (req, res) => {
  return res.status(400).render("login");
};

module.exports = { loginUserWithEmailAndPassword, loginPage };
