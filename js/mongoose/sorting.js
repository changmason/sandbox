// defined static method to get sorted results

var mongoose = require( "mongoose" );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connect("mongodb://localhost/sorting_db");

var NumSchema = new Schema({
  contains   : { type : Number },
  created_at : { type : Number, 'default' : Date.now },
  updated_at : { type : Number, 'default' : Date.now }
});

NumSchema.statics = {
  reversed : function( callback ){
    this.find().sort( "-contains" ).exec( callback );
  }
};

var Num = mongoose.model( "Num", NumSchema );
Num.collection.drop( function(){
  new Num( { contains : 1 } ).save();
  new Num( { contains : 2 } ).save();
  new Num( { contains : 3 } ).save();
  new Num( { contains : 4 } ).save();
  new Num( { contains : 5 } ).save();
  Num.reversed(function( err, nums ){
    console.log( nums );
    mongoose.disconnect();
  });
});



