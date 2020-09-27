const cartModel = require('../models/cart.model')
const validationResult = require('../models/checkValue')

exports.getCart = (req, res, next) => {
    cartModel.getItemsByUser(req.session.userId).then(items => {
        res.render('cart', {
            items: items,
            valisationErrors: req.flash("valisationErrors"),
            isUser: true,
            isAdmin: req.session.isAdmin
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.postCart = (req, res, next) => {
    let r = validationResult.checkVal({
        v: [req.body.amount, {
            notEmpty: {
                msg: "amount is requires"
            },
            min: {
                min: 1,
                msg: "amount must be grater then 0"
            }
        }]
    })

    if (r.length === 0) {
        cartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        }).then(() => {
            res.redirect('/cart')
        }).catch(err => {
            console.log(err)
        })
    } else {
        req.flash('validationError', r)
        res.redirect(req.body.redirectTo)
    }
}

exports.postSave = (req, res, next) => {
    let r = validationResult.checkVal({
        v: [req.body.amount, {
            notEmpty: {
                msg: "amount is requires"
            },
            min: {
                min: 1,
                msg: "amount must be grater then 0"
            }
        }]
    })

    if (r.length === 0) {
        cartModel.editItem(req.body.cartId, {
            amount: req.body.amount,
            timestamp: Date.now()
        }).then(() => res.redirect("/cart")).catch(err => console.log(err))
    } else {
        req.flash("valisationErrors", validationResult.ArrayToString(r))
        res.redirect('/cart')
    }
}

exports.postDelete = (req, res, next) => {
    cartModel.deleteItem(req.body.cartId)
        .then(() => res.redirect("/cart"))
        .catch(err => console.log(err))
}