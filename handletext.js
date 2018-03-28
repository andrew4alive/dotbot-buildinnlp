var fbresponselist = require('./fbresponselist');

var respond = require('./respondhandler');

module.exports=function(psid,msg,resolve,reject){
  //console.log('handletext',msg);
 // var fbresponselist=JSON.parse(JSON.stringify(fbresponselist.wit));
    var ly=null;
     if(fbresponselist.list.length>0){
      // console.log('handletext1');
       
    ly =reslistloop(psid,msg); // responloop exec ?
    //  console.log(ly);
      resolve (ly); 
      if(ly!=null){
       reshandler(psid,ly,msg);
          return;
      }
       else{
       
       }
     }
  var d0={};
  var d1='defaultres';
  d0[d1]=fbresponselist[d1];
  d0['text']=msg.text;

   reshandler(psid,d0,msg);

    resolve( false);
  return false;

}

function reslistloop(psid,msg){

    var fblist =JSON.parse(JSON.stringify(fbresponselist.list));
  
   var rtext = msg.text;
   for(var i=0;i<fblist.length;i++){
        var keys= Object.keys(fblist[i]);
       if(keys.indexOf('rtext')==-1) continue;
       if(fblist[i].rtext.trim()==rtext.trim()){
        var fb=entities(fblist[i],msg);
         fb['text']=msg.text;
   
         return fb ;
     }
     }

      return null;
}
//handler

function reshandler(psid,ly,msg){
  try{
           ly['entities']=msg['entities'];
         }catch(err){}
        respond(psid,ly);

}
//helper add entitie
function entities(list,msg){
    if(Object.keys(msg).indexOf('nlp')==-1) return list;
    if(Object.keys(msg.nlp).indexOf('entities')==-1) return list;
     var fblist =JSON.parse(JSON.stringify(list));
      fblist['entities']=msg.nlp.entities;
    return fblist;
}

