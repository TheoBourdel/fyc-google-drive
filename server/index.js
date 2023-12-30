const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const router = require('./router');
const app = express();
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})
app.use(cors(
    {
        origin: 'http://localhost:4200',
        methods: 'POST,GET,PUT,OPTIONS,DELETE'
    }
)); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(router);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});