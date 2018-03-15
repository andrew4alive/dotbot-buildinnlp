var replyfb= require('./replyfb.js');
var mgdt= require('./mongodata.js');

var fbresponselist = require('./fbresponselist');
var wit=require('./wit.ai');
var respond = require('./respondhandler');
var handletext=require('./handletext');
var handlewit=require('./handlewit');

var h ={};
h.res = null;
h.confidence = 0.7;
var url=process.env.fbmsgurl;
h.init = function(body,res){
    h.res = res;

    body.entry.forEach(function(entry) {
      
      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
       var psid = webhook_event.sender.id;
    //  console.log(webhook_event);
      
      if (webhook_event.message) {
        var keys = Object.keys(webhook_event.message);
          h.res.status(200).send('EVENT_RECEIVED');
     
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
         
          //console.log(webhook_event.message.nlp.entities);
      //console.log('end ori');
          var botcontrol=require('./botcontrol/botcontrol.js');
          botcontrol.botisoff(psid).then(function(ob){
            //console.log('from msghandle');
           // console.log('line 47');
          //  console.log(ob);
            if(ob==false){
            h.handle(psid,webhook_event.message);
            }
          });
         
        }
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
/*
function handlewit(psid,msg,ob,resolve,reject){
      var wr=fbresponselist.wit;
      var entities = wr.entities;
      //console.log( ob.entities);   
      var hcA = highconfidenceAll(ob.entities);
      console.log(hcA);
  var match=witmatch(wr,hcA);
     console.log( witmatch(wr,hcA));
     respond(psid,match);
     resolve(false);
     return false;
 
    handletext(psid,msg,resolve,reject);
}


////helper
function witmatch(wr,hcA){
    var result=null;
        for(var i=0;i<wr.length;i++){
          var arr = wr[i].entities;
          var ky1 = Object.keys(hcA);
          var count=0;
          var hcAkyc=Object.keys(hcA).length;
          for(var ky in arr){
            if(ky1.indexOf(ky)!=-1){
              if(arr[ky].value==hcA[ky].value){
                if( hcA[ky].confidence>h.confidence){
                   count=count+1;
                }
              }
            }
          }/// one object loop
          if(count == hcAkyc) return wr[i];
          
          else if(result==null){
            result=wr[i];
            result.count=count;
          }
          else if(result.count<count){
              result=wr[i];
            result.count=count;
          }
          
      }// full loop
      delete result.count;
      return result;
}


function highconfidenceAll(entities){
   // console.log(entities);
  var re ={};
   for (var ky in entities){
        // console.log(ky);
        re[ky] =  highconfidence(entities[ky]) ;
   }
  return re;
}

function highconfidence(entity){
  var he={};
    entity.forEach(function(ob){
      var ky=Object.keys(he);
      if(ky.indexOf('confidence')==-1){
        he=ob;
        return;
      }
      if(ob.confidence>he.confidence){
        he=ob;
      }
    });
  return he;
}
*/
module.exports=h;