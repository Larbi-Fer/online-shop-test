const exprees = require('express')
const bodyParser = require('body-parser')

const app = exprees()


// json بعث
app.get('/', (req, res, next) => {
    res.json({
        name: "Larbi",
        age: 20
    })
})

app.set('view engine', 'ejs')
app.set('views', 'views')
app.get('/test', (req, res, next) => {
    res.render('test')
})

/* app.post('/', bodyParser.json(), (req, res, next) => {
    console.log(req.body)
    res.json(req.body)
})

app.delete('/', bodyParser.json(), (req, res, next) => {
    console.log(req.body)
    res.json(req.body)
}) */

app.listen(3000, () => console.log("server -- Port 3000"))