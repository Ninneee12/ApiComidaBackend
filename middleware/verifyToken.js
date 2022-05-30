/**
 * Esse middleware verifica se o Token é valido.
 */
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if ( !authHeader?.startsWith('Bearer ') ){
        return res.status(401).send("Você não tem autorização para acessar esse recurso");
    }

    try {
        console.log(authHeader);
        //Bearer Token
        const token = authHeader.split(' ')[1];

        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(401);
            req.email = decoded.email;
            req.role = decoded.role;
        });
        
        next();
    } catch (error) {
        res.status(401).send("Sessão Inválida");
    }
}