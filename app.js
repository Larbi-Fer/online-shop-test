const express = require('express')
const path = require('path')

const homeRouter = require('./routes/home.route')

const productRouter = require('./routes/product.router')

const app = express()
const port = 3000

app.use( express.static( path.join( __dirname, 'assets' ) ) )
app.use( express.static( path.join( __dirname, 'images' ) ) )

app.set( 'view engine', 'ejs' )
app.set( 'views', 'views' )

/*app.get('/', (req, res) => {
    res.render('index')
})*/

app.use( '/', homeRouter )
app.use( '/product', productRouter )

app.listen(port, (err) => {
    console.log("error : ",err)
    console.log(`Example app listening on port port!`)
})