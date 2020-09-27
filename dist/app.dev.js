"use strict";

var express = require('express');

var path = require('path');

var session = require('express-session');

var SessionStore = require('connect-mongodb-session')(session);

var flash = require('connect-flash'); // install


var homeRouter = require('./routes/home.route');

var productRouter = require('./routes/product.router');

var authRouter = require('./routes/auth.router');

var cartRouter = require('./routes/cart.router');

var adminRouter = require('./routes/admin.router');

var app = express();
var port = 3000;
app.use(express["static"](path.join(__dirname, 'assets')));
app.use(express["static"](path.join(__dirname, 'images')));
app.use(flash());
var STORE = new SessionStore({
  uri: 'mongodb://localhost:27017/online-shop',
  collection: 'sessions'
});
app.use(session({
  secret: 'this is my secret secreat to hash express sessions .......',
  saveUninitialized: false,
  store: STORE
}));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);
app.listen(port, function (err) {
  console.log("error : ", err);
  console.log("Example app listening on port port!");
});