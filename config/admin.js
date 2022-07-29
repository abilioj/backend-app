// middleware de valida se o usuario é administrador
// middleware é tipo um filtro
//cria a middleware
module.exports = middleware => {
    //pega a requisições, pra pega o usuuario pra validação
    return (req, res, next) => {
        if(req.user.admin){
            middleware(req, res, next)
        } else {
            res.status(401).send("Usuário não é administrador")
        }
    } 
}