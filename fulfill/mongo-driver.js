// alwyas delete-> get->set 

var mm={};
mm.dbo=null;
 mm.db=null;


mm.mongomemoryget=function(psid,resolve,reject){
    var mongo=require('mongodb').MongoClient;
    var url=process.env.mongourl;
  var self=this;
  var dbo=dbo;
  var db=db;
  console.log('from fulfill/mongo-dri');
  
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
        mm.dbo=dbo;
        mm.db=db;
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



mm.mongomemoryset=function(psid,mm){
    var mongo=require('mongodb').MongoClient;
    var url=process.env.mongourl;
  var self=this;
   if(url==''){
    // reject('mongourl not set');
     throw('mongourl not set');
   }
   if(url==undefined){
    // reject('mongourl not set');
     throw('mongourl not set');
   }
   mongo.connect(url,function(err,db){
       if(err){
      // reject(err);  
         throw(err);
       }
      else{
        
        
        var dbo=db.db(self.db);
        //var collection = 'chatmemory';
        dbo.collection(self.collection).find({psid:psid}).toArray(function(err,result){
          //console.log('set mongodb ');
            if(result.length>0){
              
              var inob={psid:psid};
              var unob={};
               qr(inob);
              qrunset(unob);
            // console.log(inob);
              var n={
                $set:inob,
                $unset:unob
              };
              dbo.collection(self.collection).updateOne({psid:psid},n,function(err,res){
              // console.log('mongodb save uodate');
                db.close();
              
              });
              
            }
          else if(result.length==0){
              var inob={
                psid:psid,
               
              }; 
              qr(inob);
              dbo.collection(self.collection).insertOne(inob,function(err,res){
                  if(err)
                    console.log('fail to save memory');
                db.close();
              });
          
          }
         //end chat memory
        });
      
      }
   });
  ///mongo helper  
  function qr(ori){
    var inob=ori;
        if(Object.keys(mm).indexOf('lastconversation')!=-1){
              if(Object.keys(mm.lastconversation).indexOf(psid)!=-1)
                 inob.lastconversation=mm.lastconversation[psid];
               } 
            
               if(Object.keys(mm).indexOf('remember')!=-1){
                  if(Object.keys(mm.remember).indexOf(psid)!=-1)
                 inob.remember=mm.remember[psid];
               } 
               if(Object.keys(mm).indexOf('trigger')!=-1){
                 if(Object.keys(mm.trigger).indexOf(psid)!=-1)
                 inob.trigger=mm.trigger[psid];
               } 
              

  }
  
  function qrunset(ori){
     var inob=ori;
        if(Object.keys(mm).indexOf('lastconversation')!=-1){
              if(Object.keys(mm.lastconversation).indexOf(psid)==-1)
                 inob.lastconversation={};
               } 
            
               if(Object.keys(mm).indexOf('remember')!=-1){
                  if(Object.keys(mm.remember).indexOf(psid)==-1)
                 inob.remember={};
               } 
               if(Object.keys(mm).indexOf('trigger')!=-1){
                 if(Object.keys(mm.trigger).indexOf(psid)==-1)
                 inob.trigger={};
               } 
  }
}
  
  mm.clearcon=function(deletetime,cb){
     var mongo=require('mongodb').MongoClient;
    var url=process.env.mongourl;
    var self=this;
   if(url==''){
    // reject('mongourl not set');
     throw('mongourl not set');
   }
   if(url==undefined){
    // reject('mongourl not set');
     throw('mongourl not set');
   }
   mongo.connect(url,function(err,db){
       if(err) throw err;
        else{
          var dbo=db.db(self.db);
          var d=new Date().getTime()-deletetime;
          //console.log(new Date(d));
          dbo.collection(self.collection).remove({lastconversation:{$lt:d}},function(err,res){
          if(err) 
          {console.log('cannot delete');
            return;
          }
          //  console.log('delete');
           // console.log(res);
          cb();
          });
        
        } 
       
   
   });
  
  }
  





module.exports=mm;
