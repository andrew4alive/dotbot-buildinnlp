



module.exports=function(psid,memoryob){
  var fn=require('./function');
  var psid=psid;
  var memoryp=require('./memorypromise');
  var memory=memoryp(memoryob);
  var setup=require('./setup');
  var t_fc=null;
  //console.log('fulfill promise init state',setup);
  var setup=JSON.parse(JSON.stringify(setup));
  //console.log('fulfill promise init state 1');
  if(!kycheck(setup,['trigger','keepinmind'])) return null;
  if(!Array.isArray(setup.keepinmind)) return null;
  var o={} ;
  o.getele=function(){
      return memory.getob(psid);
  };
o.remember=function(list){
  if(Object.keys(list).indexOf('entities')==-1) return null;
  var entities=JSON.parse(JSON.stringify(list.entities));
  //clearmemory();
  var kips=setup.keepinmind;
  memory.saveentities(psid,kips,entities);

};

o.memory=function(){
 // console.log('fulfill/fullfill');
//  console.log(remember);
  var remember=memory.getremember(psid);
    if(Object.keys(remember).indexOf(psid)>=0){
    var re={psid:psid,entities:remember[psid]['entities'],createDate:remember[psid]['createDate']};
      return  JSON.parse(JSON.stringify(re));
  }
  return null;
 
};
  
o.end=function(){
  if(t_fc=='_c'||t_fc=='_f'){
     var tremp=o.getele();
    if(!kycheck(tremp,['trigger'])) return;
    if(!kycheck(tremp['trigger'],[psid])) return;
    var tr=tremp['trigger'][psid];
    var kips=setup['keepinmind'];
    var tky=Object.keys(setup['trigger'][tr]);
   // console.log(tky,kips);
    for(var i =0;i <kips.length;i++){
      var t=tky.indexOf(kips[i]);
      if(t!=-1){
         tky.splice(t,1);
      }
    }
   // console.log(tky,kips);
    memory.deleteentity(psid,tky);
    //memory.deleteallentity(psid);
    memory.deletetrigger(psid);
  }
}

o.respond=function(list){
 // console.log('fulfill/fullfill');
 // console.log(list);
  try{
   
    if(!kycheck(list,['entities'])) return list; 
  
  var list=JSON.parse(JSON.stringify(list));
    var trm=null;
    if(Object.keys(list).indexOf('fulfill')!=-1){

   trm = fn.triggercheck(psid,setup,memory.getremember(),list);
     // console.log(trm);
      try{
      memory.saveentities(psid,trm.toremember,list.entities);
      trm = fn.triggercheck(psid,setup,memory.getremember(),list);
      }catch(err){}
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

  if(Object.keys(mt).indexOf(psid)==-1) return false;// confirm have trigger psid, is trigger poreviusly
//  console.log('from memory trigger file fulfill/fulfill');
  //console.log(mt);
  var mymt=mt[psid];//my trigger name from memory
  if(!kycheck(setup.trigger,[mymt])) return false;
  var triggerentities=JSON.parse(JSON.stringify(setup.trigger[mymt]));
  var entities=JSON.parse(JSON.stringify(list.entities));
  var allre=allrememberentities(mymt);
  //console.log(allre);
  memory.saveentities(psid,allre,list.entities);
    if(!kycheck(setup.trigger[mymt],['_f'])){
      console.log('do not have _f field in setup');
    return false;
  }
  if(kycheck(setup.trigger[mymt],['_c'])){
    if(kycheck(list.entities,['cancel'])){
    //console.log('cancel trigger');
    list.stext=setup.trigger[mymt]['_c'];
  //  memory.deletetrigger(psid);
     t_fc='_c';
    return ;
    }
    
  }
  var trm=fn.memorycheck(psid,setup,memory.getremember(),mymt,list);
  //console.log(trm);
  if(trm.toremember.length==0){
    //fullfill
  //  memory.deletetrigger(psid);
    list.stext=setup.trigger[mymt]['_f'];
    t_fc='_f';
  }
  else{
    list.stext=setup.trigger[mymt][trm.toremember[0]]['question'];
  }

  
    
  
}


function firsttrigger(psid,list,trm){
  var toask =JSON.parse(JSON.stringify(trm.toremember));
  if(!kycheck(setup.trigger[trm.trigger],['_f'])){
      console.log('do not have _f field in setup');
    return null;
  }
    if(toask.length==0){
      list.stext=setup.trigger[trm.trigger]['_f'];
      t_fc='_f';
       return null;
    }
  
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

return o;
};