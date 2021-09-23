const getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "All product",
  });
};

module.exports = {
  getProducts,
};
