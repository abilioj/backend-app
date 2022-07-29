// middleware de valida se o usuario é administrador
const admin = require('./admin')

module.exports = (app) => {

  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  app.route("/users")
  //validda as rotas 'app.config.passport.authenticate()'. 
  //com isso a rota precissa de um token valido na requsicao
  .all(app.config.passport.authenticate()) 
  .get(app.api.user.get)
  .post(app.api.user.save)

  app.route("/users/:id")
  .all(app.config.passport.authenticate()) 
  .get(app.api.user.getById)
  .delete(admin(app.api.user.remove))

  app.route("/").get(app.api.main.index);

};
