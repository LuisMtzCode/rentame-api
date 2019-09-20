const express = require('express');
const router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0-w0g03.mongodb.net/test?retryWrites=true&w=majority";

//Rent Products
router.post('/rent/add', (req, res) => {
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("rentame");
      dbo.collection("rent_products").insertOne(req.body, function(err, res) {
        if (err) throw err;
        console.log("producto insertado");
        db.close();
      });
    });
  res.send (req.body)
});

router.get('/categories', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rentame"); 
        dbo.collection("products").aggregate([
          {
            $group : {
              _id: { category: "$category" },
            },
          },
          {
            $sort : {"_id.category": 1}
          }
        ]).toArray(function(err, result) {
          if (err) throw err;
          let data = [];
          result.forEach(category => {
            data.push(category._id.category);
          });
          res.send(data)
          db.close();
        });
      }); 
    console.log("Consulta de producto correcta");
});

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

router.get('/:productId', (req, res) => {
   MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("rentame");
     dbo.collection("products").findOne({productId:req.params.productId}, function(err, result) {
       if (err) throw err;
       res.send(result)
       db.close();
     });
   });
  console.log("Consulta de producto correcta");
});


router.post('/add', (req, res) => {

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
        var myquery = {productId:req.body.productId}
        var newvalues = { $set: {title:req.body.title, description:req.body.description, img:req.body.img, 
                                img_alt:req.body.img_alt, productId:req.body.productId,isFeatured:req.body.isFeatured,  
                                price:req.body.price, brand:req.body.brand, status:req.body.status,
                                availableStart:req.body.availableStart, availableEnd:req.body.availableEnd} };
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
        var myquery = {product:req.body.productId}
        dbo.collection("products").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("producto eliminado");
          db.close();
        });
      });
      res.send ("producto eliminado")
});

module.exports = router;
