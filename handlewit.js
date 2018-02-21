var fbresponselist = require('./fbresponselist');

var respond = require('./respondhandler');

var confidence=0.5;

module.exports=function(psid,msg,ob,resolve,reject,handletext){
    //  var wr=JSON.parse(JSON.stringify(fbresponselist.wit));
  var wr=fbresponselist.wit;
      var entities = wr.entities;
     // console.log( ob.entities);   
      var hcA = highconfidenceAll(ob.entities);
      //console.log(hcA);
  var match=witmatch(wr,hcA,resolve,reject);
  //   console.log( witmatch(wr,hcA));
  if(match!=null){
    match.wit=true;
     respond(psid,match);
     resolve(false);
     return false;
  }
    handletext(psid,msg,resolve,reject);
}


function witmatch(wr,hcA,resolve,reject){
    var result=null;
  var wr = JSON.parse(JSON.stringify(wr));
  var hcA=JSON.parse(JSON.stringify(hcA));
        for(var i=0;i<wr.length;i++){
          var arr = wr[i].entities;
          var ky1 = Object.keys(hcA);
          var count=0;
          var hcAkyc=Object.keys(hcA).length;
          for(var ky in arr){
            if(ky1.indexOf(ky)!=-1){
                  
              count=loopmatch(arr[ky],hcA[ky],count);
            }
          }/// one object loop
        //  console.log(count,Object.keys(arr).length);
       //   console.log(result,count);
          if(hcAkyc == 0) {
            return null;
          }
          if(count == hcAkyc){ 
            wr[i].entities= hcA;
            return wr[i];
          }
          else if(count == Object.keys(arr).length){
              if(result==null){
                result=wr[i];
                result.entities=hcA;
                result.count=count;
                continue;
              }
              var ky=Object.keys(result);
            if(ky.indexOf('count')&&result.count<count){
                result=wr[i];
              result.entities=hcA;
                result.count=count;
                continue;
            }
          
          }
          
      }// full loop
    if(result!=null)
      delete result.count;
      return result;
}


function loopmatch(arr,hcA,count){
  try{
    if(hcA.confidence>confidence){
              
              if(arr.value[0]=='*'){
                  count=count+1;
              }
              
               else if( arr.value==hcA.value){
                   count=count+1;
                }
              
           
              }
  }
  catch(err)
  {
  }
return count;
}

function highconfidenceAll(entities){
   // console.log(entities);
  var entities = JSON.parse(JSON.stringify(entities));
  var re ={};
   for (var ky in entities){
        // console.log(ky);
        re[ky] =  highconfidence(entities[ky]) ;
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