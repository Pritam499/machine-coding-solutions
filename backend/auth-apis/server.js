const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})