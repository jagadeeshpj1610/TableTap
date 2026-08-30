require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connectToDb')
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const menuRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/orderRoutes')
const tableRoutes = require('./routes/tableRoutes')
const waiterCallRoutes = require('./routes/waiterCallRoutes')

const app = express()
const PORT = process.env.PORT

connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>  res.send("Api is running"))
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/waiter-call', waiterCallRoutes)

console.log(process.env.PORT);


app.listen(PORT, () => console.log("server is running on" ,PORT))
