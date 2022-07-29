module.exports = (app) => {

  app.route("/users")
  .get(app.api.user.get)
  .post(app.api.user.save)

  app.route("/").get(app.api.main.index);

};
