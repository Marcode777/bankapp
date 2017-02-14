var express = require('express'); //express is the Node framework. 
var app = express();
var mongojs = require('mongojs'); ////mongoose (or mongojs), is the ORM we will use to communicate with our MongoDB database. 
var db = mongojs('bankapp', ['bankapp']);
var bodyParser = require('body-parser');////body-parser will let us pull POST content from our HTTP request so that we can do things like create a bear.

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true})); //this is a new addition
app.use(bodyParser.json());

app.get('/bankapp', function(req, res){
  console.log("I received a get request")

  

  db.bankapp.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  })
});

app.post('/bankapp', function(req, res){
    console.log(req.body);
    db.bankapp.insert(req.body, function(err, doc){ //the bankapp that is mentioned here is the collection bankapp, not the database bankapp
        res.json(doc);
    })
})

app.post('/register', function (req, res) { // this is for user registration
        console.log(req.body)
        db.users.insert(req.body,  function(err, doc){
      console.log("success");
       return res.status(200).json({
        status: 'Registration successful!'
      });

  });
});





app.delete('/bankapp/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.bankapp.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })
})

app.get('/bankapp/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.bankapp.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});



app.put('/bankapp/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.bankapp.findAndModify({query: {_id: mongojs.ObjectId(id)}, //changed from outer () to outer {}
        update: {$set: {number: req.body.number, name: req.body.name, amount: req.body.amount}}, // changed inner () to {}
        new: true}, function (err, doc) {
            res.json(doc);
        });

});



app.listen(3300);
console.log("server running on PORT 3300!")

// expressjs helps organize the web app into an mvc structure on the server side, it basically helps manage everything from routes to handling requests and views, then a database such as mongodb, etc. can then be used provide a backend for this nodejs application
//mongodb is the database used
//requiring mongojs requires the mongojs module so we can use it
// var db = mongojs specifies bankapp is the database used within mongodb
// bodyParser is needed to for the server to parse through body of the data of the input, so we require it
// app.get is used to define the route
// db.bankapp.find has the server find the data
// app.get, app.post, and so on and so forth