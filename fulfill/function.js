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


module.exports=fn;
