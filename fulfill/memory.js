var remember={};

var m={};

m.save=function(psid,kips,entities){//lips=lis to remeber entities object to remeber
var enttemp={};
var cm=0;
if(Object.keys(remember).indexOf(psid)>=0){
      enttemp=JSON.parse(JSON.stringify(remember[psid]['entities']));
  }
    for(var i=0;i<kips.length;i++){
  if(Object.keys(entities).indexOf(kips[i])>=0){ 
    enttemp[kips[i]]=entities[kips[i]];
    cm=cm+1;   
  }
  }
  //console.log('fulfill/fullfill');
//console.log(cm);
  if(cm>=1)
  remember[psid]={entities:enttemp,createDate:new Date().getTime()};
};

m.get=function(psid){

  if(Object.keys(remember).indexOf(psid)>=0){
    var re={psid:psid,entities:remember[psid]['entities'],createDate:remember[psid]['createDate']};
      return  JSON.parse(JSON.stringify(re));
  }
  return null;

};


m.clear=function(time){
  if(time==undefined)
    time=2*60*60000;
    var ky=Object.keys(remember);    
    var d=new Date().getTime();
    for(var i=0;i<ky.length;i++){
      try{
      if(d-remember[ky[i]].createDate>=new Date(time).getTime()){
        delete remember[ky[i]];
      }
      }
      catch(err){ }
    }
}
module.exports=m;