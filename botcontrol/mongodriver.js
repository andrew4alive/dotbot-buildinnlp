var mongo=require('mongodb').MongoClient;
var url=process.env.mongourl;
var m={};
/*
[{
psid:psid,
cdate:new Date().getTime()
}]
*/
m.db='chatbot';
m.collection='botoff';

m.get=function(psid,resolve,reject){
var self=this;
  
  mongo.connect(url,function(err,db){
  if(err)  reject(err);
  var dbo=db.db(m.db);
    dbo.collection(m.collection).find({psid:psid}).toArray(function(err,result){
       if(err) reject(err);
      var re={};
    //  re[psid]=null;
      // console.log(result);
       if(result.length>0){
         if(Object.keys(result[0]).indexOf('cdate')!=-1)
         re[psid]=result[0].cdate;
        
         resolve(re);
         return;
       }
      resolve(re);
    
    });
  
  });

};
/*
m.save=function(psid,resolve,reject){
var self=this;
  
  mongo.connect(url,function(err,db){
  if(err)  reject(err);
  var dbo=db.db(m.db);
    dbo.collection(m.collection).find({psid:psid}).toArray(function(err,result){
       if(err) reject(err);
      var d={cdate:new Date().getTime()}
       if(result.length>0){
         var rr={};
         rr['$set']=d;
         dbo.collection(m.collection).updateOne({psid:psid},rr,function(err,resul){
           resolve({psid:psid,cdate:d});
         });
         return
       }
        else{
          dbo.collection(m.collection).insertOne({psid:psid,cdate:d.cdate},function(err,resul){
             resolve({psid:psid,cdate:d});
         });
        }
      
       ///save new one
      
    
    });
  
  });

};
*/
m.delete=function(psid,resolve,reject){
    var self=this;
  
  mongo.connect(url,function(err,db){
  if(err)  reject(err);
  var dbo=db.db(m.db);
    dbo.collection(m.collection).remove({psid:psid},function(err,result){
      if(err) {reject({psid:psid});return ;}
        resolve({psid:psid});
    });
  
  });

};

m.save=function(psid,resolve,reject){
var self=this;
  
  mongo.connect(url,function(err,db){
  if(err)  reject(err);
  var dbo=db.db(m.db);
    dbo.collection(m.collection).find({psid:psid}).toArray(function(err,result){
       if(err) reject(err);
      var d={cdate:new Date().getTime()}
       if(result.length>0){
         var rr={};
         rr['$set']=d;
         dbo.collection(m.collection).updateOne({psid:psid},rr,function(err,resul){
           resolve({psid:psid,cdate:d});
         });
         return
       }
        else{
          dbo.collection(m.collection).insertOne({psid:psid,cdate:d},function(err,resul){
             resolve({psid:psid,cdate:d});
         });
        }
      
       ///save new one
      
    
    });
  
  });
}
module.exports=m;