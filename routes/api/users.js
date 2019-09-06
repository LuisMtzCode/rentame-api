const express = require('express');
const router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0-w0g03.mongodb.net/test?retryWrites=true&w=majority";

router.get('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame"); 
        dbo.collection("users").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result)
          db.close();
        });
      }); 
    console.log("Consulta de usuario correcta");
});

router.post('/', (req, res) => {

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

router.put('/', (req, res) => {
    //res.send('ALL OK PUT');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        var myquery = {userId:req.body.userId}
        var newvalues = { $set: {userId:req.body.userId, userName:req.body.userName, createDate:req.body.createDate,
                                email:req.body.email, password:req.body.password, firstName:req.body.firstName, 
                                lastName:req.body.lastName
                                } };
        dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("usuario actualizado");
          db.close();
        });
    });
    res.send ("usuario actualizado")
});

router.delete('/', (req, res) => {
    console.log(req.body)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        var myquery = {userId:req.body.userId}
        dbo.collection("users").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("usuario eliminado");
          db.close();
        });
      });
      res.send ("usuario eliminado")
});

module.exports = router;
