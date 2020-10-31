    //var dt = new Date();
    // get today’s date (will be a UTC date so from there you can get day of week, hour … etc.)
    var dt = moment();
    var  dayOfWeek = dt.format("DDDD");
    var hour =    dt.format("HH");
    var today = dt.format(`MMMM-DD-YYYY`);
    var calDetails=[],todaysItems=[];
    var dateString = "";
    console.log(today);


    function startPlanner(){
      //Lets just do it for today
      dateString = today;
      todaysItems = getCalendarItems(dateString);
      console.log("here" + todaysItems);
      // console.log(todaysItems);
      // todaysItems[18] = "go home";
      // console.log(todaysItems);
      createPlannerPage(dateString);
      //localStorage.removeItem('dailyCalendar');
      //localStorage.setItem('dailyCalendar',JSON.stringify(calDetails));
   
    }

    function createPlannerPage(dateString){
      var head = document.querySelector('#currentDay');
      var TB = document.querySelector('#timeBlocks');
      let div = document.createElement("div");
      let itemTxt =""; 
      head.textContent = dateString;
      var se='<div class="container">';
      // create the buttons for all of 
      for (let i = 8; i <=18; i++){
        let divTimetext = moment(i,"H").format("h:mm a");
        itemTxt  = todaysItems[i];
        but1 = '<div class="row"><div class="btn border  first-btn">' + divTimetext + '</div>';       
        if (i <= hour){
           but2 = '<input readonly class="btn second-btn-past" id = calItem'+ i+ ' value="'+ itemTxt +'"></input>';
           but3 = '<button type="button" class="btn border third-btn-past" ' + 'id = "' + i + '">' + 
           '<i class="far fa-calendar"></i></button></div>';
         } else { but2 = '<input type="text" class="btn second-btn" id = calItem'+i+ ' value="'+ itemTxt +'"></input>';
         but3 = '<button type="button" class="btn border third-btn" ' + 'id = "' + i + '">' + 
         '<i class="far fa-calendar"></i></button></div>';}
        se += but1 + but2 +but3;
      }
    se +='</div>';
    TB.innerHTML = se;

      // Listen to the input buttons for the click!
      var elements = document.querySelectorAll("button");   
      //create listeners for all the buttons
      for(var i = 0, len = elements.length; i < len; i++) {   
        elements[i].addEventListener("click", saveCalendarItem)
      } 
      //create a listener for the clear all
      document.querySelector("#clearAll").addEventListener("click", function(e){
        e.preventDefault();        
        localStorage.removeItem(dateString);
        location.reload();
      })
    }
    

  

    function saveCalendarItem(){
      console.log(this);
      let j = this.id;
      let i = "#calItem"+j;
      let itm2 = document.querySelector(i).value;
      todaysItems[j] = itm2;
      let updatedItems = JSON.stringify(todaysItems);
      localStorage.setItem(dateString,updatedItems);

    }


  function getCalendarItems(dateString){ 
      //Get the High Score for the start
      if (!localStorage.getItem(dateString)){ 
       createCal(dateString);
      }
      calDetails=JSON.parse(localStorage.getItem(dateString));
      console.log("yo" + calDetails);
      return calDetails;
  }

  function createCal(dateString){
    /*creating the calendar array as a string because it simpler to work with text strings 
    and it needs to be in text json to add it to local storage anyway! */
    let j = '{'
    let k = "", s="";
    for (let i = 8; i  <= 18; i++){
      if( i == 18){
        k = '"'+i+'": " "';
      } else {
        k = '"'+i+'": " ",';
      }
      j = j + k; 
    }
  j=j+'}';
   localStorage.setItem(dateString,j); 
   return; 
  }



//    setCal();
    startPlanner();