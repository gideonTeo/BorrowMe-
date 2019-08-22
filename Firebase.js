// Author: Nick Sum, Zhi Kai Teo, Joeseph Ti
// Date Created: 7 April 2019


//Retrieve Key
if (typeof(Storage) !== "undefined") {
  var key = localStorage.getItem("login_key")
} else {
  alert("No Web storage avaiable! Use a different web browser");
}

function addRow(tableID,item,availability, obj1,objNum) {
  // Get a reference to the table
  let tableRef = document.getElementById(tableID);
  //console.log(obj1)
  // Insert a row at the end of the table
  let newRow = tableRef.insertRow(-1);

  // Insert a cell in the row at index 0
  let newCell = newRow.insertCell(0);
  let newCell2 = newRow.insertCell(1);
  let newCell3 = newRow.insertCell(-1)
  // Append a text node to the cell
  let newText = document.createTextNode(item);
  newCell.appendChild(newText);
    
  let newText2 = document.createTextNode(availability);
  newCell2.appendChild(newText2);
  
  let newButton = document.createElement("BUTTON")
  newButton.innerHTML = "Remove"
 newButton.setAttribute("id",item)
  newButton.setAttribute("onclick",`removeItem(${item})`)
  newButton.setAttribute("name",obj1)
  newButton.setAttribute("num",objNum)
  newCell3.appendChild(newButton)
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




function refreshTable()
{  
   refObject03 = firebase.database().ref()

        refObject03.on('value',dataCallBack)

        function dataCallBack(data){
        var arrayObject = snapshotToArray(data);
        for(var i = 0;i<arrayObject.length;i++){
            addRow("item_table",arrayObject[i].name_item,arrayObject[i].availability,`object${i}`,i)
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

function removeItem(item){
    var objectName = item.name
   var removeObject = firebase.database().ref(item.name)
    removeObject.remove()
    var i = item.parentNode.parentNode.rowIndex
    //console.log(i)
    document.getElementById("item_table").deleteRow(i);
}






//eng_Item01();
//eng_Item02();

refreshTable();

