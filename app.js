const express = require('express');
const mongoose = require('mongoose');

const loginRoutes = require('./routes/login-route');
const signupRoutes = require('./routes/signup-route');
const homeRoutes = require('./routes/home-route');

const HttpError = require('./models/http-error');



const app = express();

app.use(express.json());
app.use(express.static("public"))




app.use((req,res,next)=>{

  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PATCH');
  next();


});


app.use('/api/login',loginRoutes);
app.use('/api/signup',signupRoutes);
app.use('/api/home',homeRoutes);

app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

app.use((req,res,next)=>{
    const error = new HttpError('could not find this route',404);
    throw error;
});



mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusteretark.l4gac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
   
  })
  .catch(() => {
    console.log("Connection failed!");
  });

