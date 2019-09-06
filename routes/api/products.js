const express = require('express');
const router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0-w0g03.mongodb.net/test?retryWrites=true&w=majority";

router.get('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame"); 
        dbo.collection("products").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result)
          db.close();
        });
      }); 
    console.log("Consulta de producto correcta");
});



router.post('/', (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        dbo.collection("products").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("producto insertado");
          db.close();
        });
      });
    res.send ("producto insertado")
});

router.put('/', (req, res) => {
    //res.send('ALL OK PUT');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        var myquery = {product:req.body.product}
        var newvalues = { $set: {title:req.body.title, description:req.body.description, img:req.body.img, 
                                img_alt:req.body.img_alt, product:req.body.product,isFeatured:req.body.isFeatured  } };
        dbo.collection("products").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("producto actualizado");
          db.close();
        });
    });
    res.send ("producto actualizado")
});

router.delete('/', (req, res) => {
    console.log(req.body)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame");
        var myquery = {product:req.body.product}
        dbo.collection("products").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("producto eliminado");
          db.close();
        });
      });
      res.send ("producto eliminado")
});

module.exports = router;
