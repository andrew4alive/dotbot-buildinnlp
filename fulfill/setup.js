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

    keepinmind:['person'],
    trigger:{
      'ordercoffee':{
          person:{question:'can i get ur name?'},
          drink:{question:'what coffe u want?'},
      }
    
    
    }

};

module.exports=JSON.parse(JSON.stringify(set));