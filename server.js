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

app.get('/', (req, res) => {
  res.send('Server online');    
});

app.post('/login',(req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("rentame");
    console.log('req-body', req.body);
    const user = dbo.collection("users").findOne(req.body).then((result)=> {
      console.log('user', result);
      const { firstName,  lastName } = result;
      res.send({ email, firstName,  lastName });
      db.close();
    }).catch(err => {
      res.send(err);
      db.close();
    });
    
  }); 
});

app.listen(8000,() => {
    console.log('server online');    
})