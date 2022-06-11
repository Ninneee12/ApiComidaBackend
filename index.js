const express = require('express');
const cors = require('cors')
const verifyToken = require('./middleware/verifyToken');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');

require('dotenv').config()

const port = process.env.PORT || 3000;
const app = express();

//Handle options credentials check before CORS
// and fetch cookies  credentials requirement
app.use(credentials);
// enabling CORS for some specific origins only.
app.use(cors(corsOptions));

//Built-in middleware to handle urlencoded from form data
app.use(express.urlencoded({extended:false}));

//Built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//Importando as rotas
const authRoute = require('./routes/login');

//const categoriaRoute = require('./routes/categoria');

//Route Middlewares
app.use('/api', authRoute);
app.use('/api/logout', require('./routes/logout'));

app.use(verifyToken);
app.use('/api/stores', require('./routes/store'));
//app.use('/api/categoria', categoriaRoute);

app.all('*', (req, res) => {
    res.status(404).send("not found!!!!");  
});

app.use((err, req,res,next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));