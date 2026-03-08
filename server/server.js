const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.options('*',cors())

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});


const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const customerRoutes = require('./routes/customer');

app.use(`/api/products`,productRoutes);
app.use(`/api/users`,userRoutes);
app.use(`/api/customer`, customerRoutes);


mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, ()=>{
    console.log(`server is running http://localhost:${process.env.PORT}`);
})