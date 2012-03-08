// basic practice of mongoose doc creation and query

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Model = {
  UserSchema : new Schema({
    name       : { type : String },
    email      : { type : String },
    created_at : { type : Number, 'default' : Date.now },
    updated_at : { type : Number, 'default' : Date.now }
  }),
  PostSchema : new Schema({
    user_id    : { type : ObjectId, required : true, index : true },
    title      : { type : String },
    content    : { type : String },
    tags       : { type : Array },
    created_at : { type : Number, 'default' : Date.now },
    updated_at : { type : Number, 'default' : Date.now }
  })
};

mongoose.connect( 'mongodb://localhost/practicedb' );
var User = mongoose.model( "User", Model.UserSchema );
var Post = mongoose.model( "Post", Model.PostSchema );

user = new User({
  name  : "Mason",
  email : "mason@dreamerslab.com"
});
user.save();

post = new Post({
  user_id : user.id,
  title   : "Greeting",
  content : "Hello World",
  tags    : [ "abc", "xyz" ]
});
post.save();

User.find( function ( err, records ){
  console.log( "User : " );
  console.log( records );
});
User.count( function ( err, count ){
  console.log( "User count : " );
  console.log( count );
});

Post.find( function ( err, records){
  console.log( "Post : " );
  console.log( records );
});
Post.count( function ( err, count ){
  console.log( "Post count : " );
  console.log( count );
});
