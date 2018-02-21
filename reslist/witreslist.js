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
                    'greetings':{value:'true'} 
                } 
          ,
       stext:'hello, what can ai can help u with? '
  },
   { "entities":
                { 
                    'greetings':{value:'true'} ,intent:{value:'order:coffee'}
                } 
          ,
       stext:'hello, what kind of coffee you want?{{order:coffee}} '
  },
     { "entities":
                { 
                    intent:{value:'order:coffee'}
                } 
          ,
       stext:'you {{{{}}intent{{}}}} is {{intent}}'+'\n'+'what kind of coffee you want? '
  },
  { "entities":
                { 
                    intent:{value:['*']}
                } 
          ,
       stext:'you {{{{}}intent{{}}}} is {{intent}}'
  },
    
    { "entities":
                { 
                    intent:{value:'getname'},person:{value:['*']}
                } 
          ,
       stext:'you {{{{}}intent{{}}}} is {{intent}},value is {{person}}'
  }
  
  
  
];

module.exports=res;