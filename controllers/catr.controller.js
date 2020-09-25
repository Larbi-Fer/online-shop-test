const cartModel = require('../models/cart.model')
const validationResult = require('../models/checkValue')

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
        req.redirect(req.body.redirectTo)
    }
}