
    function danas() {

          var d = new Date();
          d.setDate(d.getDate());
          var mjesec = d.getMonth() + 1
          var dan = d.getUTCDate()
          if (dan < 10) {
           dan = '0' + dan
          } 
          if (mjesec < 10) {
           mjesec = '0' + mjesec
          }
          var datum =  d.getFullYear() +'-'+ mjesec +'-'+ dan
    
          return datum
        }
    function jucer() {

      var d = new Date();
      d.setDate(d.getDate() - 1);
      var mjesec = d.getMonth() + 1
      var dan = d.getUTCDate()
      if (dan < 10) {
       dan = '0' + dan
      } 
      if (mjesec < 10) {
       mjesec = '0' + mjesec
      }
      var datum =  d.getFullYear() +'-'+ mjesec +'-'+ dan

      return datum
    }
    function pjucer() {

      var d = new Date();
      d.setDate(d.getDate() - 2);
      var mjesec = d.getMonth() + 1
      var dan = d.getUTCDate()
      if (dan < 10) {
       dan = '0' + dan
      } 
      if (mjesec < 10) {
       mjesec = '0' + mjesec
      }
      var datum =  d.getFullYear() +'-'+ mjesec +'-'+ dan

      return datum
    }
    function tri() {

      var d = new Date();
      d.setDate(d.getDate() - 3);
      var mjesec = d.getMonth() + 1
      var dan = d.getUTCDate()
      if (dan < 10) {
       dan = '0' + dan
      } 
      if (mjesec < 10) {
       mjesec = '0' + mjesec
      }
      var datum =  d.getFullYear() +'-'+ mjesec +'-'+ dan

      return datum
    }  
    function cetiri() {

      var d = new Date();
      d.setDate(d.getDate() - 4);
      var mjesec = d.getMonth() + 1
      var dan = d.getUTCDate()
      if (dan < 10) {
       dan = '0' + dan
      } 
      if (mjesec < 10) {
       mjesec = '0' + mjesec
      }
      var datum =  d.getFullYear() +'-'+ mjesec +'-'+ dan

      return datum
    } 
    function pet() {

      var d = new Date();
      d.setDate(d.getDate() - 5);
      var mjesec = d.getMonth() + 1
      var dan = d.getUTCDate()
      if (dan < 10) {
       dan = '0' + dan
      } 
      if (mjesec < 10) {
       mjesec = '0' + mjesec
      }
      var datum =  d.getFullYear() +'-'+ mjesec +'-'+ dan

      return datum
    }   
export default {
  itemsPerPage: [
    {
      value: 'DANAS'
    },
 
    {
      value: 'Svi Rezultati'
    },
 
    {
      value: 'NA ČEKANJU'
    },
 
    {
      value: 'U OBRADI'
    },
 
    {
      value: 'REALIZOVAN'
    }
  ]


}
