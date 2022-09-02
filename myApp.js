let express = require('express');
let app = express();
const axios = require('axios')
require('dotenv').config()
const cors = require('cors')
let bodyParser = require('body-parser')

app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


let absolutePath = __dirname + '/views/index.html'

app.use(express.json())
app.use("/public", express.static(__dirname + '/public'))



app.post('/', (req, res, next) => {
    let selectedCustomer = req.body.selectedCustomer
    let shippingAddress = req.body.shippingAddress
    let deliveryDate = req.body.deliveryDate
    let selectedProducts = req.body.selectedProducts
    let orderReference = req.body.orderReference

    axios.post(`https://eu1.babelway.net/rest/USBE/message.json`, {
        selectedCustomer: req.body.selectedCustomer,
        shippingAddress: req.body.shippingAddress,
        deliveryDate: req.body.deliveryDate,
        selectedProducts: req.body.selectedProducts,
        orderReference: req.body.orderReference
    }, {auth: {
        username: process.env.BA_USERNAME,
        password: process.env.BA_PASSWORD
    }}).then(response => {
        console.log(selectedCustomer + '; ' + shippingAddress + '; ' + deliveryDate + '; ' + '; ' + selectedProducts + '; ' + orderReference)
        res.sendStatus(response.status)
    })
    .catch(error => res.send(error))
})




module.exports = app;
