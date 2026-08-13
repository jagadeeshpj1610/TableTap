require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connectToDb')
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express()
const PORT = process.env.PORT

connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>  res.send("Api is running"))
console.log(process.env.PORT);


app.listen(PORT, () => console.log("server is running on" ,PORT))
