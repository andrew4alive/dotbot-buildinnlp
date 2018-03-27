

module.exports=function(){
  var m={};
  m.ori=null;
  m.path=null;
  var init=false;
  m.init=function(ori,path){
   if(ori!=null&&Array.isArray(ori))
    m.ori=ori;
    else  return false;
    if(typeof path=='string')
    m.path=path;
    else return false;
    
    return true;
  };
  
  m.add=function(li){
   if(typeof li!='string' &&m.path!=null&&m.ori!=null){ 
   console.log('setup  loader init');
     return false;
   }
 //  if(init==false) {console.log('must init setuploader');return false;} 
   try{
      var li=m.path+'/'+li;
       var mo=require(li);
      if(mo!=null&&Array.isArray(mo)){
 
        for(var i in mo){
          m.ori.push(mo[i]);
        }
     //   m.ori=m.ori+mo;
       //  console.log(m.ori);
      }
     else if(mo!=null&&typeof mo=='object'){
        m.ori.push(mo);
     }
     else 
       return false;
     
     return true;
   }
  catch(err){
    return false;
    }
  };
  
  return m;
}