/*sample respond
module.exports=[

  { "entities":
                { 
                    'greetings':{value:'true'} 
                } 
          ,
       stext:'hello, what can ai can help u with? '
  }
  
];
*/


var res=[];
var add=require('../setuploader')();
add.init(res,__dirname+'/wlist');
//add.add('index');
//add.add('order');
add.addp('index');
add.addp('order');
//console.log(add);
module.exports=add;
//module.exports=res;