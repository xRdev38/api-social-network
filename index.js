const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

app.get('/',(req,res) => {
    res.json({status:"API is running"});
})

const PORT = process.env.PORT || 8080
app.listen(PORT,() => {
    console.log(`Server running on http://localhost:8080`);
})