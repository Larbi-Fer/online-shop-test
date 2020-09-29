const cartModel = require('../models/cart.model')

exports.getOrders = (req, res, next) => {
    cartModel.getOrdersByUser(req.session.userId).then(items => {
        res.render('orders', {
            orders: items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: "Orders"
        })
    }).catch(err => {
        console.log(err)
        next(err)
    })
}


exports.postOrders = (req, res, next) => {
    cartModel.addNewOrder({
        name: req.body.name,
        userId: req.body.userId,
        amount: req.body.amount,
        address: req.body.address,
        status: "Pending",
        time: Date.now()
    }, req.body.id).then(() => {
        res.redirect("/orders")
    }).catch(err => {
        console.log(err);
        next(err)
    })
}


exports.postCancel = (req, res, next) => {
    cartModel.deleteOrderById(req.body.id).then(() => {
        res.redirect('/orders')
    }).catch(err => {
        console.log(err);
        next(err)
    })
}