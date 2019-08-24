const express = require('express');
var app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('ALL OK');
});

app.post('/', (req, res) => {
    res.send('ALL OK POST');
    fakedb.push(req.body);
});

app.put('/', (req, res) => {
    res.send('ALL OK PUT');
});

app.delete('/', (req, res) => {
    res.send('ALL OK DELETE');
});

app.listen(3000,() => {
    console.log('Servidor online');    
})