selectedChildID = localStorage.getItem("selectedChildID");  //selected child ID
userUID = localStorage.getItem('userUID'); //selected family ID
selectedWishID = localStorage.getItem('selectedWishID'); //selected wishlist ID

var whishlist = {
  task: []
};

document.querySelectorAll('.fa-sort').forEach((faSort)=>{
  console.log('fasort')
  faSort.onclick = function(){
    console.log('clicked sort')
console.log(whishlist.task);
    whishlist.task.sort((item1, item2)=>{
      if(item1.dueDate >item2.dueDate ){
        return 1;
      } 
      return -1;
    });
    $drawTodos(whishlist.task);
  }
});

// Progress battery
var batteryContainer = document.querySelector('.battery-container');
var achievePercent = document.querySelector('#taskProcent');
var totalPoint = document.querySelector('.total-point');
var yourPoint = document.querySelector('.your-point');


function calcPers(totalPoint, myPoint) {
  var huwi = (myPoint / totalPoint) * 100;
  achievePercent.style.width = `${huwi}%`;
  let percent = parseInt(`${huwi}%`);
  achievePercent.innerHTML =  percent + '%';
};

// point 
  function  onTotalPoint(point){
      totalPoint.innerHTML = point;
  };

function  onYourPoint(myPoint){
  yourPoint.innerHTML = myPoint;
};

function drawFromTodoSnapshot(snapshot){
  whishlist = snapshot.data();
  
  if(whishlist.task == undefined && whishlist.task == null) {
    whishlist.task = [];
    console.log(whishlist);
    $drawTodos(whishlist.task);
  } else
    $drawTodos(whishlist.task);
}

// update task's datas
function create(newTodo){
  whishlist.task.push(newTodo);
   db.collection('family')
  .doc(userUID)
   .collection('whilist')
   .doc(selectedWishID).set({task: whishlist.task}, {merge: true});
};

function update(id, data) {
  whishlist.task.forEach((each,index)=>{
    if(each.id == id){
      whishlist.task[index] = {...whishlist.task[index],...data};
    }
  });
  
  db.collection('family')
  .doc(userUID)
   .collection('whilist')
   .doc(selectedWishID).set({task: whishlist.task}, {merge: true});
  
}

//  checkbox clicked 
function toggleIsDone(id){
    let todo = getTodo(id); 
    todo.isDone = !todo.isDone;
    db.collection('family')
    .doc(userUID)
     .collection('whilist')
     .doc(selectedWishID).set({task: whishlist.task}, {merge: true});  
};
//  find todo in todos
function getTodo(id) {  
  return whishlist.task.find((task) => {
      return task.id == id;
  });
};

function deleteTask(id) {
  var idToRemove = id;
  db.collection('family')
    .doc(userUID)
    .collection('whilist')
    .doc(selectedWishID).get().then((snapshot)=>{
      var tasks = snapshot.data().task;
      var index = tasks.map(x => {
        return x.id;
      }).indexOf(idToRemove); 
      delete tasks.splice(index, 1);
        whishlist.task = tasks;

        db.collection('family')
    .doc(userUID)
    .collection('whilist')
    .doc(selectedWishID).set({task: whishlist.task}, {merge: true}); 
      });
};
   

window.onload = function() {
  db.collection('family').doc(userUID).collection('whilist').doc(selectedWishID).onSnapshot(drawFromTodoSnapshot);
};

// modal hide uildel
var $modulTodo = document.querySelector('.modul-todo');

window.onclick = function(event) {
  if (event.target == $modulTodo) {
    $modulTodo.style.display = 'none';
  }
}

// back button

document.querySelector('#backToWishlist').onclick = () => {
  window.location.href = 'wishlist.html';
}