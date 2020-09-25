const productsModel = require('../models/products.model')

exports.getHome = (req, res, next) => {

    // get category
    // if category && category != all
    //      fillter
    // else
    //      render all

    let promctsPromise
    let validCategories = ['clothes', 'phones', 'computers']
    let category = req.query.category
    if (category && validCategories.includes(category)) promctsPromise = productsModel.getProductsByCategory(category)
    else promctsPromise = productsModel.getAllProducts()

    promctsPromise.then(products => {
        res.render('index', {
            products: products,
            isUser: req.session.userId
        })
    })
}