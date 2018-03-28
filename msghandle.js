var replyfb= require('./replyfb/replyfb.js');
var mgdt= require('./mongodata.js');

var fbresponselist = require('./fbresponselist');
var wit=require('./wit.ai');
var respond = require('./respondhandler');
var handletext=require('./handletext');
var handlewit=require('./handlewit');

var h ={};

var url=process.env.fbmsgurl;
h.init = function(body,res){
    var res = res;
    
    body.entry.forEach(function(entry) {
      
      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0
     // console.log(entry);
      if(Object.keys(entry).indexOf('messaging')==-1) return ;
      let webhook_event = entry.messaging[0];
       var psid = webhook_event.sender.id;
  //  console.log(webhook_event);
      if (webhook_event.message) {
        var keys = Object.keys(webhook_event.message);
          res.status(200).send('EVENT_RECEIVED');
     
        if(keys.indexOf('is_echo')>=0){
          //   console.log(entry.messaging[0]);
            if(Object.keys(webhook_event.message).indexOf('app_id')!=-1){
           //     console.log('auto reply');
            }
          else{
            var botcontrol=require('./botcontrol/botcontrol.js');
            botcontrol.init(psid,webhook_event);
          //  console.log("human reply");
          }
        }
        else{
         //console.log(webhook_event);
          //console.log(webhook_event.message.nlp.entities);
     // console.log('end ori');
          var botcontrol=require('./botcontrol/botcontrol.js');
          botcontrol.botisoff(psid).then(function(ob){

            if(ob==false){
            h.handle(psid,webhook_event.message);
            }
          });
         
        }
      }
      else if (webhook_event.postback) {
        res.status(200).send('EVENT_RECEIVED');
    //     console.log(webhook_event);
     // console.log('postback trigger');
        var handle=require('./handlepostback/handlepostback').init(psid,webhook_event.postback);
      
      }
    });
};

h.handle=function(psid,msg){
  
  replyfb.typing(url,psid).then(function(){
    
    setTimeout(function(){
    
       if(msg.text){
    var w = null;
      
     handle(psid,msg,w).then(function(ob){
      // console.log(ob);
      });
     
     
     return true;
   }
  else if(msg.attachments){
  }
    
    
    },500);

  
  });
   
  
  return false;
};


//helper function for handle text
function handle(psid,msg,ai){
 
 // var ai=(typeof ai!=='undefined')?ai:null;
  return new Promise(function(resolve,reject){
    try{
  
            var ob = msg.nlp;
            handlewit(psid,msg,ob,resolve,reject,handletext);
        
  
    }
    catch(e){
      reject(e);
    }
    
  });
    
}

module.exports=h;