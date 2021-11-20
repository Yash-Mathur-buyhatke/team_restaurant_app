// structuring done
const dbConnection = require("../databaseConnection");
const orderPlacedPage = (req, res) => {
  if (req.session.authenticated) {
    
    
    return res.status(200).render("orderPlaced")
  }
  else
    res.status(401).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `either you are not authorized or you have not logged in!` },
      ],
    });
};
const purchaseItemsPage = (req, res) => {
  if (req.session.authenticated) return res.status(200).render("purchaseItems");
  else
    res.status(401).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `either you are not authorized or you have not logged in!` },
      ],
    });
};

const historyPage = (req, res) => {
  if (req.session.authenticated) return res.status(200).render("history");
  else
    res.status(401).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `either you are not authorized or you have not logged in!` },
      ],
    });
};



module.exports = {
  purchaseItemsPage,
  historyPage,
  orderPlacedPage,
};
