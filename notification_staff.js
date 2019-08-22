// Author: Nick Sum, Zhi Kai Teo, Joeseph Ti
// Date Created: 7 April 2019

//Retrieve Key
if (typeof(Storage) !== "undefined") {
  var key = localStorage.getItem("login_key")
} else {
  alert("No Web storage avaiable! Use a different web browser");
}

function addRow(tableID,item,availability, obj1,objNum,requestData,returnData,status) {
  if(status !== 0){
      let tableRef = document.getElementById(tableID);
  //console.log(obj1)
  // Insert a row at the end of the table
  let newRow = tableRef.insertRow(-1);

  // Insert a cell in the row at index 0
  let newCell = newRow.insertCell(0);
  let newCell1 = newRow.insertCell(1);
  let newCell2 = newRow.insertCell(2);
  let newCell3 = newRow.insertCell(3);
  let newCell4 = newRow.insertCell(4);
  let newCell5 = newRow.insertCell(5);
  // Append a text node to the cell
  let emptyText = document.createTextNode("-");
  newCell.appendChild(emptyText)
  let newText = document.createTextNode(item);
  newCell1.appendChild(newText);
    
  let newText2 = document.createTextNode(requestData);
  newCell2.appendChild(newText2);
  
    
  let newText3 = document.createTextNode(returnData)
  newCell3.appendChild(newText3)
  let newButton = document.createElement("BUTTON")
  newButton.innerHTML = "Accept"
 newButton.setAttribute("id",item)

  newButton.setAttribute("name",obj1)
  newButton.setAttribute("num",objNum)
    newButton.setAttribute("onclick",`acceptItem(${item})`)
  newCell4.appendChild(newButton)
    
  //Button 2
  let newButton2 = document.createElement("BUTTON")
  newButton2.innerHTML = "Decline"
  var secondName = item +"d"
   newButton2.setAttribute("id",secondName)
 
  newButton2.setAttribute("name",obj1)
  newButton2.setAttribute("num",objNum)
   newButton2.setAttribute("onclick",`declineItem(${item})`)
  newCell5.appendChild(newButton2)
  } 
  // Get a reference to the table
  
    
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




function refreshTableNotif()
{  
   refObject03 = firebase.database().ref()

        refObject03.on('value',dataCallBack)

        function dataCallBack(data){
        var arrayObject = snapshotToArray(data);
        for(var i = 0;i<arrayObject.length;i++){
            addRow("notif_table",arrayObject[i].name_item,arrayObject[i].availability,`object${i}`,i,arrayObject[i].req_date, arrayObject[i].ret_date,arrayObject[i].ready)
        }


       refObject03.off()
    
    }
}

function setItem(){
    var setText = document.getElementById("setText");
    var setNumber = document.getElementById("setNumber")
    var state = 0
    refObject03 = firebase.database().ref().once('value').then(function(snapshot){
    
    var arrayObject = snapshotToArray(snapshot)
    var count = arrayObject.length
    console.log(count)
    var setObject = firebase.database().ref()
    setObject.child(`object${count}/name_item`).set(setText.value)
    setObject.child(`object${count}/availability`).set(setNumber.value)
    setObject.child(`object${count}/ready`).set(state)
    addRow("item_table",setText.value,setNumber.value,`object${count}`)
})


}


function declineItem(item){
    var objectName = item.name
    var declineObject = firebase.database().ref()
    declineObject.child(`${objectName}/ready`).set(2)
    
    var i = item.parentNode.parentNode.rowIndex
    console.log(i)
    document.getElementById("notif_table").deleteRow(i);
}

function acceptItem(item){
  var objectName = item.name
   var acceptObject = firebase.database().ref()
   acceptObject.child(`${objectName}/ready`).set(3)
    var i = item.parentNode.parentNode.rowIndex
    console.log(i)
    document.getElementById("notif_table").deleteRow(i);
   
   
}



refreshTableNotif();

