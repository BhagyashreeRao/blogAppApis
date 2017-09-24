var mongoose = require('mongoose');
var schema = mongoose.schema ;
var blogSchema = new Schema({
 
	title		  	:	 {type:String,default:'',required:true},
	about	  	    :	 {type:String,default:''},
	genre           :    {type:String},
	blogContent   	:    {type:String,default:'',required:true},
	createdOn	  	:    {type:Date},
	lastModifiedOn	:    {type:Date},
	authorDetails	:    {},
	tags			:    [],
	reviews			:    {}
		
	});	
