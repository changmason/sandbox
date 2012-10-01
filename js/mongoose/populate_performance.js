// Benchmarking mongoose's populate, and compare
// with other ways to pull docs

var mongoose = require( "mongoose" );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Flow     = require( 'node.flow' );
var flow     = new Flow();

mongoose.connect("mongodb://localhost/populate_performance_db");

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
for( var i = 0; i < 2000 ; i++ ){
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

// use populate() to pull posts
flow.series( function ( next ){
  console.time( '(1) user#populate to get posts' );
  User.
    findOne().
    populate( 'posts' ).
    exec( function ( err, user ){
      console.timeEnd( '(1) user#populate to get posts' );
      console.log(     '    post count: ', user.posts.length );
      next()
    });
});

// use find $in ids to pull posts
flow.series( function ( next ){
  console.time( '(2) find in ids to get posts' );
  User.findOne( function ( err, user ){
    Post.find({ _id : { $in : user.posts }}, function ( err, posts ){
      console.timeEnd( '(2) find in ids to get posts' );
      console.log(     '    post count: ', posts.length );
      next();
    });
  });
});

// use find by user_id to pull posts
flow.series( function ( next ){
  console.time( '(3) find by user_id to get posts' );
  User.findOne( function ( err, user ){
    Post.find({ user_id : user._id }, function ( err, posts ){
      console.timeEnd( '(3) find by user_id to get posts' );
      console.log(     '    post count: ', posts.length );
      next();
    });
  });
});

// end of flow, disconnect mongoose
flow.end( function (){
  mongoose.disconnect();
});


