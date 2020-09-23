const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const DB_URL = "mongodb://localhost/online-shop"

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model('user', userSchema)

exports.createNewUser = (username, email, password) => {

    // check if email exists
    // yes → → error
    // no → → create new acount

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                mongoose.disconnect()
                reject('email is used')
            } else {
                return bcrypt.hash(password, 10)
            }
        }).then(hashedPassword => {
            let user = new User({
                username: username,
                email: email,
                password: hashedPassword
            })
            return user.save()
        }).then(() => {
            resolve('user Created')
            mongoose.disconnect()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}