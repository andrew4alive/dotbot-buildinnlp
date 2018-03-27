var fbresponselist = require('./fbresponselist');

var respond = require('./respondhandler');

module.exports=function(psid,msg,resolve,reject){
  //console.log('handletext',msg);
 // var fbresponselist=JSON.parse(JSON.stringify(fbresponselist.wit));
     if(fbresponselist.list.length>0){
      // console.log('handletext1');
   var ly =reslistloop(psid,msg); // responloop exec ?
    //  console.log(ly);
      resolve (ly); 
      if(ly!=null)
  return;
     }
  var d0={};
  var d1='defaultres';
  d0[d1]=fbresponselist[d1];
  d0['text']=msg.text;
  try{
  d0['entities']=msg.entities;
  }catch(err){}//d0=entities(d0,msg);
  respond(psid,d0);
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
         try{
           fb['entities']=msg['entities'];
         }catch(err){}
         console.log('fb',fb)
         fb['text']=msg.text;
         respond(psid,fb);
       /*  if(fblist[i].tosave==true){
          
           return true ;
         }*/   
        // return false if no tosave key 
         
         return false ;
     }
     }

      return null;
}

//helper add entitie
function entities(list,msg){
    if(Object.keys(msg).indexOf('nlp')==-1) return list;
    if(Object.keys(msg.nlp).indexOf('entities')==-1) return list;
     var fblist =JSON.parse(JSON.stringify(list));
      fblist['entities']=msg.nlp.entities;
    return fblist;
}

