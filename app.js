const express = require('express');
const dotenv =require('dotenv');
const mysqlPool = require('./config/db');
const cors = require('cors');

// configure dotenv
dotenv.config();



//rest object
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Allows only your frontend domain
  }));

//middlewares



//routes
app.use('/api', require('./routes/category'));

app.get('/test', (req, res) => {
    res.status(200).send('<h1> Welcome Nodejs App</h1>')
})

//port

const PORT = process.env.PORT || 8000;


mysqlPool.query('SELECT 1').then(() => {

// Mysql    
console.log("mysqk db connected")
//listen
app.listen(PORT, () =>{
    console.log(`server Running on port ${PORT}`);
});

}).catch((error) =>{
    console.log(error);
})


