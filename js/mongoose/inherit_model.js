// make multiple mongoose models inherit the same model,
// https://groups.google.com/forum/#!msg/mongoose-orm/aeqGRRnpFvg/W5joNlj8AHkJ

// Note: base validations DOES work in derived models

var util     = require( 'util' );
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var options  = {
  collection : 'animals',
  versionKey : false
};

mongoose.connect( 'mongodb://localhost/inherit_model' );

// define base schema
var BaseSchema = function (){
  Schema.apply( this, arguments );

  this.add({
    kind : { type : String, required : true },
    life : { type : String, default : '1 year' }
  });
};

util.inherits( BaseSchema, Schema );

// define derived schema
var AnimalSchema = new BaseSchema({
  life : { type : String, default : 'override fail' }
}, options );

var JaguarSchema = new BaseSchema({
  rush : { type : String, required : true }
}, options );

var TurtleSchema = new BaseSchema({
  swim : { type : String, required : true }
}, options );

// must use add() to override BaseSchema
JaguarSchema.add({
  life : { type : String, default : '50 years' }
});

TurtleSchema.add({
  life : { type : String, default : '100 years' }
});

// register models
var Animal = mongoose.model( 'Animal', AnimalSchema );
var Jaguar = mongoose.model( 'Jaguar', JaguarSchema );
var Turtle = mongoose.model( 'Turtle', TurtleSchema );

// // experimenting
Animal.remove( function ( err, count ){

  Animal.create({ kind : 'animal' }, function ( err, doc ){
    if( err ) console.log( 'Animal creation fail: ',  err );

    Jaguar.create({ kind : 'jaguar', rush : '60 mph' }, function ( err, doc ){
      if( err ) console.log( 'Jaguar creation fail: ',  err );

      Turtle.create({ kind : 'turtle', swim : '10 mph' }, function ( err, doc ){
        if( err ) console.log( 'Turtle creation fail: ',  err );

        Animal.find( function ( err, docs ){
          if( err ){
            console.log( 'Fail to find: ', err );
          }else{
            console.log( 'All animals:\n', docs );
          }

          mongoose.disconnect();
        });
      });
    });
  });
});

