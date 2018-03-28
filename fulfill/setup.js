/*
var set={

    keepInMind:['person'],// thing will remeber along conversation
    trigger:{// thing to trigger from witrespondlist
      'ordercoffee':{// trigger name
          person:{question:'can i get ur name?'}
      
      }
    
    
    }

};

*/
var tr=require('./trsetup.js');
var set={

    keepinmind:['person','greetings'],
    trigger:tr
};



module.exports=JSON.parse(JSON.stringify(set));