const { COOKIE_BASE_PROPERTIES } = require("../config/cookieProps");
const db = require("../sqlite/db");

const findByRefreshTokenSQL = "select * from tb_login where refresh_token = ?";

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;

     // Is refreshToken in db?
    db.get(findByRefreshTokenSQL, [refreshToken], async (err, user) => {
        if ( err ){
            console.log(err);
            return res.status(400).send("Logout falhou.");
        }

        if ( user){
            //Reove refresh token from DB
            await db.run('update tb_login set refresh_token = null where id = ?', [ user.id], (err) => {
                if ( err ){
                    console.log(err);
                    return res.status(400).send("Erro ao remover token.");
                }       
                
            });

            res.clearCookie('jwt', COOKIE_BASE_PROPERTIES);
            return res.sendStatus(204);
        }
    });

    //res.clearCookie('jwt', COOKIE_BASE_PROPERTIES);
    //res.sendStatus(204);
}

module.exports = { handleLogout }