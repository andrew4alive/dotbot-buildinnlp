var fbresponselist = require('./fbresponselist');

var respond = require('./respondhandler');
var hcah=require('./core/hca.js');
var confidence=0.5;

module.exports=function(psid,msg,ob,resolve,reject,handletext){
  try{
  var hcA = highconfidenceAll(ob.entities);
  msg.entities=hcA;
  }catch(err){
  msg.entities={};
  }
  
  try{
  //  console.log('start handlewit');
  if(Object.keys(fbresponselist).indexOf('wit')!=-1){
  
  var wr=JSON.parse(JSON.stringify(fbresponselist.wit));
  var wr=fbresponselist.wit;
  //  console.log(JSON.stringify(fbresponselist));
      var entities = wr.entities;
   // console.log('handliewit');
     // console.log( ob.entities);   
    //console.log(msg);  
  //  var hcA = highconfidenceAll(ob.entities);
    var hcA = highconfidenceAll(ob.entities);
    //  console.log(hcA);
  var match=witmatch(wr,hcA,resolve,reject);
 //    console.log( match);
  if(match!=null){
    match.wit=true;
    match.text=msg.text;
     respond(psid,match);
     resolve(false);
     return false;
  }
  }
  }
  catch(err){
    console.log('error handlie wit',err);
    handletext(psid,msg,resolve,reject);
  //  reject(err);
    return false;
    
  }
  handletext(psid,msg,resolve,reject);
}


function witmatch(wr,hcA,resolve,reject){//wr is base on setting
  try{
    var result=null;
  var wr = JSON.parse(JSON.stringify(wr));
  var hcA=JSON.parse(JSON.stringify(hcA));
        for(var i=0;i<wr.length;i++){
          var arr = wr[i].entities;
          var ky1 = Object.keys(hcA);
          var count=0;
          var hcAkyc=Object.keys(hcA).length;
          var ent={};
          for(var ky in arr){
            if(ky1.indexOf(ky)!=-1){
                 // console.log(wr[i]);
              var lv=loopmatch(arr[ky],hcA[ky],count);
              count=lv.count;
             /* console.log('lv',lv.add,ky,hcA[ky]);
              if(lv.add==true){
                ent[ky]=hcA[ky];
              }*/
            }
          }/// one object loop
        //  console.log(count,Object.keys(arr).length);
       //   console.log(result,count);
           
          if(hcAkyc == 0) {
            return null;
          }
        /*  if(count == hcAkyc&&Object.keys(arr).length==hcAkyc){ 
          //  console.log('by equal');
           // console.log('ent',ent);
            wr[i].entities= hcA;
           // wr[i]=ent;
            return wr[i];
          }
          else*/ if(count == Object.keys(arr).length){
               //  console.log('by logic');
              if(result==null){
               // console.log('by logic 1');
                result=wr[i];
               result.entities=hcA;
              
                result.count=count;
                continue;
              }
            var ky=Object.keys(result);
              if(ky.indexOf('count')&&result.count<count){
                //console.log('by logic 2');
                result=wr[i];
              result.entities=hcA;
         
              result.count=count;
                continue;
            }
          }
             
          
          
          
          
      }// full loop
  //  console.log(count);
   // console.log(ent);
    if(result!=null)
      delete result.count;
      return result;
  }catch(err){
    reject(err);
    return null;
  }
}
/* 
//no use and cannot be use bug
function assignE(pe,ce,reject){
    var re={};
  try{
    var pekeys=Object.keys(pe);
    var ce = Object.keys(ce); 
    for(var ky in pe){
     re[ky]=ce[ky];
    
    }
  }
  catch(err){
    reject(err)
    //console.log(err);
  }
  return re;
}*/


function loopmatch(arr,hcA,count){
  var add=false;
  try{
    if(hcA.confidence>confidence){
              add=true;
              if(arr.value[0]=='*'){
               // console.log('all:',arr);
                  count=count+1;
                //add=true;
              }
              
               else if( arr.value==hcA.value){
                // console.log('match value',arr);  
                 count=count+1;
                // add=true
                }
              
           
              }
  }
  catch(err)
  {
  }
return {count:count,add:add};
}

function highconfidenceAll(entities){
   // console.log(entities);
  var entities = JSON.parse(JSON.stringify(entities));
  var re ={};
   for (var ky in entities){
        // console.log(ky);
        re[ky] =  highconfidence(entities[ky]) ;
     if(re[ky]['confidence']<confidence)
       delete re[ky];
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