var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

var mongoose = require('mongoose');

var dbPath="mongodb://localhost/myBlogs";

db = mongoose.connect(dbPath);

mongoose.connection.once('open',function()
	{
		console.log("database connection open successfully");
	});

var Blog= require('./blogModel.js');

var blogModel = mongoose.model('Blog');

app.listen(3000, function () {
  console.log('Blog app listening on port 3000!');
});



app.get('/allBlogs',function(req,res)

{	console.log("creating new blog");
	blogModel.find(function(err,result)
	{
		if(err)
		{
			res.send(err);
		}
		else
		{
			res.send(result);
		}
	});
});

app.post('/createBlog',function(req,res)
{
	var newBlog = new blogModel({

		title		: req.body.title,
		about		: req.body.about,
		genre		: req.body.genre,
		blogContent : req.body.blogContent
});

var today = Date.now();
newBlog.createdOn = today;

newBlog.lastModifiedOn = today;

var allTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):'';
newBlog.tags = allTags;

var authorInfo = {name: req.body.authorName , authorDescription : req.body.description, email: req.body.authorEmail };
newBlog.authorInfo = authorInfo;

newBlog.save( function(error){
	if(error)
	{	
		console.log(error);
		res.send("Some error occured");
	}
	else
	{
		res.send(newBlog);
	}
});
});
app.get('/blog/:blogId',function(req,res){
	blogModel.findOne({'_id':req.params.blogId},function(err,result)
	{
		if(err)
		{
			console.log(err);
			res.send("Some error occured");
		}
		else{
			res.send(result);
		}
	});
});
app.put('/blog/:blogId/edit',function(req,res)
	{
		var update=req.body;

		var today = Date.now();

		update.lastModifiedOn = today;

		blogModel.findOneAndUpdate({'_id':req.params.blogId},update,function(err,result)
			{
				if(err){
					console.log("Some error occured");
					res.send(err);
				}
				else{
					res.send(result);
				}

			}); 

	});
app.post('/blog/:blogId/delete',function(req,res){
	blogModel.remove({'_id':req.params.blogId},function(err,result)
	{
		if(err)
		{
			console.log(err);
			res.send("Some error occured");
		}
		else{
			res.send(result);
		}
	});
});
app.get('*',function(request,response,next)
{
	response.status = 404 ;
	next("Path not found.");
});

//Error handling code

app.use(function(err,req,res,next)
{
	console.log("Some error occured");
	if(res.status==404){
		res.send("The url you requested was not found.");
	}
	else{
		res.send(err);
	}
});


