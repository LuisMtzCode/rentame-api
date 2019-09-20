const express = require('express');
var app = express();
var bodyParser=require('body-parser')
const productsApi=require ('./routes/api/products')
const usersApi=require ('./routes/api/users')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0-w0g03.mongodb.net/test?retryWrites=true&w=majority";

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();

})

app.use(express.urlencoded({extended : true}));
app.use(express.json());
// app.use((req,res,next)=>{
//   if(req.method==='OPTIONS')
//     return res.status(200).send();
//   else
//     next();
// })

app.use("/products", productsApi);
app.use("/users", usersApi);

//Featured Products
app.get('/', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("rentame");
    var query = { isFeatured: "true" };
    dbo.collection("products").find(query).toArray(function(err, result) {
      if (err) throw err; 
      res.send(result)
      db.close();
    });
  }); 
});

app.get('/rents', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("rentame");
    var query = {};
    dbo.collection("rent_products").find(query).toArray(function(err, result) {
      if (err) throw err; 
      res.send(result)
      db.close();
    });
  }); 
});

app.post('/login',(req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("rentame");
    console.log('req-body', req.body);
    const user = dbo.collection("users").findOne(req.body).then((result)=> {
      console.log('user', result);
      const { email, firstName,  lastName } = result;
      res.send({ email, firstName,  lastName });
      db.close();
    }).catch(err => {
      res.send(err);
      db.close();
    });
    
  }); 
});

//Hardcoded simple login
// app.post("/", function(req, res, next) {
//   var id = req.body.user;
//   var pw = req.body.password;

//   if(id == "admin" && pw == "admin") {
//       console.log("loginSuccess")
//       res.send("loginSuccess");
//   }
//   else {
//     console.log("loginFail")
//       res.send("loginFail");
//   }
// });

app.listen(8000,() => {
    console.log('server online');    
})