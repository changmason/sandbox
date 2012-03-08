// defined static method to get sorted results

var mongoose = require( "mongoose" );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var NumSchema = new Schema({
  contains   : { type : Number },
  created_at : { type : Number, 'default' : Date.now },
  updated_at : { type : Number, 'default' : Date.now }
});

NumSchema.statics = {
  reversed : function( callback ){
    this.find().sort( "contains", "descending" ).run( callback );
  }
};

mongoose.connect("mongodb://localhost/sortingdb");
var Num = mongoose.model( "Num", NumSchema );
n1 = new Num( { contains : 1 } );  n1.save();
n2 = new Num( { contains : 2 } );  n2.save();
n3 = new Num( { contains : 3 } );  n3.save();
n4 = new Num( { contains : 4 } );  n4.save();
n5 = new Num( { contains : 5 } );  n5.save();

Num.reversed(function( err, nums ){
  console.log( nums );
});

