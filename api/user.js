const bcrypt = require('bcrypt');

module.exports = app => {

    // inportando as funcoes de validacoes
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    // função de criptografa
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        // aqui pega os dodos vindo da requisicoes, e ja tratada pela  middleware bodyParser
        const user = { ...req.body }

        // Valida o id de user
        if (req.params.id) user = req.params.id

        // validar os outros atributos de user
        try {
            existsOrError(user.name, "Nome não informado");
            existsOrError(user.email, "E-mail não informado");
            existsOrError(user.password, "Senha não informada");
            existsOrError(user.confirmPassword, "Confirmação de Senha inválida");
            equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");


            if (!user.id) {
                //validade se user exite no banco
                const userFromDB = await app
                    .db("users")
                    .where({ email: user.email })
                    .first();
                notExistsOrError(userFromDB, "Usuário já cadastrado");
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        //fazendo a criptografa da senha
        user.password = encryptPassword(user.password);
        delete user.confirmPassword;

        if (user.id) {//se ouve id ele vai atualiza,se não inser um novo usuario
            app
                .db("users")
                .update(user)
                .whereNull("deletedAt") // verificar se foi deletado virtualmente pela funcao 'remove'
                .where({ id: user.id })
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err));
        } else {
            app
                .db("users")
                .insert(user)
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err));
        }
    }

    const get = (req, res) => {
        app
            .db("users")
            .select("id", "name", "email", "admin")
            //.whereNull("deletedAt") // verificar se foi deletado virtualmente pela funcao 'remove'
            .then((users) => res.json(users))
            .catch((err) => res.status(500).send(err));
    }

    const getById = (req, res) => {
        app.db("users")
            .select("id", "name", "email", "admin")
            .where({ id: req.params.id })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).send(err))
    }

    const remove = (req, res) => {
        res.send("del ok")
    }

    return { save, get, getById, remove }
}