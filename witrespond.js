var interpole={};
 interpole.start='{{';
 interpole.end='}}';

module.exports=function witrespond(list){
    var ls = JSON.parse(JSON.stringify(list));

  if(Object.keys(ls).indexOf('wit')==-1&&Object.keys(ls).indexOf('rtext')==-1){
    console.log('fbrespondlist error');  
    return null;
  }
  if(Object.keys(ls).indexOf('wit')>=0){

  var entities=ls.entities;
  var stext=ls.stext;
  //  console.log('from witrespond file');
 // console.log(stext);
  // console.log(entities);

    var sta=findbracket(stext,true);
   ls.stext = replacelist(ls,sta);
   // console.log('sta is:');
   // console.log(sta);
    
  }
 // console.log(ls);
  return ls;
}
  

function findbracket(stext,unique){
   var rest='\{\{(([^\{][^\{]*)|([^\}][^\}]*))\}\}';
    var regexe = new RegExp(rest,'g');
  //var sta=stext.match(/\{\{(([^\{][^\{]*)|([^\}][^\}]*)|(\}\})|(\{\{))\}\}/g);
    var sta=stext.match(regexe);
  if(sta==null) return [];
  
  if(unique!=undefined){

   sta=sta.filter(function(c,i,a){//c=current value,i=index,a=array    
     var r1=a.lastIndexOf(c)
     var r2=a.indexOf(c,i);
     return r1==r2;
    });
  }
  return sta;

}



function replacelist(list,bracket){
  
  var list=JSON.parse(JSON.stringify(list));
  if(!Array.isArray(bracket)) return list;
  
  var re=[];
  var bracket = JSON.parse(JSON.stringify(bracket));
  var ls = JSON.parse(JSON.stringify(list));
  var lsky=Object.keys(ls.entities);
 // console.log(lsky);
  var temp={};
  var b1=[];
  for(var i=0;i<bracket.length;i++){
      var m=bracket[i].slice(2,bracket[i].length-2);
      //console.log(m);
    
      if(lsky.indexOf(m)!=-1){
        //console.log(m+' match');
        var reg= new RegExp(bracket[i],'g');
      ls.stext =   ls.stext.replace(reg,ls.entities[m].value);
       
      }
    else{  b1.push(bracket[i]); }
    
  }
  /*
  var bracket=JSON.parse(JSON.stringify(b1));
  var b1=[];
    for(var i=0;i<bracket.length;i++){
      var m=bracket[i].slice(2,bracket[i].length-2);
      
    
     // var reg=new RegExp('\{\{(([^\{][^\{]*)|([^\}][^\}]*))\}\}','g');
     // ls.stext =   ls.stext.replace(bracket[i],m);
      if(m.match(/[\{]{2,}/g)==null&&m.match(/[\}]{2,}/g)==null)
        ls.stext =   ls.stext.replace(bracket[i],m);
      else{b1.push(bracket[i]);}
  } 
  */
    var bracket=JSON.parse(JSON.stringify(b1));
  var b1=[];
    for(var i=0;i<bracket.length;i++){
      var m=bracket[i].slice(2,bracket[i].length-2);
 
     
        ls.stext =   ls.stext.replace(bracket[i],m);
      
  } 

  //console.log(bracket);
  //console.log(ls);
    return ls.stext;
}