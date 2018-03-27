var confidence=0.5;

module.exports=function highconfidenceAll(entities){
   // console.log(entities);
  var entities = JSON.parse(JSON.stringify(entities));
  var re ={};
   for (var ky in entities){
        // console.log(ky);
        re[ky] =  highconfidence(entities[ky]) ;
     if(re[ky]['confidence']<confidence)
       delete re[ky];
   }
  return re;
}

function highconfidence(entity){
  var he={};
    entity.forEach(function(ob){
      var ky=Object.keys(he);
      if(ky.indexOf('confidence')==-1){
        he=ob;
        return;
      }
      if(ob.confidence>he.confidence){
        he=ob;
      }
    });
  return he;
}