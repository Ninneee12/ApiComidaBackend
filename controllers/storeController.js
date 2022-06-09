const db = require("../sqlite/db");

const findAllSQL = 'select * from tb_buteco order by nome_buteco';

const findAll = (req, res) => {

    db.all(findAllSQL, [], (err, stores) => {
        if ( err ){
            console.log(err);
            return res.status(400).send("Erro ao consultar Bares.");
        }        
        res.send(stores);
    });
}

module.exports = {findAll};