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

fn.remebercheck=function(psid,setup,remember,list){
  //check list haev fulfill keys
  var list=JSON.parse(JSON.stringify(list));
  var remember=JSON.parse(JSON.stringify(remember));
  var setup=JSON.parse(JSON.stringify(setup));
  var listkeys=Object.keys(list);
  if(listkeys.indexOf('fulfill')==-1){
    return null;
  }
  var setupkeys=Object.keys(setup);
  if(setupkeys.indexOf('keepInMind')==-1||listkeys.indexOf('trigger')==-1){
    return null;
  }
  var triggerkeys=Object.keys(setup.trigger);
  if(triggerkeys.indexOf(list.fulfill)==-1){
    return null;
  }
  var triggered = setup.trigger[list.fulfill];
  var tky=Object.keys(triggered);
  var toremember={entities:{}};
  for(var ky in triggered){
    var t = triggered[ky];
    //if()
  }
  /*if(Object.keys(remember).indexOf(psid)==-1){
    return [];   
  }*/
  
    

};


module.exports=fn;
