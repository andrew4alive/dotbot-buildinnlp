var bs=require('./setup.js');
var memorydriver=require('./memorydriver');
var m={};
memorydriver.ty='mongodb';
m.cleartime=5*60000//in miliscond
m.init=function(psid,msg){
//  console.log('from botcontrol/botcontron file init method');
 // console.log(msg);
  if(Object.keys(bs).indexOf('himode')==-1) return;
 // memorydriver.ty='mongodb';
  if(bs.himode==true){
   //  console.log('turn off bot');
      botexe(psid,msg);   
  }
  
};

function botexe(psid,msg){
 // console.log(memorydriver)

  var prid=msg.recipient.id;
          memorydriver.savebotoff(prid).then(function(ob){
        //    console.log(ob);
          });
}


m.botisoff=function(psid){
  return new Promise(function(resolve,reject){
    memorydriver.init(psid).then(function(ob){
   //    console.log(ob,psid);
   //  console.log(memorydriver.deletebotoff);

      if(Object.keys(ob).indexOf(psid)==-1){
        resolve(false);
        memorydriver.deletebotoff(psid).then(function(){});
        return;
      }
       var p= new Date().getTime()- new Date(m.cleartime).getTime();

      if(ob[psid]==null){
      resolve(false); return;
      
      }
      if(p<ob[psid]){
      resolve(true);
      return;
      }
       resolve(false);
      memorydriver.deletebotoff(psid).then(function(){});
    });
  });
  

};



module.exports=m;