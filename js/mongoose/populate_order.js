// Experimenting if mongoose's populate pulls docs
// with the same ids' order specified in the array

var mongoose = require( "mongoose" );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Flow     = require( 'node.flow' );
var flow     = new Flow();

mongoose.connect("mongodb://localhost/populate_order_db");

var UserSchema = new Schema({
  name  : { type : String, required: true },
  email : { type : String, required: true },
  posts : [{ type : ObjectId, ref : 'Post' }]
});

var PostSchema = new Schema({
  user_id : { type : ObjectId, ref : 'User' },
  content : { type : Number, required : true }
});

var User    = mongoose.model( 'User', UserSchema );
var Post    = mongoose.model( 'Post', PostSchema );

// clear db data
flow.series( function ( next ){
  User.collection.drop( function (){
    Post.collection.drop ( function (){
      next();
    });
  });
});

// create user
flow.series( function ( next ){
  new User({
    name  : 'Mason Chang',
    email : 'mason@dreamerslab.com'
  }).save( function ( err ){
    next();
  });
});

// create posts
for( var i = 0; i < 8 ; i++ ){
  flow.series( function ( next ){
    User.findOne( function ( err, user ){
      new Post({
        user_id : user._id,
        content  : Math.floor( Math.random() * 20 )
      }).save( function ( err, post ){
        user.posts.push( post._id );
        user.save( function ( err ){
          next();
        })
      });
    });
  });
}

// user's posts in original order
flow.series( function ( next ){
  User.
    findOne().
    populate( 'posts' ).
    run( function ( err, user ){
      console.log( '\nUser\' posts in original order: ')
      user.posts.forEach( function ( post ){
        console.log( '_id : ', post._id, ', content : ', post.content );
      });
      next()
    });
});

// sort the posts by content
flow.series( function ( next ){
  User.
    findOne().
    populate( 'posts' ).
    run( function ( err, user ){
      var posts = user.posts;

      posts.sort( function ( e1, e2 ){
        if( e1.content > e2.content ){
          return 1;
        }else{
          return -1;
        }
      });
      posts = posts.map( function ( e ){ return e._id; });

      user.posts = posts;
      user.save( function ( err, user ){
        next();
      });
    });
});

// user's posts in new order
flow.series( function ( next ){
  User.
    findOne().
    populate( 'posts' ).
    run( function ( err, user ){
      console.log( '\nUser\' posts in new order: ')
      user.posts.forEach( function ( post ){
        console.log( '_id : ', post._id, ', content : ', post.content );
      });
      next()
    });
});

// end of flow, disconnect mongoose
flow.end( function (){
  mongoose.disconnect();
});


