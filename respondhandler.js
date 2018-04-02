var replyfb= require('./replyfb/replyfb.js');
var witrespond=require('./witrespond');
var memorydriver=require('./fulfill/memory-driver');
var fulfillpromise=require('./fulfill/fulfillpromise');
var url=process.env.fbmsgurl;
/*
list example
list={ entities: { greetings: { confidence: 0.99993050098374, value: 'true' } },
  stext: 'hello, what can ai can help u with? ',
  wit: true }

*/

memorydriver.ty='mongodb';
module.exports = function(psid,list){
  

  memorydriver.init(psid).then(function(memoryob){
  //console.log('memorydriver callback');
      var plist=JSON.parse(JSON.stringify(list));
     // console.log(plist); 
 
  // console.log(JSON.stringify(memoryob));
    var fn=fulfillpromise(psid,memoryob);
 
    fn.remember(list);  
    var plist=fn.respond(plist);
    //console.log('after process')
    var ele=fn.getele();;
    //console.log(plist); 
    var remember={};
    try{
     
    var remember=JSON.parse(JSON.stringify(ele.remember[psid].entities));
     
      var merge=Object.assign(remember,plist.entities);
      
     
     //   console.log(merge);
      plist.entities=merge;
    }
    catch(err){
    
    }
    fn.end();
    try{
       
    memorydriver.end(psid,fn.getele()).then(function(){
      send(psid,plist);
    },
    function(err){
       console.log(err);
       replyfb.withtext(url,psid,'sorry we will get back to u later');
    });  
    }
    
    ////
    catch(err){
      console.log('memory end driver error');
      replyfb.withtext(url,psid,'we will get back to u later');
      console.log(err);
    }
    
  //  send(psid,plist);
     
    },function(){
  
       replyfb.withtext(url,psid,'we will get back to u later');
  
    });
  
 
  return 
 
}


function send(psid,plist){

    var ky = Object.keys(plist); 
      if(ky.indexOf('stext')!=-1){
  
      }
      else if(ky.indexOf('defaultres')!=-1){
           plist.stext=plist.defaultres;
      }
  //console.log(plist);
  if(istext(plist.stext)){
  
    textres(psid,plist);
  }
  else if(isob(plist.stext)){
    replyfb.with(url,psid,plist.stext);
  }
  replyfb.typingoff(url,psid);


}
/// helper
function textres(psid,plist){

 plist = witrespond(plist);
 replyfb.withtext(url,psid,plist.stext);
}

function istext(t){
  if(typeof t == 'string')
    return true
  
  return false;

}
function isob(ob){
  

 if(ob!=null&&typeof ob == 'object')
    return true
  
  return false;
}