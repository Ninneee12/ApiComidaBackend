const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./buteco.db',  (err) => {
    if (err){
        console.error(err.message);
        return;
    }
    console.log("SQLitte connected...");
});



module.exports = db;