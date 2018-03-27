var r=[

{ "entities":
                { 
                    'greetings':{value:'true'} ,intent:{value:'order:coffee'}
                } 
          ,fulfill:'ordercoffee',
       stext:'hello, what kind of coffee you want?{{order:coffee}} '
  },
     { "entities":
         { 
                    intent:{value:'order:coffee'}
        } ,
       stext:{
         "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What do you want to do next?",
        "buttons":[
             {
            "type":"web_url",
            "url":"https://www.messenger.com",
            "title":"Visit Messenger"
            },
          {
            "type":"postback",
            "payload":"drink_latte",
            "title":"latte"
            },
           {
            "type":"postback",
            "payload":"drink_americano",
            "title":"americano"
            }
          ]
        }
         }
         //
     }
     },
   /* { "entities":
                { 
                    intent:{value:['*']}
                } 
          ,
       stext:'you {{{{}}intent{{}}}} is {{intent}}'
  },*/
];

module.exports=r;