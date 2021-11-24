// structuring done
// response added
const responseGen = require('./responseGenerator')
const dbConnection = require("../databaseConnection");
const orderPlacedPage = (req, res) => {
  if (req.session.authenticated) {
    return res.status(200).render("orderPlaced")
  }
  else
    responseGen.generateNegativeResponse(req,res,"failed",`either you are not authorized or you have not logged in!`,401);
};
const purchaseItemsPage = (req, res) => {
  if (req.session.authenticated) return res.status(200).render("purchaseItems");
  else
  responseGen.generateNegativeResponse(req,res,"failed",`either you are not authorized or you have not logged in!`,401);
};

const historyPage = (req, res) => {
  if (req.session.authenticated) return res.status(200).render("deliveredItems");
  else
  responseGen.generateNegativeResponse(req,res,"failed",`either you are not authorized or you have not logged in!`,401);
};



module.exports = {
  purchaseItemsPage,
  historyPage,
  orderPlacedPage,
};
