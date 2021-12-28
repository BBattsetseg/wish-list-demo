let selectedChild;
let selectedChildPin;
let selectedChildID;
userUID = localStorage.getItem('userUID');
userType = localStorage.getItem('userType');

let childImgArray = [
    'https://firebasestorage.googleapis.com/v0/b/tema2-74912.appspot.com/o/compose.png?alt=media',
    'https://firebasestorage.googleapis.com/v0/b/tema2-74912.appspot.com/o/compose%20(3).png?alt=media',
    'https://firebasestorage.googleapis.com/v0/b/tema2-74912.appspot.com/o/compose%20(2).png?alt=media',
    'https://firebasestorage.googleapis.com/v0/b/tema2-74912.appspot.com/o/compose%20(1).png?alt=media&token',
    'https://firebasestorage.googleapis.com/v0/b/tema2-74912.appspot.com/o/compose%20(5).png?alt=media',
]

// create elementx

function $createChild(item, index) {
    var $child = document.createElement('div');
    $child.classList.add('child', 'flex');
    var content = `
        <img class="avatarimg" src="${childImgArray[index % 5] }" alt="avatar" width="170px">
        <h3 class="name">${item.data.name}</h3>
    `;
    $child.innerHTML = content;
    $child.onclick = () => {
        selectedChild = item.id;
        let img = $child.querySelector('img');
        let imageSource = img.getAttribute('src');
        console.log(imageSource);

        let modalImg = document.querySelector('#childrenImage');
        modalImg.setAttribute('src', imageSource);
        document.querySelector('.childPinModal .modalbox h3').innerHTML = $child.querySelector('.child, .name').innerHTML;

        showChildPinModal();

        let $inputPin = document.querySelector('.childPinModal .modalbox input');
        let $goBtn = document.querySelector('.childPinModal .modalbox button');
        
        $goBtn.onclick = () => {
            const userUID = localStorage.getItem('userUID'); //selected family ID
            db.doc(`family/${userUID}/children/${selectedChild}`).get()
            .then((doc) => {
                selectedChildPin = doc.data().pin;
                if ($inputPin.value === selectedChildPin) {
                    selectedChildID = item.id;
                    localStorage.setItem('selectedChildID',selectedChildID);
                    window.location.href="wishlist.html";
                } else {
                    alert('Wrong Pin');
                } 
            });
        }

        $inputPin.addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                $goBtn.click();
            }
        })
    };
    return $child;
}

// child Pin modal

let $ChildPinmodal = document.querySelector('.childPinModal');

if ($ChildPinmodal != null) {
    $ChildPinmodal.onclick = function (event) {
        if (event.target == $ChildPinmodal) {
            $ChildPinmodal.classList.remove('showme')
            $ChildPinmodal.querySelector('input').value = "";
        }
    }

    // Main draw function
    function drawChildren(children) {
        var $childrenList = document.querySelector('.avatar');

        $childrenList.innerHTML = '';
        children.forEach((item, index) => {
            $child = $createChild(item, index);
            $childrenList.append($child);
        });
    }

    function showChildPinModal() {
        document.querySelector('.childPinModal').classList.add('showme');
    }
}