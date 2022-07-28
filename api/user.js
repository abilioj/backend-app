module.exports = app => {
    const save = (req, res) => {
    }

    const get = (req, res) => {
        // res.send('/users')
        const produtos = [
            {nome: "abilio", id: 1},
            {nome: "jose", id: 2},
            {nome: "ana", id: 3}
        ]
        res.json(produtos)
    }

    const getById = (req, res) => {
    }

    const remove = (req, res) => {
    }

    return {save,get,getById,remove}
}