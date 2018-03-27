var p={};
var respond = require('../respondhandler');
var mapent=require('./mapentity')();
var witres=require('../handlewit');
var texttres=require('../handletext');
p.init=function(psid,postback){

 return new Promise(function(resolve,reject){
     if(postback.payload){
        postback.stext=postback.payload;
       var msg=JSON.parse(JSON.stringify(postback));
       msg['text']=postback.payload;
       msg['nlp']={};
    //  console.log(mapent,postback.payload);
         var ob=createentities(mapent,postback.payload);
       msg.nlp=JSON.parse(JSON.stringify(ob));
       //console.log('mapent',JSON.stringify(ob));
       witres(psid,msg,ob,resolve,reject,texttres);
       //  resolve(psid);
       // respond(psid,postback);
     }
 });
}

module.exports=p;


function createentities(map,payload){
  var map=map;
  var re={};
  re['entities']={};
  if(Object.keys(map).indexOf(payload)!=-1){
   //console.log('create map entities function');
    var em=map[payload];
    for(var ky in em){
    //  console.log(ky);
      re['entities'][ky]=[em[ky]];
      re['entities'][ky][0]['confidence']=1;
      re['entities'][ky][0]['postback']=true;
    }
    
  }
  //console.log(re);
  return re;
  
}