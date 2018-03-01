var setup=require('./setup');
var memory=require('./memory');
var fn=require('./function');
var o = {};

//var remember={};

o.remember=function(psid,list){
  if(Object.keys(list).indexOf('entities')==-1) return null;
  var entities=JSON.parse(JSON.stringify(list.entities));
  clearmemory();
  if(!kycheck(setup,['keepinmind'])) return null;
  var kips=setup.keepinmind;
  memory.saveentities(psid,kips,entities);

};

o.memory=function(psid){
 // console.log('fulfill/fullfill');
//  console.log(remember);
  var remember=memory.getremember(psid);
    if(Object.keys(remember).indexOf(psid)>=0){
    var re={psid:psid,entities:remember[psid]['entities'],createDate:remember[psid]['createDate']};
      return  JSON.parse(JSON.stringify(re));
  }
  return null;
 
};

o.respond=function(psid,list){
  console.log('fulfill/fullfill');
 // console.log(list);
  try{
    if(!kycheck(setup,['trigger'])) return list;
    if(!kycheck(list,['entities'])) return list; 
  
  var list=JSON.parse(JSON.stringify(list));
    var trm=null;
    if(Object.keys(list).indexOf('fulfill')!=-1){
     // var allre=allrememberentities(list.fulfill);
     //if(allre==false) return false;
  //console.log(allre);
     // memory.saveentities(psid,allre,list.entities);
   trm = fn.triggercheck(psid,setup,memory.getremember(),list);
      memory.saveentities(psid,trm.toremember,list.entities);
      trm = fn.triggercheck(psid,setup,memory.getremember(),list);
    }
  //console.log(trm);// sampel trm respond { toremember: [ 'drink' ], trigger: 'ordercoffee' }, trigger null not trigger
  if(trm!=null){
    
    firsttrigger(psid,list,trm);
  }
    else{
    memorytrigger(psid,list);
  }
    return list;
  }catch(err){
        console.log(err);
    return list;
  }
   // console.log(trm);
};

function memorytrigger(psid,list){
  var mt = memory.gettrigger();
  
  //r mymt=null;
  if(Object.keys(mt).indexOf(psid)==-1) return false;// confirm have trigger psid, is trigger poreviusly
  console.log('from memory trigger file fulfill/fulfill');
  console.log(mt);
  var mymt=mt[psid];//my trigger name from memory
  if(!kycheck(setup.trigger,[mymt])) return false;
  var triggerentities=JSON.parse(JSON.stringify(setup.trigger[mymt]));
  var entities=JSON.parse(JSON.stringify(list.entities));
  var allre=allrememberentities(mymt);
  memory.saveentities(psid,allre,list.entities);
    if(!kycheck(setup.trigger[mymt],['_f'])){
      console.log('do not have _f field in setup');
    return false;
  }
  if(kycheck(setup.trigger[mymt],['_c'])){
    if(kycheck(list.entities,['cancel'])){
    console.log('cancel trigger');
    list.stext=setup.trigger[mymt]['_c'];
    memory.deletetrigger(psid);
    return ;
    }
    
  }
  var trm=fn.memorycheck(psid,setup,memory.getremember(),mymt,list);
  console.log(trm);
  if(trm.toremember.length==0){
    //fullfill
    memory.deletetrigger(psid);
    list.stext=setup.trigger[mymt]['_f'];
  }
  else{
    list.stext=setup.trigger[mymt][trm.toremember[0]]['question'];
  }

  
    
  
}
function mergeentities(psid,list,memory){
    //var remember=memory.
}


function firsttrigger(psid,list,trm){
  var toask =JSON.parse(JSON.stringify(trm.toremember));
  if(!kycheck(setup.trigger[trm.trigger],['_f'])){
      console.log('do not have _f field in setup');
    return null;
  }
    if(toask.length==0){
      list.stext=setup.trigger[trm.trigger]['_f'];
       return null;
    }
    //if(Object.keys(trm))
    try{
     // var allre=allrememberentities(trm.trigger);
    memory.savetrigger(psid,trm.trigger);//save trigger 
    }
    catch(err){
      return list;
      console.log('error');
      console.log(err);
    }
    
  for(var i =0;i<toask.length;i++){
    var ask=toask[i];
    try{
    list.stext=setup.trigger[trm.trigger][ask]['question'];
    }
    catch(err){console.log('wrong fulfill/setup setting'+err); return list;}
  //  console.log(setup.trigger[trm.trigger][ask]);
    break;
  }  


}
function clearmemory(){
  setTimeout(function(){
   // console.log('fulfill/fulfill');
  //  console.log(new Date(1*60000).getTime());
memory.clear();
    
    } ,0);

}

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
var allrememberentities=function(triggername){
  if(!kycheck(setup,['keepinmind','trigger'])) return false;
  if(!kycheck(setup.trigger,[triggername])) return false;
  var kip = setup.keepinmind;
  var tkip=Object.keys(setup.trigger[triggername]);
  var re=JSON.parse(JSON.stringify(kip));
  for(var i=0;i<tkip.length;i++){
    if(kip.indexOf(tkip[i])==-1)
    {
      re.push(tkip[i]);
    }
  }
  return re;
};



module.exports=o;