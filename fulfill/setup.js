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
var set={

    keepInMind:['person'],
    trigger:{
      'ordercoffee':{
          person:{question:'can i get ur name?'}
      
      }
    
    
    }

};

module.exports=JSON.parse(JSON.stringify(set));