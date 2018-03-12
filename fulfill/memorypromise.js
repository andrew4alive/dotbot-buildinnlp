

module.exports=function(mm){//return all function
  var lastconversation=mm.lastconversation;
var remember=mm.remember;
var trigger=mm.trigger;
var m1={};

  m1.getob=function(psid){
    
   var re={};
   re['lastconversation']=lastconversation;
   re['remember']=remember;
    re['trigger']=trigger;
    return re;
  };

m1.saveentities=function(psid,kips,entities){//kips=lis to remeber entities object to remeber

  var enttemp={};
 /* if(Object.keys(remember).indexOf(psid)!=-1){
    enttemp=JSON.parse(JSON.stringify(remember[psid]));
  }*/
if(!Array.isArray(kips)) return;
lastconversation[psid]=new Date().getTime();  
var cm=0;
if(Object.keys(remember).indexOf(psid)>=0){
      enttemp=JSON.parse(JSON.stringify(remember[psid]['entities']));
  }
    for(var i=0;i<kips.length;i++){
  if(Object.keys(entities).indexOf(kips[i])>=0){ 
    if(!Array.isArray(entities[kips[i]])){// to check do is the entities process using wit hcA function, will return object not arrauy
      enttemp[kips[i]]=entities[kips[i]];
    cm=cm+1;   
    }
  }
  }
 
  if(cm>=1)
  remember[psid]={entities:enttemp,createDate:new Date().getTime()};
};

m1.savetrigger=function(psid,triggername){

  trigger[psid]=triggername;
  //console.log(trigger);
};
m1.deletetrigger=function(psid){
    if(Object.keys(trigger).indexOf(psid)!=-1)
        delete trigger[psid];
};

m1.gettrigger=function(psid){
//  var trigger=mm.trigger;
  return JSON.parse(JSON.stringify(trigger));
};

m1.getremember=function(psid){

  //var remember=mm.remember;
  return JSON.parse(JSON.stringify(remember));

};

m1.getlastconversation=function(psid){
  var ky=Object.keys(lastconversation);
  if(ky.indexOf(psid)>=0){
    return lastconversation[psid];
  }
  return null;

};



m1.clear=function(time){
  if(time==undefined)
   var  time=2*60*60000;
    var ky=Object.keys(lastconversation);  
  //console.log('fromclear file fulfill/memory'+ky)
  var d=new Date().getTime();
  
    
    for(var i=0;i<ky.length;i++){
      try{
        //var period =  d-lastconversation[ky[i]];
       // console.log(period);
      //(d-remember[ky[i]].createDate>=new Date(time).getTime()){
     if(d-lastconversation[ky[i]]>=new Date(time).getTime()){
       if(Object.keys(lastconversation).indexOf(ky[i])!=-1)
       delete lastconversation[ky[i]];
       m1.deletetrigger(ky[i]);
       if(Object.keys(remember).indexOf(ky[i])!=-1)
       delete remember[ky[i]];
      }
      }
      catch(err){ }
    }
  
  //console.log('after clear');
  //console.log(lastconversation,remember,trigger);
}
 return m1;
};