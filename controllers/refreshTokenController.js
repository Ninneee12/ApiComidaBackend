
const db = require("../sqlite/db");
const jwt = require('jsonwebtoken');
const findByRefreshTokenSQL = "select * from tb_login where refresh_token = ?";

const refreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    db.get(findByRefreshTokenSQL, [refreshToken], (err, result) => {
        if ( err ){
            console.log(err);
            return res.status(403).send({"message": "Token inválido."});
        }
        else if ( !result || result.refresh_token !== refreshToken){
            return res.status(403).send({"message": "Token inválido."});
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || result.nome !== decoded.username) return res.sendStatus(403);
                
                const accessToken = jwt.sign(
                    {"email": result.email, "role": result.perfil_id},
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                res.json({accessToken })
            }
        );
    });
}

module.exports = {refreshToken}