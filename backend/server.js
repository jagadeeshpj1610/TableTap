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
const paymentRoutes = require('./routes/paymentRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()
const PORT = process.env.PORT

connectDB()

const allowedOrigins = [
    'https://tabletap.22022cm040.workers.dev', 
    'https://tabletap.22022cm040.workers.dev/'  
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
})); 

app.use(express.json())

app.get('/', (req, res) => res.send("Api is running"))
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/waiter-call', waiterCallRoutes)
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes)

console.log(process.env.PORT);


app.listen(PORT, () => console.log("server is running on", PORT))
