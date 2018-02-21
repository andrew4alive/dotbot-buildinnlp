var setup=require('./setup');

var o = {};

var remember={};

var getremember=function(key){
  if(Object.keys(remember).indexOf(key)==-1) return {};
  return remember[key];
};

var setremember=function(key,ob){
  try{
  remember[key]=ob;
    return true;
  }
  catch(err){
    return false;
  }
}

module.exports=o;