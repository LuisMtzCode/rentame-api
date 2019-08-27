const express = require('express');
var app = express();
var bodyParser=require('body-parser')



app.use(express.urlencoded({extended : true}));
app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0-w0g03.mongodb.net/test?retryWrites=true&w=majority";

app.get('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        dbo.collection("featuredproducts").find({}).toArray(function(err, result) {
          //Buscar un resultado
          //dbo.collection("customers").findOne({}, function(err, result) {
          if (err) throw err;
          res.send(result)
          db.close();
        });
      }); 
    console.log("Consulta de producto correcta");
});

app.post('/', (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        dbo.collection("featuredproducts").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("producto insertado");
          db.close();
        });
      });
    res.send ("producto insertado")
});

app.put('/', (req, res) => {
    //res.send('ALL OK PUT');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        var myquery = {product:req.body.product}
        var newvalues = { $set: {title:req.body.title, description:req.body.description, img:req.body.img, img_alt:req.body.img_alt, product:req.body.product } };
        dbo.collection("featuredproducts").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("producto actualizado");
          db.close();
        });
    });
    res.send ("producto actualizado")
});

app.delete('/', (req, res) => {
    console.log(req.body)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        var myquery = {product:req.body.product}
        dbo.collection("featuredproducts").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("producto eliminado");
          db.close();
        });
      });
      res.send ("producto eliminado")
});

app.listen(3000,() => {
    console.log('server online');    
})