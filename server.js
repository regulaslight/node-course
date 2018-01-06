const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear' , ()=>{

  return new Date().getFullYear();

});


app.use((req,res,next) => {

  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log' , log + '\n' , (err)=>{
    if(err)
    {
      console.log("could not save log to file");
    }

  });

  next();

});

// app.use((req,res,next)=>{
//
//   res.render('maintenence.hbs');
//
// });

app.get('/' , (req , res) => {
  //res.send('<h1>Hello Express</h1>');
  res.render('home.hbs' , {
    pageTitle: 'Welcome to my Home Page',
    //currentYear: new Date().getFullYear()
  });

});

app.get('/about' , (req,res) => {

  res.render('about.hbs' , {
    pageTitle: 'Welcome to About Page',
    //currentYear: new Date().getFullYear()
  });

});

app.set('view engine' , 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/bad' , (req,res) => {

    res.send({

        error : "Unable to complete request"

    });

});
app.listen(3000);

// new route bad
// send json with error message property
