/**
 * Esse midddleware é usado para validar se o usuário possui
 * a role correta para acessar o recurso.
 */


/**
 * Verifica se a role do user é valido
 * @param  {...any} allowedRoles Lista de Roles que podem acessar um determinado recurso
 * @returns 
 */
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if ( !req?.role ) return res.sendStatus(401);

        const roles = [...allowedRoles];
        console.log(roles);
        console.log(req.role);
        
        const result = roles.includes(req.role);

        if ( !result ){
            return res.sendStatus(401);
        }
        next();

    }
}

module.exports = verifyRoles