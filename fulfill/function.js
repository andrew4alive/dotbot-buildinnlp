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
  var arrsort=setsort(triggered);
  
  beforesetup(triggered);

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
  var toremember=sort(toremember,arrsort);
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
  var arrsort=setsort(trigger);
   beforesetup(trigger);
  var trky=Object.keys(trigger);
  var listkeys=Object.keys(list);
  for(var i=0;i<trky.length;i++){
    if(Object.keys(remember[psid]['entities']).indexOf(trky[i])==-1){
      
    
       toremember.push(trky[i]);
    }
    
    
    
  }
  
  var toremember=sort(toremember,arrsort);
 
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

function beforesetup(ob){
 if(ob!=null&&typeof ob =='object'){
     delete ob._f;
     delete ob._c;
     delete ob._od;
  }
}

function sort(arr,arrsort){
  var re=[];
  if(!Array.isArray(arr)||!Array.isArray(arrsort)){
    return arr; 
  }
   if(arrsort.length==0){
    return arr; 
  }
 /*  if(!Array.isArray(arrsort)){
    return arr; 
  }*/
  var arr=JSON.parse(JSON.stringify(arr));
  for(var i =0;i<arrsort.length;i++){
    var as=arrsort[i];
    var ix=arr.indexOf(as);
    if(ix==-1||typeof as !='string') continue;
    arr.splice(ix+1,1);
    re.push(as);
  }
  re.concat(arr);
  return re;
}

function setsort(triggered){
if(Object.keys(triggered).indexOf('_od')!=-1){
     try{
     return JSON.parse(JSON.stringify(triggered._od));    
     }catch(err){
        console.log(err); 
     }
     }
  
  return [];

}