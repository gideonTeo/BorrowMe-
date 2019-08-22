// Author: Nick Sum, Zhi Kai Teo, Joeseph Ti
// Date Created: 7 April 2019


//Retrieve Key
if (typeof(Storage) !== "undefined") {
  var key = localStorage.getItem("login_key")
} else {
  alert("No Web storage avaiable! Use a different web browser");
}

function addRow(tableID,item,availability, obj1,objNum,status) {
  // Get a reference to the table
  let tableRef = document.getElementById(tableID);
  // Insert a row at the end of the table
  let newRow = tableRef.insertRow(-1);

  // Insert a cell in the row at index 0
  let newCell = newRow.insertCell(0);
  let newCell2 = newRow.insertCell(1);
  let newCell3 = newRow.insertCell(2)
  let newCell4 = newRow.insertCell(3)
  let newCell5 = newRow.insertCell(-1)
  // Append a text node to the cell
  let newText = document.createTextNode(item);
  newCell.appendChild(newText);
  
  if(status == 0){
      let newText2 = document.createTextNode("Available");
      newCell2.appendChild(newText2);
  }else{
      let newText2 = document.createTextNode("Non-Available");
      newCell2.appendChild(newText2);
  }

/*  let newText2 = document.createTextNode(availability);
  newCell2.appendChild(newText2);*/
  
  let newDate = document.createElement("INPUT")
    newDate.setAttribute("type","date")
  newDate.setAttribute("id","req_date")

  newCell3.appendChild(newDate)
    
  let newDate2 = document.createElement("INPUT")
  newDate2.setAttribute("type","date")
  newDate2.setAttribute("id","ret_date")

  newCell4.appendChild(newDate2)
 
  //To be continue
  let newButton = document.createElement("BUTTON")
  newButton.innerHTML = "Add"
  newButton.setAttribute("id",item)
  newButton.setAttribute("name",obj1)
  newButton.setAttribute("onclick",`borrowItem(${item})`)  
  newCell5.appendChild(newButton)
}

//convert snapshot to array
function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};



// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCEEsaw57DAA3t0iOXQDz8up1cF0fTyAgg",
    authDomain: "borrowtest-1ec06.firebaseapp.com",
    databaseURL: "https://borrowtest-1ec06.firebaseio.com",
    projectId: "borrowtest-1ec06",
    storageBucket: "borrowtest-1ec06.appspot.com",
    messagingSenderId: "505708032144"
  };

firebase.initializeApp(config);




function refreshTableStudent()
{  
   refObject01 = firebase.database().ref()

        refObject01.on('value',dataCallBack)

        function dataCallBack(data){
        var arrayObject = snapshotToArray(data);
        for(var i = 0;i<arrayObject.length;i++){
            addRow("student_table",arrayObject[i].name_item,arrayObject[i].availability,`object${i}`,i,arrayObject[i].ready)
        }


       refObject01.off()
    
    }
}



function setItem(){
    var setText = document.getElementById("setText");
    var setNumber = document.getElementById("setNumber")
    refObject03 = firebase.database().ref().once('value').then(function(snapshot){
    
    var arrayObject = snapshotToArray(snapshot)
    var count = arrayObject.length
    console.log(count)
    var setObject = firebase.database().ref()
    setObject.child(`object${count}/name_item`).set(setText.value)
    setObject.child(`object${count}/availability`).set(setNumber.value)
    setObject.child(`object${count}/ready`).set(0)
    addRow("item_table",setText.value,setNumber.value,`object${count}`)
})


}

function borrowItem(item){
  var req_date = document.getElementById("req_date");
   var ret_date = document.getElementById("ret_date");
   var objectName = item.name

   var borrowObject = firebase.database().ref()
  
   borrowObject.child(`${objectName}/ready`).set(1)
   borrowObject.child(`${objectName}/req_date`).set(ret_date.value)
   borrowObject.child(`${objectName}/ret_date`).set(req_date.value)
   
  
}





refreshTableStudent();

