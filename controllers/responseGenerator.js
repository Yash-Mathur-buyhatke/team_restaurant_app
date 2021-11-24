const generatePositiveReponse = (req, res, message, data, count, code) => {
  return res.status(code).send({
    success: 1,
    message: message,
    data: data,
    totalCount: count,
  });
};

const generateNegativeResponse = (req, res, message, error, code) => {
  return res.status(code).send({
    success: 0,
    message: message,
    errors: [{ message: `${error}` }],
  });
};

module.exports = { generateNegativeResponse, generatePositiveReponse };
