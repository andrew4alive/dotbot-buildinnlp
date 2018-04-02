var map={
    
  ////<postback name>:<entity name>:{value:<entity value>}
  drink_latte:{
      postback_drink:{
        value:'latte'
      },
    intent:{
        value:'postback:order:coffee'
      
    }  
  },
  drink_americano:{
      postback_drink:{
        value:'americano'
      },
    intent:{
        value:'postback:order:coffee'
      
    }  ,
  }
  
};



module.exports=function(){
  if(map!=null&&typeof map=='object')
  return JSON.parse(JSON.stringify(map))
  
  return {};
    };