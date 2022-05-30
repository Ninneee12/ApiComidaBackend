const router = require('express').Router();
const db = require('../sqlite/db');
const validateLogin = require("../validation/login");
const bcrypt = require('bcrypt');

const findByEmailSQL = "select * from tb_login where email = ?";

const register = (req, res) => {
    const {email, name, password, role} = req.body;
    const error = validateLogin.register(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    db.get(findByEmailSQL, [email], (err, result) => {
        if ( err ){
            console.log(err);
            res.status(400).send("Erro ao consultar usuário.");
            return;
        }

        if ( !result){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            db.run('INSERT INTO tb_login(email, nome, password, perfil_id) VALUES(?, ?, ?, ?)', 
                [email, name, hash, role], (err) => {

                if(err) {
                    console.log(err);
                    res.status(400).send("Erro ao criar usuário.");
                    return;
                }
                res.send("Cadastro criado com sucesso.");
            });
            
        }
        else{
            res.status(400).send("Usuário já cadastrado.");
        }
    })
}

module.exports = {register};