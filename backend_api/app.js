const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

const HttpError = require('./error-handle/http-error');

const categoriesRouters = require('./routes/categories-routes');
const categoriesControllers = require('./controller/categories-controllers');

const app = express();

app.use(bodyParser.json());

 app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
     );
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
     next();
   });


app.use('/api/categories',categoriesRouters);


app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });

  
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});


mongoose
  .connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true}, 
    {useCreateIndex: true}, 
    {useUnifiedTopology: true}, 
    {useFindAndModify: false}
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

