const express = require('express');
var app = express();
var bodyParser=require('body-parser')



app.use(express.urlencoded({extended : true}));
app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0-txmac.mongodb.net/test?retryWrites=true&w=majority";

app.get('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        dbo.collection("users").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result)
          db.close();
        });
      }); 
    console.log("Consulta a usuario correcta");
});

app.post('/', (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        dbo.collection("users").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("usuario insertado");
          db.close();
        });
      });
    res.send ("usuario insertado")
});

app.put('/', (req, res) => {
    //res.send('ALL OK PUT');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        var myquery = {id:req.body.id}
        var newvalues = { $set: {name: req.body.name, lastname: req.body.lastname } };
        dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("usuario actualizado");
          db.close();
        });
    });
    res.send ("usuario actualizado")
});

app.delete('/', (req, res) => {
    console.log(req.body)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        var myquery = {id:req.body.id}
        dbo.collection("users").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("Usuario eliminado");
          db.close();
        });
      });
      res.send ("Usuario eliminado")
});

app.listen(3000,() => {
    console.log('Servidor online');    
})