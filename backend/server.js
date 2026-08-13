require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>  res.send("Api is running"))
console.log(process.env.PORT);


app.listen(PORT, () => console.log("server is running on" ,PORT))
