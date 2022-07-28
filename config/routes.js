module.exports = (app) => {

  app.route("/users").get(app.api.user.get);

  app.route("/").get(app.api.main.index);

};
