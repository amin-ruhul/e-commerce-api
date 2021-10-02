const tokenResponse = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

module.exports = tokenResponse;
