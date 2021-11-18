// structuring Done
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
    return res.status(400).send({
      success: 0,
      message: "password can't be hashed",
      errors: [],
    });
  var sql = `INSERT INTO user (username,password,isadmin) VALUES('${userName}','${encryptedPassword}',0);`;

  await dbConnection.query(sql, async (error, result) => {
    if (result) {
      return res.status(200).send({
        success: 1,
        message: "record added successfully",
        data: [],
        totalCount: 1,
      });
    } else {
      return res.status(400).send({
        success: 0,
        message: "something went wrong with sql query!",
        errors: [{ message: `${error}` }],
      });
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
    return res.status(400).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `${err}` },
      ],
    });
  }
};

module.exports = { registerPage, registerNewUser };
