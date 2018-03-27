var ele={
  
  
   withbt:{
       attachment:{
         type:'template',
         payload:{
           template_type:'button',
             text:['*s'] ,///['*s'] macth string
             buttons:['*a'] ,// match any array
         }
       }
   }

};



module.exports=JSON.parse(JSON.stringify(ele));