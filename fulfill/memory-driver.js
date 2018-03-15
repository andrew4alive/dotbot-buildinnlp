var lastconversation={};
var remember={};
var trigger={};
var m={};
 var db='chatbot';
var collection='chatmemory';

//module.exports=m;

module.exports={
  db:'chatbot',
  collection:'chatmemory',
  ty:null,
  cleartime:5*60000,
  init:function(psid){//,ty){
    var self=this;
  //var ty= ty;
//  this.ty=ty;
return new Promise(function(resolve,reject){
    var re={} 
    if(self.ty==null){//in versatile memory
     // console.log('in memeory');
      try{
      var inm=inmemoryObget.bind(self,psid,resolve,reject);
     //   console.log('memory driver state1');
     //   console.log(inm);
       self.memoryclear(self.cleartime,inm); 
        
      //re=inm();
       // console.log(JSON.stringify(re));
        //console.log('memory driver state2');
       // resolve(cloneOb(re)); 
        return cloneOb(re);
      } catch(err){
        reject(err);
      }
      
       
     } 
    if(self.ty=='mongodb'){
     // console.log('mongodb activate');
      var mongodriver=require('./mongo-driver');
      var inm = mongodriver.mongomemoryget.bind(self,psid,resolve,reject);
      self.memoryclear(self.cleartime,inm); 
    }


  });
},
  end:function(psid,mm){
    //console.log(this.ty);
    if(this.ty==null){
      inmemorydelete(psid,mm);
      return;
    }
    if(this.ty='mongodb'){
      var self=this;
      var mongodriver=require('./mongo-driver');
       mongodriver.mongomemoryset.call(self,psid,mm);
       }
  },
  memoryclear:function(time,cb){
   if(typeof cb!='function'){
      var cb=function(){};
    }
    if(time==undefined){
         var time=2*60*60000;
      //cb();
    }
    if(time==null){
        var time=2*60*60000;
      //cb();
    }
 
 //   console.log(typeof cb);
    var time=new Date(time);
    var d=new Date().getTime();
    
    if(this.ty==null){
       var ky=Object.keys(lastconversation);    
    for(var i=0;i<ky.length;i++){
      try{
        
     if(d-lastconversation[ky[i]]>=new Date(time).getTime()){
       if(Object.keys(lastconversation).indexOf(ky[i])!=-1)
       delete lastconversation[ky[i]];
       if(Object.keys(trigger).indexOf(ky[i])!=-1)
         delete trigger[ky[i]];
       if(Object.keys(remember).indexOf(ky[i])!=-1)
       delete remember[ky[i]];
      }
        
      }
      catch(err){ }
    }
      
      cb();
    }
    
    if(this.ty=='mongodb'){
    var mongodriver=require('./mongo-driver');
      //console.log(mongodriver);
      mongodriver.clearcon.call(this,time,cb);   
  
    }
  
  }
};

function cloneOb(ob,resolve,reject){
  //console.log('clone error');
  return JSON.parse(JSON.stringify(ob));
  
}

function  inmemoryObget(psid,resolve,reject){
  var re={};
  //console.log('lastconversatiopn:'+ lastconversation[psid]);
  //console.log('lastconversatiopn:'+ Object.keys(lastconversation));
   //console.log('lastconversatiopn:'+ JSON.stringify(lastconversation));
  if(Object.keys(lastconversation).indexOf(psid)!=-1){
    re['lastconversation']={};
    re['lastconversation'][psid]=lastconversation[psid];
     }
  else
    re['lastconversation']={};
  
  //console.log('remember:'+ remember);
  
  if(Object.keys(remember).indexOf(psid)!=-1){
    re['remember']={};
    re['remember'][psid]=remember[psid];
  }
  else
    re['remember']={}
 
  // console.log('trigger:'+ trigger);
  if(Object.keys(trigger).indexOf(psid)!=-1){
      re['trigger']={};
    re['trigger'][psid]=trigger[psid];
  }
  else
    re['trigger']={};
  resolve(re);
  return re;
}

function inmemorydelete(psid,mm){
 if(Object.keys(mm.lastconversation).indexOf(psid)!=-1)
          lastconversation[psid]=mm.lastconversation[psid];
      else
        delete lastconversation[psid];
    if(Object.keys(mm.remember).indexOf(psid)!=-1)
      remember[psid]=mm.remember[psid];
      else
      delete  remember[psid];
      
    if(Object.keys(mm.trigger).indexOf(psid)!=-1)
      trigger[psid]=mm.trigger[psid];
    else
        delete trigger[psid];
      return;



}
//copy to new file
/*
function mongomemoryget(psid,resolve,reject){
    var mongo=require('mongodb').MongoClient;
    var url=process.env.mongourl;
  var self=this;
  //console.log(this);
   if(url==''){
     reject('mongourl not set');
     throw('mongourl not set');
   }
   if(url==undefined){
     reject('mongourl not set');
     throw('mongourl not set');
   }
   mongo.connect(url,function(err,db){
    // console.log('mongo get function');
       if(err){
       reject(err);  
         throw(err);
       }
      else{
        var dbo=db.db(self.db);
        dbo.collection(self.collection).find({psid:psid}).toArray(function(err,result){
        //  console.log('mongo find');
        //  console.log('res',result);
          var re={};
          re['lastconversation']={};re['remember']={};  re['trigger']={}; 
            if(result.length>0){
                var r=result[0];
          //      console.log(r);
              
                if(Object.keys(r).indexOf('lastconversation')>=0){
                   //console.log(r['lastconversation']);
                  re['lastconversation'][psid]=r['lastconversation'];
                }
                else{
                  re['lastconversation']={};
                }
                
              if(Object.keys(r).indexOf('remember')>=0){
                // console.log(r['remember']);
                re['remember'][psid]=r['remember'];
                }
                else{
                  re['remember']={};
                }
              
              if(Object.keys(r).indexOf('trigger')>=0){
                   
                re['trigger'][psid]=r['trigger'];
                }
                else{
                  re['trigger']={};
                }
              
            }
          //console.log('re'+JSON.stringify(re));
              resolve(re);
        
        });
      
      }
   });

}

*/