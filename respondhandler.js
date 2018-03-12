var replyfb= require('./replyfb.js');
var witrespond=require('./witrespond');
var fulfill=require('./fulfill/fulfill');
var memorydriver=require('./fulfill/memory-driver');
var fulfillpromise=require('./fulfill/fulfillpromise');
var url=process.env.fbmsgurl;
/*
list example
list={ entities: { greetings: { confidence: 0.99993050098374, value: 'true' } },
  stext: 'hello, what can ai can help u with? ',
  wit: true }

*/

module.exports = function(psid,list){
   var plist=JSON.parse(JSON.stringify(list));
//  memorydriver.ty='mongodb';

  memorydriver.init(psid).then(function(memoryob){
    console.log('memorydriver callback');
    
    //console.log(memoryob);
    var fn=fulfillpromise(psid,memoryob);
   // console.log(process.env.mongourl=='');
    fn.remember(list);  
    var plist=fn.respond(list);
    //console.log('after process')
    var ele=fn.getele();;
    
    var remember={};
    try{
      console.log(ele.remember[psid].entities);
    var rememer=ele.remember[psid].entities;
    }
    catch(err){
    
    }
    //console.log(plist);
    //console.log('memeory save state');
    try{
    memorydriver.end(psid,fn.getele());  
    }
    catch(err){
      console.log('memory end driver error');
      console.log(err);
    }
    
    send(psid,plist);
     
    });
  
 //console.log('from respondhandler file 1');
   // console.log(list);
  return 
  /*fulfill.remember(psid,list);
  //console.log('from respondhandler file 2');
  
  
    plist=fulfill.respond(psid,list);
 // console.log(fulfill.memory(psid));
  //console.log(plist);
  var ky = Object.keys(plist); 
      if(ky.indexOf('stext')!=-1){
       plist = witrespond(plist);
        
        
      
       // plist=fulfill.respond(psid,list)
      //console.log(fulfill.memory(psid));
       // console.log(plist);
        replyfb.withtext(url,psid,plist.stext);
    
      }
      else if(ky.indexOf('defaultres')!=-1){
          replyfb.withtext(url,psid,list.defaultres);
          
      }
  */
}

function mergenetities(){

}

function send(psid,plist){

    var ky = Object.keys(plist); 
      if(ky.indexOf('stext')!=-1){
       plist = witrespond(plist);
        
        
      
       // plist=fulfill.respond(psid,list)
      //console.log(fulfill.memory(psid));
       // console.log(plist);
        replyfb.withtext(url,psid,plist.stext);
    
      }
      else if(ky.indexOf('defaultres')!=-1){
          replyfb.withtext(url,psid,plist.defaultres);
          
      }


}