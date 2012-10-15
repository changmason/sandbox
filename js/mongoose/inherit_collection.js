// make multiple mongoose models inherit the same collection, therefore
// common properties are kept in base model, and other properties are
// maintained in derived models

// Note: base validations do NOT work in derived models

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var options  = {
  collection : 'animals',
  versionKey : false,
  strict     : false // required option
};

mongoose.connect( 'mongodb://localhost/inherit_collection' );

// define schema
var AnimalSchema = new Schema({
  kind : { type : String, required : true }
}, options );

var JaguarSchema = new Schema({
  rush : { type : String, required : true }
}, options );

var TurtleSchema = new Schema({
  swim : { type : String, required : true }
}, options );

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

