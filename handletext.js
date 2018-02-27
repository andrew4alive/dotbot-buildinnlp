var fbresponselist = require('./fbresponselist');

var respond = require('./respondhandler');

module.exports=function(psid,msg,resolve,reject){
 // var fbresponselist=JSON.parse(JSON.stringify(fbresponselist.wit));
     if(fbresponselist.list.length>0){
   var ly =reslistloop(psid,msg); // responloop exec ?
      resolve (ly); 
      if(ly!=null)
  return;
     }
  var d0={};
  var d1='defaultres';
  d0[d1]=fbresponselist[d1];
  d0['text']=msg.text;
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
         fblist[i]['text']=msg.text;
         respond(psid,fblist[i])
         if(fblist[i].tosave==true){
          
           return true ;
         }   
        // return false if no tosave key 
         
         return false ;
     }
     }

      return null;
}