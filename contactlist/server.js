var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contacts' ,['contacts']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req,res)
	   {
	console.log("I received a get request");

//
//	person1 ={
//		name: 'akshay',
//		email: 'akshaysjk@gmail.com',
//		number: '(111) 111 1111'
//	};
//		person2 ={
//		name: 'aadesh',
//		email: 'aadesh@gmail.com',
//		number: '(111) 111 1111'
//	};
//
//		person3 ={
//		name: 'vinay',
//		email: 'vinay@gmail.com',
//		number: '(333) 333 3333'
//	};
//
//	var contactlist = [person1,person2,person3];
//
//	res.json(contactlist);

	db.contacts.find( function (err, docs){
		console.log(docs);
		res.json(docs);
	});


});

app.post('/contactlist', function(req,res)
		{
		console.log(req.body);
	db.contacts.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function(req,res)
		{
	var id  =req.params.id;
		console.log(id);
	db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})

});

app.get('/contactlist/:id', function(req,res)
		{
	var id  =req.params.id;
		console.log(id);
	db.contacts.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})

});

app.put('/contactlist/:id', function(req,res)
		{
	var id  =req.params.id;
		console.log(req.body.name);
	db.contacts.findAndModify({query:{_id: mongojs.ObjectId(id)},
							  update: {$set: {name:req.body.name, email:req.body.email, number:req.body.number}},
							   new: true}, function(err, doc){
		res.json(doc);
	})

});

app.listen(process.env.PORT);
console.log("Running on port 3000");
