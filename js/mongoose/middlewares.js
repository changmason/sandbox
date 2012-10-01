// experimenting with mongoose's middlewares
// http://mongoosejs.com/docs/middleware.html

var mongoose = require( "mongoose" );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connect("mongodb://localhost/middleware_db");

var UserSchema = new Schema({
  name  : { type : String, required: true },
});

UserSchema.pre( 'init', function ( next ){
  console.log( 'HOOK: pre-init' );
  next();
});

UserSchema.post( 'init', function (){
  console.log( 'HOOK: post-init' );
});

UserSchema.pre( 'save', function ( next ){
  console.log( 'HOOK: pre-save' );
  next();
});

UserSchema.post( 'save', function (){
  console.log( 'HOOK: post-save' );
});

// UserSchema.pre( 'isNew', function ( next ){
//   console.log('HOOK: pre-isNew');
//   next();
// });

// UserSchema.post( 'isNew', function (){
//   console.log( 'HOOK: post-isNew' );
// });

UserSchema.pre( 'set', function ( next, path, val){
  console.log( 'HOOK: pre-set ', path, '=', val );
  next();
});

UserSchema.post( 'set', function ( path, val ){
  console.log( 'HOOK: post-set ', path, '=', val );
});

UserSchema.pre( 'remove', function ( next ){
  console.log( 'HOOK: pre-remove' );
  next();
});

UserSchema.post( 'remove', function (){
  console.log( 'HOOK: post-remove' );
});

var User = mongoose.model( 'User', UserSchema );

console.log( "= new User() =" );
user = new User({ name : 'mason' });
console.log( "= end of new =\n\n");

console.log( "= user.save() =");
user.save( function ( err, user ){
  console.log( '= end of save() =\n\n' );

  console.log( "= User.findOne() =");
  User.findOne( function ( err, user ){
    console.log( '= end of findOne() =\n\n' );

    console.log( '= set user.name =' );
    user.name = "chang";
    console.log( '= end of set =\n\n' );

    console.log( '= user.save() again =' );
    user.save( function ( err, user ){
      console.log( '= end of save() again =\n\n' );

      console.log( '= user.remove() =' );
      user.remove( function ( err, user ){
        console.log( '= end of remove() =' );

        mongoose.disconnect();
      })
    });
  });
});


