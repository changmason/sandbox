// experimenting with mongoose's plugin lifecycle
// https://github.com/fzaninotto/mongoose-lifecycle

var mongoose = require( "mongoose" );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connect("mongodb://localhost/lifecycle_db");

var UserSchema = new Schema({
  name  : { type : String, required: true },
});

UserSchema.plugin( require( 'mongoose-lifecycle' ));

var User = mongoose.model( 'User', UserSchema );

User.on( 'beforeSave', function ( user ){
  console.log( 'HOOK: beforeSave' );
});

User.on( 'afterSave', function ( user ){
  console.log( 'HOOK: afterSave' );
});

User.on( 'beforeInsert', function ( user ){
  console.log( 'HOOK: beforeInsert' );
});

User.on( 'afterInsert', function ( user ){
  console.log( 'HOOK: afterInsert' );
});

User.on( 'beforeUpdate', function ( user ){
  console.log( 'HOOK: beforeUpdate' );
});

User.on( 'afterUpdate', function ( user ){
  console.log( 'HOOK: afterUpdate' );
});

User.on( 'beforeRemove', function ( user ){
  console.log( 'HOOK: beforeRemove' );
});

User.on( 'afterRemove', function ( user ){
  console.log( 'HOOK: afterRemove' );
});

console.log( "= new User() =" );
var user = new User({ name : 'mason' });
console.log( "= end of new =\n\n");

console.log( "= user.save() =");
user.save( function ( err, user, count ){
  console.log( '= end of save() =\n\n' );

  user.name = 'chang';

  console.log( '= user.save() again =' );
  user.save( function ( err, user, count ){
    console.log( '= end of save() again =\n\n' );

    console.log( '= user.remove() =' );
    user.remove( function ( err, user ){
      console.log( '= end of remove() =' );

      mongoose.disconnect();
    });
  });
});


