

module.exports=function(){
  var m={};
  m.ori=null;
  m.path=null;
  var init=false;
  m.init=function(ori,path){
   if(ori!=null)
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
 
    if(Array.isArray(m.ori)) {
      ar(m,li);
      return;
    }
     if(typeof m.ori=='object'){
      ob(m,li)
       return;  
     }
  };
  
  return m;
}


function ob(m,li){
  try{
    var li=m.path+'/'+li;
    var mo=require(li);
    if(mo!=null&&typeof mo=='object'){
      if(!Array.isArray(mo)){
      Object.assign(m.ori,mo);
      }
    }
  }
  catch(err){
 
  }
}

function ar(m,li){
   try{
      var li=m.path+'/'+li;
       var mo=require(li);
      if(mo!=null&&Array.isArray(mo)){
 
        for(var i in mo){
          m.ori.push(mo[i]);
        }

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
}