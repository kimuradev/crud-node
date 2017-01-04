const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs');
var db;

MongoClient.connect('mongodb://test:test@ds151048.mlab.com:51048/mongodb-quotes', (err, database) => {
  // ... start the server
	if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
	console.log('conectado!!');
})

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	//res.sendFile(__dirname + '/index.html')
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/')
  })
});
