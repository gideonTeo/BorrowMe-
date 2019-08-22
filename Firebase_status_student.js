// Author: Nick Sum, Zhi Kai Teo, Joeseph Ti
// Date Created: 7 April 2019

//Retrieve Key
if (typeof(Storage) !== "undefined") {
  var key = localStorage.getItem("login_key")
} else {
  alert("No Web storage avaiable! Use a different web browser");
}

function addRow(tableID,item,availability, obj1,objNum,status,requestData,returnData) {
  if(status !== 0){
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
    
  if(status == 1){
      let newText2 = document.createTextNode("Pending");
      newCell2.appendChild(newText2);
  }else if(status == 2){
      let newText2 = document.createTextNode("Decline");
      newCell2.appendChild(newText2);
  }else if(status == 3){
      let newText2 = document.createTextNode("Accepted");
      newCell2.appendChild(newText2);
  }

  let newText3 = document.createTextNode(requestData)
  newCell3.appendChild(newText3)
    
  let newText4 = document.createTextNode(returnData)
  newCell4.appendChild(newText4)
  
  

 
  //To be continue
  let newButton = document.createElement("BUTTON")
  newButton.innerHTML = "Cancel"
  newButton.setAttribute("id",item)
  newButton.setAttribute("name",obj1)
  newButton.setAttribute("onclick",`removeCart(${item})`)  
  newCell5.appendChild(newButton)
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




function refreshTableStatus()
{  
   refObject01 = firebase.database().ref()

        refObject01.on('value',dataCallBack)

        function dataCallBack(data){
        var arrayObject = snapshotToArray(data);
        for(var i = 0;i<arrayObject.length;i++){
            addRow("status_table",arrayObject[i].name_item,arrayObject[i].availability,`object${i}`,i,arrayObject[i].ready,arrayObject[i].req_date,arrayObject[i].ret_date)
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
    addRow("item_table",setText.value,setNumber.value,`object${count}`)
})


}

function borrowItem(item){

   var objectName = item.name
    console.log(item.name)
   var borrowObject = firebase.database().ref()
  
   borrowObject.child(`${objectName}/ready`).set(1)
   
  
}

function removeCart(item){
    console.log('hey')
    console.log(item)
    var objectName = item.name
    var removeStatus = firebase.database().ref()
    removeStatus.child(`${objectName}/ready`).set(0)
    var i = item.parentNode.parentNode.rowIndex
    document.getElementById("status_table").deleteRow(i);
}




refreshTableStatus();

