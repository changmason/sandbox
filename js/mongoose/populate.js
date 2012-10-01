// experimenting with mongoose's populate
// http://mongoosejs.com/docs/populate.html

var mongoose = require( "mongoose" );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connect("mongodb://localhost/populate_db");

var UserSchema = new Schema({
  name  : { type : String, required: true },
  posts : [{ type : ObjectId, ref : 'Post' }]
});

var PostSchema = new Schema({
  _user    : { type : ObjectId, ref : 'User' },
  title    : { type : String, required : true },
  content  : { type : String, required : true }
});

var User = mongoose.model( 'User', UserSchema );
var Post = mongoose.model( 'Post', PostSchema );


new User({
  name : 'mason'
})
.save( function ( err, user ){
  new Post({
    _user   : user._id, // post ref to user
    title   : 'title',
    content : 'original content'
  })
  .save( function ( err, post ){

    console.log( '\n# Both user & post are created!' );
    console.log( '- user: ' + user );
    console.log( '- post: ' + post );

    user.posts.push( post );
    user.save( function ( err, user ){
      post.content = 'updated content'
      post.save( function ( err, post ){

        // Note that only finder methods can support populate()
        User.find()
        .populate( 'posts' )
        .exec( function( err, users ){
          console.log( '\n# After updating the post' );
          console.log( '- user : ' + users );
          mongoose.disconnect();
        });

      });
    });

  });
});
