const productsModel = require( '../models/products.model' )

exports.getHome = (req, res, next) => {
    // get products
    // render index.ejs

    productsModel.getAllProducts().then(products => {
        res.render('index', {
            products: products
        })
    })
}