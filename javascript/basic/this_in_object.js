// example shows how to use 'this'
// inside javascirpt's object

var outer_age = 30;

var person = {

  name : "Mason Chang",
  age  : outer_age,

  to_string : function (){
    return 'You are ' +
           this.name +
           ', ' +
           this.age +
           ' years old'
  },

  show_me : function (){
    console.log( this.to_string());
  },

};

person.show_me();