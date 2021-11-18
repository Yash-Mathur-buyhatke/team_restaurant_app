//structuring done
const dbConnection = require("../databaseConnection");
var crypto = require("crypto");

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
      return res.status(200).send({
        success: 1,
        message: "you signed in",
        data: [],
        totalCount: 0,
      });
    } else {
      if (userName === undefined || userName === "") {
        return res.status(401).send({
          success: 0,
          message: "failed",
          errors: [
            {
              message: `either you are not authorized or you have not logged in!`,
            },
          ],
        });
      }
      let sql = `Select * from user where username = ?`;
      dbConnection.query(sql, [userName], async (error, result) => {
        let obj = Object.assign({}, result);

        if (Object.keys(obj).length === 1) {
          let flag = await comparePassword(req, res, password, obj[0].password);

          if (!flag) {
            return res.status(400).send({
              success: 0,
              message: "password was incorrect",
              errors: [],
            });
          } else {
            req.session.authenticated = true;
            req.session.userName = userName;
            if (obj[0].isadmin === 1) {
              req.session.admin = true;
              return res.status(200).send({
                success: 1,
                message: "admin found",
                data: [],
                totalCount: 0,
              });
            } else {
              return res.status(200).send({
                success: 1,
                message: "user found",
                data: [],
                totalCount: 0,
              });
            }
          }
        } else {
          return res.status(401).send({
            success: 0,
            message: "failed",
            errors: [
              {
                message: `either you are not authorized or you have not logged in!`,
              },
            ],
          });
        }
      });
    }
  } catch (err) {
    return res.status(400).send({
      success: 0,
      message: "failed",
      errors: [{ message: `${err}` }],
    });
  }
};

const loginPage = (req, res) => {
  return res.status(400).render("login");
};

module.exports = { loginUserWithEmailAndPassword, loginPage };
