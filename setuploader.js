

module.exports=function(){
  var m={};
  m.ori=null;
  m.path=null;
  var init=false;
  var index=0;
  var lis=[];
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

  m.addp=function(li){
       if(typeof li!='string' &&m.path!=null&&m.ori!=null){ 
         console.log('setup  loader init');
        return false;
       }
       lis.push(li);
     // console.log(lis,li);
  };
  m.rc=function(){
   index=0;
  };
  m.loop=function(){
    //for(var i=0;i<lis.length;i++){
         if(Array.isArray(m.ori)) {
           //console.log('loop',m.lis)
          index=index+1;
           if(index<=lis.length)
              return arr(m,lis[index-1]);
           else return null;
       }
     if(typeof m.ori=='object'){
     
       return;  
     }
    //}
  };
  
    m.get=function(option){
    if(option==true){
      return m.ori;
    }
    return m;
  };
  
  return m;
}

function obr(li){

}

function arr(m,li){
  try{
    var mm=[];
   var lip=m.path+'/'+li;
       var mo=require(lip);
      if(mo!=null&&Array.isArray(mo)){
 
        for(var i in mo){
          mm.push(mo[i]);
        }

      }
     else if(mo!=null&&typeof mo=='object'){
        mm.push(mo);
     }
     else 
       return null;
     
     return mm;
    
  }catch(err){
  console.log(err)
  }

}

function ob(m,li){
  try{
    var lip=m.path+'/'+li;
    var mo=require(lip);
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
      var lip=m.path+'/'+li;
       var mo=require(lip);
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