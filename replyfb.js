const request = require('request')


var reply = {};

reply.withtext=function(url,psid,text){
  var text=text;
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

module.exports = reply;





