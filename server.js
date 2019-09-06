const express = require('express');
var app = express();
var bodyParser=require('body-parser')
const productsApi=require ('./routes/api/products')
const usersApi=require ('./routes/api/users')

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use("/products", productsApi);
app.use("/users", usersApi);

app.get('/', (req, res) => {
  res.send('Server online');    
});

app.listen(8000,() => {
    console.log('server online');    
})