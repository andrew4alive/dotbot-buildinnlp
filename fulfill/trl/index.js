var tr={

'ordercoffee':{
          person:{question:'can i get ur name?'},
        //  postback_drink:{question:'what coffe u want?'},
        postback_drink:{question:{
            "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What coffe u want?",
        "buttons":[
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
        
        }
            },
          '_f':"thank you {{person}} for order, you order {{postback_drink}}",
         '_c':'ok, cancel order, what else can i help you',
        //'_od':[ 'postback_drink'  ]
      }
    
    
};





module.exports=tr;