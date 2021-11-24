// structuring Done
// response added
const responseGen = require('./responseGenerator')
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const dbConnection = require("../databaseConnection");
const registerPage = (req, res) => {
  return res.status(400).render("register");
};

const encryptPassword = async (req, res, password) => {
  try {
    var hash = crypto.createHash("sha256").update(password).digest("hex");
    return hash;
  } catch (err) {
    return "";
  }
};
const addPerson = async (req, res, userName, password) => {
  var encryptedPassword = await encryptPassword(req, res, password);
  if (encryptedPassword == undefined || encryptedPassword == "")
  responseGen.generateNegativeResponse(req,res,"password can't be hashed","",400);
  var sql = `INSERT INTO users (username,password,isadmin) VALUES('${userName}','${encryptedPassword}',0);`;

  await dbConnection.query(sql, async (error, result) => {
    if (result) {
      responseGen.generatePositiveResponse(req,res,"record added successfully",[],1,200);

    } else {
      responseGen.generateNegativeResponse(req,res,"something might happened wrong with my sql query",error,400);
    }
  });
};
const registerNewUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    return res.status(400).send({
      success: 0,
      message: "failed",
      errors: errors.array(),
    });
  }

  var { userName, password } = req.body;

  try {
    addPerson(req, res, userName, password, 0);
  } catch (err) {
    responseGen.generateNegativeResponse(req,res,"failed",err,400);
  }
};

module.exports = { registerPage, registerNewUser };
