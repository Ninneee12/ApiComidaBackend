const db = require("../sqlite/db");
const jwt = require('jsonwebtoken');
const validateLogin = require("../validation/login");
const bcrypt = require('bcrypt');

const findByEmailSQL = "select * from tb_login where email = ?";

const login = async (req, res) => {
    const {email, password} = req.body;
    const error = validateLogin.login(req.body);

    if ( error ){
        res.status(400).send(error.details[0].message);
        return;
    }

    db.get(findByEmailSQL, [email], async (err, user) => {
        if ( err ){
            console.log(err);
            res.status(400).send("Erro ao consultar usuário");
            return;
        }
        else if ( !user ){
            res.status(400).send("Credenciais inválidas");
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if( !match ){
            return res.status(401).send("Credenciais inválidas");
        }

        const accessToken = jwt.sign({"email": email, "role": user.perfil_id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s'});
        const refreshToken = jwt.sign({"username": user.nome, "role": user.perfil_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

        await db.run('update tb_login set refresh_token = ? where email = ?', [refreshToken, user.email], (err) => {
            if ( err ){
                console.log(err);
                return res.status(400).send("Erro ao salvar token.");
            }       
            
        });

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 1 * 60 * 60 * 1000});
        res.json({accessToken, "username": user.nome, "role": user.perfil_id});
    })
}

module.exports = {login};