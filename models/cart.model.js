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
    email: String,
    amount: String,
    address: String,
    status: String,
    time: String
})

const OrderItem = mongoose.model("oreser", orderSchema)

const UserItem = require('./auth.model').user



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


exports.addNewOrder = (data, Productid, userId) => {
    return new Promise(((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            CartItem.deleteOne({ _id: Productid }).catch(err => {
                next(err)
            })
            let email;
            var dataa;
            UserItem.findById(userId).then(user => {
                email = user.email
                dataa = {
                    name: data.name,
                    userId: data.userId,
                    email: email,
                    amount: data.amount,
                    address: data.address,
                    status: "pending",
                    time: data.time
                }
                let NewOrder = new OrderItem(dataa)
                NewOrder.save().then(item => {
                    mongoose.disconnect()
                    resolve(item)
                }).catch(err => {
                    mongoose.disconnect()
                    console.log("error: ", err)
                    reject(err)
                })
            }).catch(err => {
                console.log(err);
                reject(err)
            })
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
                if (item.status == "pending") {
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


exports.getAllOrders = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return OrderItem.find({})
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getOrdersbyStatus = (status) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return OrderItem.find({ status: status })
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getOrdersByEmail = (email) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return OrderItem.find({ email: email })
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.editOrder = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return OrderItem.updateOne({ _id: id }, newData)
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}