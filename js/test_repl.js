// rlol

var repl = require( 'repl' );
var ctx  = repl.start({
  prompt : 'mason> ',
  useGlobal : true
}).context;

// ctx.log = function (){
//   console.log( '\n', arguments[ 0 ]);
//   // this line of coke took me about 10 fucking hours
//   repl.rli.prompt();
// };

// console.log( 'repl', repl );
// console.log( 'repl.repl', repl.repl );
// console.log( 'repl.repl.rli', repl.repl.rli );