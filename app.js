const express = require('express')
const path = require('path')

const session = require ('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')    // install

const homeRouter = require('./routes/home.route')

const productRouter = require('./routes/product.router')
const authRouter = require('./routes/auth.router')

const app = express()
const port = 3000

app.use( express.static( path.join( __dirname, 'assets' ) ) )
app.use( express.static( path.join( __dirname, 'images' ) ) )
app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/online-shop',
    collection: 'sessions'
})

app.use(session({
    secret: 'this is my secret secreat to hash express sessions .......',
    saveUninitialized: false,
    store: STORE
}))

app.set( 'view engine', 'ejs' )
app.set( 'views', 'views' )


app.use( '/', homeRouter )
app.use('/', authRouter)
app.use( '/product', productRouter )

app.listen(port, (err) => {
    console.log("error : ",err)
    console.log(`Example app listening on port port!`)
})