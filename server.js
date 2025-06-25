const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const { resolveMx } = require('dns');
const multer = require('multer');
const io = require('socket.io')(server);
const mercadopago = require('mercadopago');
mercadopago.configure({
    sandbox: true,
    access_token: ''
});




const ordersSocket = require('./sockets/ordersSocket');


/* 
*IMPORTAR RUTAS
*/

const usersRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/orderRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

ordersSocket(io);

const upload = multer({
    storage: multer.memoryStorage()
});
/* 
*LLAMADO DE LAS RUTAS
*/
usersRoutes(app, upload);
categoriesRoutes(app);
productRoutes(app, upload);
addressRoutes(app, upload);
ordersRoutes(app);
mercadoPagoRoutes(app);

server.listen(3000, '192.168.1.38' || 'localhost', function() {
    console.log('Applicacion de NodeJS ' + port + ' Iniciada ...')
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

app.get('/test', (req, res) => {
    res.send('Esta es la ruta TEST');
});
// ERROR HANDLER
app.use((error, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});
