module.exports = (app) => {
  const index = (req, res) => {
    res.send("home");
  };

  return { index };
};
