
const express = require('express');
require('dotenv').config();
const productRoutes = require('./routes/product');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})