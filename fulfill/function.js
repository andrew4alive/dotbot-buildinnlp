var fn={};

/*
list example
list={ entities: { greetings: { confidence: 0.99993050098374, value: 'true' } },
  stext: 'hello, what can ai can help u with? ',
  wit: true }
  
  remember={
    entities:{},createDate:new Date().getTime()
  }

*/

fn.triggercheck=function(psid,setup,remember,list){
  //check list haev fulfill keys
 // console.log('check',remember,JSON.parse(JSON.stringify(remember)));
  var list=JSON.parse(JSON.stringify(list));
  var remember=JSON.parse(JSON.stringify(remember));
  var setup=JSON.parse(JSON.stringify(setup));
  var listkeys=Object.keys(list);
  var enttemp={};
  if(listkeys.indexOf('fulfill')==-1){
    return null;
  }
  var setupkeys=Object.keys(setup);
  if(setupkeys.indexOf('keepinmind')==-1||setupkeys.indexOf('trigger')==-1){
  //   console.log('from setup');
    return null;
  }
  var triggerkeys=Object.keys(setup.trigger);
  if(triggerkeys.indexOf(list.fulfill)==-1){
    //console.log('from trigger');
    return null;
  }
  var triggered = setup.trigger[list.fulfill];
  delete triggered._f;
   delete triggered._c;
  var tky=Object.keys(triggered);
  var toremember=[];
 // console.log(remember,tky);
  for(var ky in triggered){
      
    if(Object.keys(remember).indexOf(psid)==-1){
    toremember.push(ky);
      continue;
    }
    if(Object.keys(remember[psid]).indexOf('entities')==-1){ console.log('remeber[psid] do not have entities keys'); return null;}
    if(Object.keys(remember[psid]['entities']).indexOf(ky)==-1){
    /*if(ky=='_f')
      continue;
      else if(ky=='_c')
        continue;*/
      toremember.push(ky);
      //continue;
    }
    else{
      enttemp[ky]=remember[psid]['entities'][ky];
    }
   
  }
  return {toremember:toremember,trigger:list.fulfill,entities:enttemp};
  /*if(Object.keys(remember).indexOf(psid)==-1){
    return [];   
  }*/
 
    

};

fn.memorycheck=function(psid,setup,remember,mymt,list){
  var toremember=[];
 // var tosaveentities={};
  var trigger=null;
    var list=JSON.parse(JSON.stringify(list));
  var remember=JSON.parse(JSON.stringify(remember));
  var trigger=JSON.parse(JSON.stringify(setup.trigger[mymt]));
  delete trigger._f;
   delete trigger._c;
  var trky=Object.keys(trigger);
  var listkeys=Object.keys(list);
  for(var i=0;i<trky.length;i++){
    if(Object.keys(remember[psid]['entities']).indexOf(trky[i])==-1){
      
    
       toremember.push(trky[i]);
    }
    
    
    
  }
  
  //delete toremember['_f'];
  return {toremember:toremember,trigger:mymt};
};




////helper 
function kycheck(ob,ky){
  if(!Array.isArray(ky)){
    return false;
  }
 // console.log(ob);
  if(ob==undefined) return false;
  var obkc=Object.keys(ob);
  
  for(var i=0;i<ky.length;i++ ){
    if(obkc.indexOf(ky[i])!=-1){
      continue;
    }
    else{
      return false;
    }
  }
  return true;
}

module.exports=fn;


function dmkey(ob){//key to delete _f,_c
  if(ob==null&&typeof ob !='object'){
     
  }
}