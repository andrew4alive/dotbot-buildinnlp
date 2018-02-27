var replyfb= require('./replyfb.js');
var witrespond=require('./witrespond');
var fulfill=require('./fulfill/fulfill');
var url=process.env.fbmsgurl;
/*
list example
list={ entities: { greetings: { confidence: 0.99993050098374, value: 'true' } },
  stext: 'hello, what can ai can help u with? ',
  wit: true }

*/

module.exports = function(psid,list){
    var ky = Object.keys(list); 
  console.log('from respondhandler file 1');
    console.log(list);
  var plist=JSON.parse(JSON.stringify(list));
  fulfill.remember(psid,list);
  console.log('from respondhandler file 2');
  console.log(fulfill.memory(psid));
  //if(ky.indexOf('fulfill')!=-1){
    plist=fulfill.respond(psid,list);
  //}
      if(ky.indexOf('stext')!=-1){
       plist = witrespond(plist);
        
        
      
       // plist=fulfill.respond(psid,list)
      //console.log(fulfill.memory(psid));
      //  console.log(plist);
        replyfb.withtext(url,psid,plist.stext);
    
      }
      else if(ky.indexOf('defaultres')!=-1){
          replyfb.withtext(url,psid,list.defaultres);
          
      }
  
}
