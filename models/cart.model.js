const mongoose = require('mongoose')


const DB_URL = "mongodb://localhost:27017/online-shop"

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
})

const CartItem = mongoose.model("cart", cartSchema)

const orderSchema = mongoose.Schema({
    name: String,
    userId: String,
    amount: String,
    address: String,
    status: String,
    time: String
})

const OrderItem = mongoose.model("oreser", orderSchema)



exports.addNewItem = data => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            let item = new CartItem(data)
            return item.save()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}


exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.find({ userId: userId }, {}, { sort: { timestamp: -1 } })
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.updateOne({ _id: id }, newData)
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.findByIdAndDelete(id)
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.addNewOrder = (data, id) => {
    return new Promise(((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            let NewOrder = new OrderItem(data)
            CartItem.deleteOne({ _id: id }).catch(err => {
                next(err)
            })
            console.log(id)
            return NewOrder.save()
        }).then(item => {
            mongoose.disconnect()
            resolve(item)
        }).catch(err => {
            mongoose.disconnect()
            console.log("error: ", err)
            reject(err)
        })
    }))
}


exports.getOrdersByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return OrderItem.find({ userId: userId }, {}, { sort: { timestamp: -1 } })
        }).then((items) => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.deleteOrderById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            OrderItem.findById(id).then(item => {
                if (item.status == "Pending") {
                    return OrderItem.deleteOne({ _id: id })
                }
            }).then(resl => {
                mongoose.disconnect()
                resolve(resl)
            }).catch(err => {
                reject(err)
            })
        })
    })
}