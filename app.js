import express from 'express'
import db from './mongodb/db.js'
import config from './config'
import router from './routes/index.js'
import winston from 'winston'
import expressWinston from 'express-winston'
import chalk from 'chalk'

const app = express()
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", '3.2.1')
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

router(app);
app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});
var server = app.listen(config.port, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});