var tr={};


var add=require('../setuploader')();
add.init(tr,__dirname+'/trl');
add.add('index');
add.add('me');

module.exports=tr;