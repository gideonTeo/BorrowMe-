// Author: Nick Sum, Zhi Kai Teo, Joeseph Ti
// Date Created: 7 April 2019

function student_key(){
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("login_key","student")
    } else {
      alert("No Web storage avaiable! Use a different web browser");
    }

}


function staff_key(){
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("login_key","staff")
    } else {
      alert("No Web storage avaiable! Use a different web browser");
    }

}

function cancel_PopUp(){
var txt;
  if (confirm("Press a button!")) {
    txt = "You pressed OK!";
  } else {
    txt = "You pressed Cancel!";
  }
}