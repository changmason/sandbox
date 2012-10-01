// Demo the one-to-many naming convention in the
// fileds which are used for mongoose populate()

var Flow     = require( 'node.flow' );
var flow     = new Flow();
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  name     : { type : String, index : true },
  post_ids : [{ type : ObjectId, ref : 'Post' }],
});

var PostSchema = new Schema({
  user_id : { type : ObjectId, ref : 'User' },
  title   : { type : String },
});

mongoose.connect( 'mongodb://localhost/convention' );
var User = mongoose.model( 'User', UserSchema );
var Post = mongoose.model( 'Post', PostSchema );

// Fill user and post data
var fill = function ( callback ){
  // clearing all collections
  User.collection.drop( function (){
    Post.collection.drop( function (){

      // creating a user
      new User({ name : 'mason' }).save( function ( err, user ){
        User.findOne({ name : 'mason' }, function ( err, user ){

          // creating user's post
          new Post({ user_id : user._id, title : 'title' }).save( function( err, post ){
            user.post_ids.push( post );
            user.save( function ( err, user ){

              // end of operations
              console.log( '# Fill data job is done!!\n' );
              callback && callback()
            });
          });

        });
      });

    });
  });
};

// Display all data for checking
var check = function ( callback ){
  User.findOne().exec( function ( err, user ){
    console.log( '# Before populate()' );
    console.log( '- user : \n', user );
    Post.findOne().exec( function ( err, post ){
      console.log( '- post : \n', post, '\n' );

      User.findOne().populate( 'post_ids' ).exec( function ( err, user ){
        console.log( '# After populate()' );
        console.log( '- user : \n', user );
        Post.findOne().populate( 'user_id' ).exec( function ( err, post){
          console.log( '- post : \n', post, '\n' );
          mongoose.disconnect();
        });
      });

    });
  });
};

fill( check );