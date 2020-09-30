const exprees = require('express')
const bodyParser = require('body-parser')

const app = exprees()

app.get('/', (req, res, next) => {
    res.json({
        name: "mostafa",
        age: "20"
    })
})

app.post('/', bodyParser.json(), (req, res, next) => {
    console.log(req.body)
    res.json(req.body)
})

app.listen(3000, () => console.log("server -- Port 3000"))