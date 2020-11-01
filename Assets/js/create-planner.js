    //var dt = new Date();
    // get today’s date (will be a UTC date so from there you can get day of week, hour … etc.)
    var dt = moment();
    var  dayOfWeek = dt.format("DDDD");
    var hour =    dt.format("HH");
    var today = dt.format(`MMMM-DD-YYYY`);
    var calDetails=[],todaysItems=[];
    var dateString = "";
   


    function startPlanner(){
      //if ()
      dt = moment();
      // enable tooltip
    

      dayOfWeek = dt.format("DDDD");
      hour =    dt.format("HH");
      today = dt.format(`MMMM-DD-YYYY`);
      let cd=document.querySelector('#currentDay');
      cd.textContent = today;
     
      //Lets just do it for today - place holder for yesterday and tomorrow
      dateString = today;
      todaysItems = getCalendarItems(dateString);
     
      // console.log(todaysItems);
      // todaysItems[18] = "go home";
      // console.log(todaysItems);
      createPlannerPage(dateString);
   
    }
/* for future function so I can look at yesterday today and tomorrow change date might be fun 
    function addNavBar(){
    let cd=document.querySelector('#currentDay');
    cd.textContent = today;
    let newNav = document.createElement("nav");
    newNav.setAttribute("Class","navbar navbar-expand-lg");
    newNav.innerHTML()
    
//     <span><a>High Score:&nbsp; </a></span>
//     <span><a id="highScore"></a></span>
//   <!-- Making the button toggler to be uses as window is collapsed -->
//   <div class=" ml-auto justify-content-end">
//     <span><a>Time Remaining: </a></span>
//     <span><a id="timerem"></a></span>
// </div>
// </nav>
    } */

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
        if (itemTxt.length >1 ){
          icon = `class="fas fa-calendar-check"`;
        } else { 
          icon = `class="far fa-calendar"`
        }
        but1 = '<div class="row"><div class="btn border  first-btn">' + divTimetext + '</div>';       
        if (i < hour){
           but2 = '<div class="btn second-btn-overlay" data-toggle="tooltip" title="Time slot is in the past cannot be updated">'+ itemTxt +'</div>';
           but3 = '<button type="button" class="btn border third-btn-past" ' + 'id = "' + i + '">' + 
           '<i  id="icon'+i+'"'+icon + '></i></button></div>';
         } else if (i == hour){
          but2 = '<input type="text" class="btn second-btn-pres" id = calItem'+i+ ' value="'+ itemTxt +'"></input>';
          but3 = '<button type="button" class="btn border third-btn-pres" ' + 'id = "' + i + '">' + 
          '<i id="icon' +i+'"'+icon + '></i></button></div>';}
           else {
          but2 = '<input type="text" class="btn second-btn" id = calItem'+i+ ' value="'+ itemTxt +'"></input>';
         but3 = '<button type="button" class="btn border third-btn" ' + 'id = "' + i + '">' + 
         '<i id="icon' +i+'"'+icon + '></i></button></div>';}
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
      let j = this.id;
      let i = "#calItem"+j;
      let  icon = document.querySelector('#icon'+j);
      let itm2 = document.querySelector(i).value;
      todaysItems[j] = itm2;
      let updatedItems = JSON.stringify(todaysItems);
      //this one actually saves the data
      localStorage.setItem(dateString,updatedItems);
      // chnage the icon if we add contact (tried toogle but not using jquery)
      if(itm2.length > 1){
      icon.setAttribute("class","fas fa-calendar-check");
      } else {
        icon.setAttribute("class","far fa-calendar");
      }
    }

  function getCalendarItems(dateString){ 
      //Get the High Score for the start
      if (!localStorage.getItem(dateString)){ 
       createCal(dateString);
      }
      calDetails=JSON.parse(localStorage.getItem(dateString));
      return calDetails;
  }

  function createCal(dateString){
    /*creating the calendar array as a string because it simpler to work with text strings 
    and it needs to be in text json format to add it to local storage anyway! */
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
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
    startPlanner();
