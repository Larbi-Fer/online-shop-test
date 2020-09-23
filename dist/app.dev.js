"use strict";

var express = require('express');

var path = require('path');

var homeRouter = require('./routes/home.route');

var productRouter = require('./routes/product.router');

var authRouter = require('./routes/auth.router');

var app = express();
var port = 3000;
app.use(express["static"](path.join(__dirname, 'assets')));
app.use(express["static"](path.join(__dirname, 'images')));
app.set('view engine', 'ejs');
app.set('views', 'views');
/*app.get('/', (req, res) => {
    res.render('index')
})*/

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);
app.listen(port, function (err) {
  console.log("error : ", err);
  console.log("Example app listening on port port!");
});