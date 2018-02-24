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
    //console.log(list);
      if(ky.indexOf('stext')!=-1){
        var plist = witrespond(list);
        fulfill.remember(psid,list);
        console.log('from respondhandler file');
        console.log(fulfill.memory(psid));
      //  console.log(plist);
        replyfb.withtext(url,psid,plist.stext);
    
      }
      else if(ky.indexOf('defaultres')!=-1){
          replyfb.withtext(url,psid,list.defaultres);
          
      }
  
}
