var md=require('./mongodriver');
var botoff={};

var m={};



module.exports={
  db:null,
  collection:null,
  ty:null,
 init:function(psid){
   var self=this;
   return new Promise(function(resolve,reject){
       if(self.ty==null){
       //  console.log('inmemory');
          inmemoryget.call(self,psid,resolve,reject);
         return ;
       }
     if(self.ty=='mongodb'){
          md.get.call(self,psid,resolve,reject);        
        }
   });
   
 },
  deletebotoff:function(psid){
   var self=this;
   return new Promise(function(resolve,reject){
        if(self.ty==null){
         inmemorydelete(psid,resolve,reject);
         return;
        }
      if(self.ty=='mongodb'){
          md.delete.call(self,psid,resolve,reject);        
        }
    });
  },
savebotoff:function(psid){
   var self=this;
    return new Promise(function(resolve, reject){
      if(self.ty==null){
        inmemorysave.call(self,psid,resolve,reject);
      }
        if(self.ty=='mongodb'){
          md.save.call(self,psid,resolve,reject);        
        }

    });


}
  

};
function inmemorydelete(psid,resolve,reject){
  try{
  delete botoff[psid];
  }
  catch(err)
  {reject(err);}
}
function inmemoryget(psid,resolve,reject){
    var re={};  
  //console.log(botoff);
  if(Object.keys(botoff).indexOf(psid)==-1){
     re[psid]=null;   
          
  }
  else{
    re[psid]=botoff[psid];
  }
  resolve(re);
  return re;
}

function inmemorysave(psid,resolve,reject){
   // console.log(botoff);
   botoff[psid]=new Date().getTime();
  resolve(botoff);

}