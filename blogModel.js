var mongoose = require('mongoose');

var Schema = mongoose.Schema ;

var blogSchema = new Schema({
 	blogId          :    {type:String,default:'',required:true},      
	title		  	:	 {type:String,default:'',required:true},
	about	  	    :	 {type:String,default:''},
	genre           :    {type:String},
	blogContent   	:    {type:String,default:'',required:true},
	createdOn	  	:    {type:Date},
	lastModifiedOn	:    {type:Date},
	authorInfo	    :    {},
	tags			:    [],
	imageUrl		:    {type:String,default:''},
	likes			:    {type:Number,default:0},		
	});	

var feedbackSchema = new Schema({
	blogId          :    {type:String,default:'',required:true},
	readerName      :    {type:String,default:'Anonymous'},
	Created			: 	 {type:Date} 
	});


mongoose.model('Blog',blogSchema);
mongoose.model('feedback',feedbackSchema);