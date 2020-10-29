    //var dt = new Date();
    var dt = moment(); 
    var dayOfWeek = dt.getDay(); 
    var hour =  dt.getHours();
    var today = dt.toLocaleDateString()
    var calDetails=[],todaysItems=[];
    var dateString = "";


    function startPlanner(){
      //Lets just do it for today
      dateString = today;
      todaysItems = getCalendarItems(dateString);
      console.log(todaysItems);
      todaysItems[0][18] = "go home";
      console.log(todaysItems);
      createPlannerPage(calDetails);
      localStorage.removeItem('dailyCalendar');
      localStorage.setItem('dailyCalendar',JSON.stringify(calDetails));

    }

    function createPlannerPage(dateString){
      var head = document.querySelector('#currentDay');
      var TB = document.querySelector('#timeBlocks');
      let div = document.createElement("div")
      head.textContent = dateString;
      let divTimetext ="";
      let se='<div class="container">';
      // create the buttons for all of 
      for (i = 8; i<=18; i++){
        let hr = "timeSlot" + i;  
        
        let but1 = "";but2 = ""; but3 = ""
        if (i<12) {
            divTimetext= i + ":00 AM";}
        else if(i === 12){
            divTimetext= "noon";
        } else {
            divTimetext = (i-12) + ":00 PM"
        } 
        let itemTxt = todaysItems[0][i];

        but1 = '<div class="row"><div class="btn border  first-btn">' + divTimetext + '</div>';
         if (i <= hour){
           but2 = '<label class="btn border second-btn-past" id = "'+hr+ '" h1>'+ itemTxt  +'</label>';
           but3 = '<button type="button" class="btn border third-btn-past" ' + 'id = "' +  + '">' + 
           '<i class="far fa-calendar"></i></button></div>';
         } else { but2 = '<input type="text" class="btn border second-btn" id = "'+hr+ '" value="'+ itemTxt +'"></input>';
         but3 = '<button type="button" class="btn border third-btn" ' + 'id = "' + i + '">' + 
         '<i class="far fa-calendar"></i></button></div>';}
        se += but1 + but2 +but3;
      }
    se +='</div>'
    TB.innerHTML = se;

      Listen to the input buttons for the click!
      var elements = document.querySelectorAll("input[type=button]");   
      for(var i = 0, len = elements.length; i < len; i++) {   
        elements[i].addEventListener("click", saveCalendarItem());
      } 

    

    }

    function saveCalendarItem(){
      let dateEntries = [];
    }


  function getCalendarItems(dateString){
  
      //Get the High Score for the start
      if (!localStorage.getItem('dailyCalendar')){
       setCal(dateString);
      }
      calDetails=JSON.parse(localStorage.getItem('dailyCalendar'));
      return calDetails[dateString];
  }

  function setCal(dateString){
    /*creating the calendar array as a string because it simpler to work with text strings 
    and it needs to be in text json to add it to local storage anyway! */
    let j = '{"'+dateString+'": [{'
    let k = "", s="";
    for (let i = 8; i  < 19; i++){
      if( i == 18){
        k = '"'+i+'": " "';
      } else {
        k = '"'+i+'": " ",';
      }
      j = j + k; 
    }
  j=j+'}]}';
   localStorage.setItem('dailyCalendar',j);
     }




//    setCal();
    startPlanner();