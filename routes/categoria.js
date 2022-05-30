const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const db = require('../sqlite/db');
const ROLE_LIST =  require('../config/role_list')
const verifyRoles = require('../middleware/verifyRole')

router.get('/all', /*[verifyToken , verifyRoles(ROLE_LIST.proprietario)],*/ (req, res) => {
    db.all("select * from tb_categoria", [], (err, rows) => {
        if (err){
            console.error(err.message);
            return;
        }

        res.send(rows);
    })

});


module.exports = router;