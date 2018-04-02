var r=[
  
    { "entities":
                { 
                    'greetings':{value:'true'} 
                } 
          ,
       stext:'hello, what can ai can help u with? '
  },   
       
  {
  entities:{
    bye:{value:['*']},
    greetings:{value:['*']}
  },
  stext:'bye , see you again'
},
      { "entities":
                { 
                    intent:{value:'getname'},person:{value:['*']}
                } 
          ,
       stext:'you {{{{}}intent{{}}}} is {{intent}},value is {{person}}'
  },
 

];


module.exports=r;