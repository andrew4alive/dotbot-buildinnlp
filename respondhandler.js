var replyfb= require('./replyfb.js');
var witrespond=require('./witrespond');
var url=process.env.fbmsgurl;


module.exports = function(psid,list){
    var ky = Object.keys(list); 
    //console.log(list);
      if(ky.indexOf('stext')!=-1){
        var plist = witrespond(list);
        console.log(plist);
        replyfb.withtext(url,psid,plist.stext);
    
      }
      else if(ky.indexOf('defaultres')!=-1){
          replyfb.withtext(url,psid,list.defaultres);
          
      }
  
}
