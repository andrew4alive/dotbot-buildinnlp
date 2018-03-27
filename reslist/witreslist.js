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


  var res=[

    
    { "entities":
                { 
                    intent:{value:'getname'},person:{value:['*']}
                } 
          ,
       stext:'you {{{{}}intent{{}}}} is {{intent}},value is {{person}}'
  },
    //postback
    {
      "entities":{
       intent:{
        value:"postback:order:coffee"
       },
        drink:{value:['*']}
        
    },
     stext:"1 {{drink}} coming up" 
      
    
    },
    

  
  
];

var add=require('../setuploader')();
add.init(res,__dirname+'/wlist');
add.add('index');
add.add('order');

module.exports=res;