let children = [];
userUID = localStorage.getItem('userUID'); //selected family ID
let $button = document.querySelector('#modalshowme');


// draw children

function drawChildrenFromSnapshot(snapshot) {
  children = [];
  snapshot.forEach((doc) => {
    children.push({
      id: doc.id,
      data: doc.data()
    });
  });
  drawChildren(children);
}

if(document.querySelector('.addChildbtn') != null) {

  // Add child  html-ruu usreh uildel

  document.querySelector('.addChildbtn').addEventListener('click', () => {
    if(children.length < 5 ) {
      window.location.href="addChild.html";
    }
    else {
      alert('Хүүхдйин тоо дүүрсэн байна.');
    }
  })
}

// add child crud // 

let $addChild = document.querySelector('.finishButton');
let $name = document.querySelector('#childName');
let $pin = document.querySelector('#childPin');
let cancelButton = document.querySelector('.cancelButton');

//create children

if (window.location.href.endsWith('addChild.html')) {
  $addChild.onclick = () => {
    if ($name.value && $pin.value) {
      const userUID = localStorage.getItem('userUID'); //selected family ID
      db.collection("family").doc(userUID)
        .collection('children').add({
          name: $name.value,
          pin: $pin.value,
        })
        .then(() => {
          window.location.href="profile-select.html";
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      alert('please fill in the form');
    }
  }

  document.querySelector('#navbarProfileBtn2').onclick = () => {
    window.location.href="profile-select.html";
  }
  cancelButton.onclick = () => {
    window.location.href="profile-select.html";
  }

}

if(window.location.href.endsWith('profile-select.html')){
  
  // modal show uildel// main
  let $parentPinModal = document.querySelector('.modal');
  let $button = document.querySelector('#modalshowme');

  $button.onclick = () => {
    $parentPinModal.classList.add('showme');
  };

  // logout //
  let $logout = document.querySelector('.logOut');
  $logout.addEventListener('click', () => {
    firebase.auth().signOut();
    window.location.href="login.html";
  });

  // Parent pin modal 
  window.onclick = function(event) {
    if (event.target == $parentPinModal) {
      $parentPinModal.classList.remove('showme');
      $parentPinModal.querySelector('input').value = "";
    }
  }
  let $parentPintInput = document.querySelector('.modal .modalbox input');
  let $parentPinBtn = document.querySelector('.modal .modalbox button');

  $parentPinBtn.onclick = () => {
    const userUID = localStorage.getItem('userUID'); //selected family ID
    db.doc(`family/${userUID}`).get()
      .then((doc) => {
        console.log(doc.data().parintPin);
        if(doc.data().parintPin === $parentPintInput.value) {
          window.location.href="parent.html";
        }
        else {
          alert('Wrong Pin');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  $parentPintInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $parentPinBtn.click();
    }
  })
};

// List children uildels

window.onload = () => {
  const userUID = localStorage.getItem('userUID'); //selected family ID

  db.collection('family')
    .doc(userUID)
    .collection('children')
    .onSnapshot(drawChildrenFromSnapshot);
  }
;

//