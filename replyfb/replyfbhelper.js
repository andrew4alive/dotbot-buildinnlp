var h={};


h.btpayload=function(payload){
       var ky=Object.keys(payload);
       if(ky.indexOf('template_type')==-1){
         return null; 
       }
       if(ky.indexOf('text')==-1){
         return null; 
       }
       if(ky.indexOf('buttons')==-1){
         return null; 
       }
      if(!Array.isArray(payload.buttons)){
        return null;
      }
  
       var pl={}; 
      
       pl['attachment']={
         type:'template',
         payload:payload,
       };
  
  return pl;

}

module.exports=h;