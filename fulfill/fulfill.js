var setup=require('./setup');
var memory=require('./memory');

var o = {};

//var remember={};

o.remember=function(psid,list){
  var entities=JSON.parse(JSON.stringify(list.entities));
  clearmemory();
  var kips=setup.keepInMind;
  memory.save(psid,kips,entities);

};

o.memory=function(psid){
 // console.log('fulfill/fullfill');
//  console.log(remember);
  return memory.get(psid);
 
};

o.respond=function(psid,list){


};

function clearmemory(){
  setTimeout(function(){
   // console.log('fulfill/fulfill');
  //  console.log(new Date(1*60000).getTime());
memory.clear();
    
    } ,0);

}




module.exports=o;