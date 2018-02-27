var setup=require('./setup');
var memory=require('./memory');
var fn=require('./function');
var o = {};

//var remember={};

o.remember=function(psid,list){
  if(Object.keys(list).indexOf('entities')==-1) return null;
  var entities=JSON.parse(JSON.stringify(list.entities));
  clearmemory();
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
  
  try{
  var list=JSON.parse(JSON.stringify(list));
    var trm=null;
    if(Object.keys(list).indexOf('fulfill')!=-1){
   trm = fn.triggercheck(psid,setup,memory.getremember(psid),list);
    }
  //console.log(trm);// sampel trm respond { toremember: [ 'drink' ], trigger: 'ordercoffee' }, trigger null not trigger
  if(trm!=null)
    firsttrigger(psid,list,trm);
  else{
    memorytrigger(psid,list);
  }
    return list;
  }catch(err){
        console.log(err);
  }
   // console.log(trm);
};

function memorytrigger(psid,list){
  var mt = memory.gettrigger();
  console.log('from memory trigger file fulfill/fulfill');
  console.log(mt);
  
}
function mergeentities(psid,list,memory){
    //var remember=memory.
}


function firsttrigger(psid,list,trm){
  var toask =JSON.parse(JSON.stringify(trm.toremember));
    //if(Object.keys(trm))
    try{
    memory.savetrigger(psid,trm.trigger);
    }
    catch(err){
      console.log('error');
      console.log(err);
    }
    
  for(var i =0;i<toask.length;i++){
    var ask=toask[i];
    try{
    list.stext=setup.trigger[trm.trigger][ask]['question'];
    }
    catch(err){console.log('wrong fulfill/setup setting'+err); return list;}
    console.log(setup.trigger[trm.trigger][ask]);
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




module.exports=o;