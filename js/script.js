// to do list array
var toDoList = [];

var descriptionCol = document.querySelector('#description');
var completedCol = document.querySelector('#completed');
var removeCol = document.querySelector('#remove');

// task class
var task = function(name) {    
  this.name = name;
  this.complete = false;
  this.removeTask = function() {
      for (var i=0; i < toDoList.length; i++) {
          if (toDoList[i].name == this.name) {
              toDoList.splice(i,1);
          }
      }
  };
  this.markComplete = function() {
      this.complete = true;
  };
}

// add Task function
var addTask = function(taskName) {
    toDoList.push(new task(taskName));
}

// Add Task Button
var taskName = document.querySelector('#taskName');
var taskAdded = document.querySelector('#addTask');

taskAdded.addEventListener('click', function() {
  addTask(taskName.value);
  reload();
  taskName.value = "";
});

document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      event.preventDefault();
      addTask(taskName.value);
      reload();
      taskName.value = "";
    }
});

// // Mark Complete Function
// function markComplete() {

//   completeRow.innerHTML = "<input type='checkbox' name='vehicle' value='Bike'>";
//   completedCol.appendChild(completeRow);

// }

// Function for loading and reloading table
function reload() {

  // Clear table
  var element = document.querySelectorAll('.gray-row, .white-row');

  for (var i=0;i<element.length;i++) {
    element[i].parentNode.removeChild(element[i]);
  };

  // Update Items Remaining
  var count = 0;
  for (var i=0; i<toDoList.length; i++) {
    if (toDoList[i].complete) {
      count++;
    }
  }
  document.querySelector('#count').innerHTML = toDoList.length - count;

  // Insert updated table
  for (var i=0; i<toDoList.length; i++) {

    var descRow = document.createElement('div');
    descRow.id = "row" + i;
    descRow.innerHTML = toDoList[i].name;
    descriptionCol.appendChild(descRow);

    var completeRow = document.createElement('div');
    completeRow.id = "row" + i;
    var completeCheckBox = document.createElement('input');
    completeCheckBox.id = i;
    completeCheckBox.setAttribute("type", "checkbox");
    if (toDoList[i].complete) {
      completeCheckBox.setAttribute("checked", "checked");
    };
    completeCheckBox.addEventListener('click', function() {
      if (toDoList[this.id].complete) {
        toDoList[this.id].complete = false;
      } else {
        toDoList[this.id].complete = true;
      }
        reload();
    });
    completeRow.appendChild(completeCheckBox);
    completedCol.appendChild(completeRow);

    var removeRow = document.createElement('div');
    removeRow.id = "row" + i;
    var removeButton = document.createElement('a');
    removeButton.className = "removeButton";
    removeButton.id = i;
    removeButton.setAttribute("href","#");
    removeButton.innerHTML = "&#x2716;";
    removeButton.style.color = "#993333";
    removeButton.addEventListener('click', function() {
      toDoList.splice(this.id,1);
      reload();
    });
    removeRow.appendChild(removeButton);
    removeCol.appendChild(removeRow);


    if (i%2===0) {
      descRow.className = "gray-row";
      completeRow.className = "gray-row";
      removeRow.className = "gray-row";
    } else {
      descRow.className = "white-row";
      completeRow.className = "white-row";
      removeRow.className = "white-row";
    }

  }
}