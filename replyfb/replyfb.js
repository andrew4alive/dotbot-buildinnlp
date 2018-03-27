const request = require('request')
const helper= require('./replyfbhelper');

var reply = {};




reply.with=function(url,psid,payload){
 
   return new Promise(function(resolve,reject){
        if(!(payload!=null&&typeof payload=='object')){ 
         reject(null);
         return ;
       }
       var pl=JSON.parse(JSON.stringify(payload));
       var tl={};
       if(Object.keys(pl).indexOf('tl')!=-1){
       tl=JSON.parse(JSON.stringify(pl['tl']));
       delete pl['tl'];
       }
     //console.log(pl);
       //var pl=helper.btpayload(payload);
       var request_body = {
          "recipient": {
            "id": psid
              },
                "message": pl
            };
        postresthen(url,request_body,resolve,reject);
  });
};




reply.withtext=function(url,psid,text){
  var text=text+'';
 return new Promise(function(resolve,reject){
  var request_body = {
    "recipient": {
      "id": psid
    },
    "message": {"text":text}
  };
  postresthen(url,request_body,resolve,reject);
 
 
 });
 
    
}

reply.typing=function(url,psid){
 return new Promise(function(resolve,reject){
  var request_body = {
    "recipient": {
      "id": psid
    },
    "sender_action":"typing_on"
  };
  postresthen(url,request_body,resolve,reject);
 });
};

reply.typingoff=function(url,psid){
    return new Promise(function(resolve,reject){
  var request_body = {
    "recipient": {
      "id": psid
    },
    "sender_action":"typing_off"
  };
  postresthen(url,request_body,resolve,reject);
 });
};


//helper 

function postresthen(url,json,resolve,reject){
    request({
    "uri": url,
    "method": "POST",
    "json": json
  }, (err, res, body) => {
    if (!err) {
      //console.log('message sent!')
      resolve(body);
    } else {
      reject(err);
      console.error("Unable to send message:" + err);
    }
  });
}
function postres(url,json){
    request({
    "uri": url,
    "method": "POST",
    "json": json
  }, (err, res, body) => {
    if (!err) {
      //console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

function haskeys(ob,haskeys){
  if(!Array.isArray(haskeys)) return null;
  if(!(ob!=null&&typeof ob=='object')) return null;
  try{
    var ky=Object.keys(ob);
    if(ky.length!=haskeys.length) return false;
    for(var i =0;i<ky.length;i++){
         if( haskeys.indexOf(ky[i])==-1 )
           return false
    }
    return true;
  }catch(err){
  
  return null;
  }
}



module.exports = reply;
