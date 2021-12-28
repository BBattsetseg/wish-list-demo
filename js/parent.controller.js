// userUID = localStorage.getItem('userUID'); //user uid local-s awah
// var selectedChildName = localStorage.getItem('selectedChildName'); //huuhdiin neriig awah
// let children = [];
// let wishlist = [];

// //draw children from snapshot
// function drawChildrenListFromSnapshot(snapshot) {
//     children = [];
//     snapshot.forEach((doc) => {
//         console.log(doc.data());
//         children.push({
//             id: doc.id,
//             data: doc.data(),
//         });
//         listWishlist(doc.id,false);
//         console.log(wishlist);
//     });
//     drawList(children,wishlist);
// }


// // // main draw function 

// function drawList(children){
//     var lists = document.querySelector('.content');

//     lists.innerHTML = '';
//     children.forEach((item) => {
//         child = drawChild(item,wishlist);
//         lists.append(child);
//     });
// }


// // List children uildel
// function listChildren(userUID) {
//     db.collection('family')
//       .doc(userUID )
//       .collection('children')
//       .onSnapshot(drawChildrenListFromSnapshot);
//   };

//   window.onload = () => {
//         listChildren(userUID);
//   };
  
//   function drawFromSnapshot(snapshot)
//   {
//         wishes = [];
//         snapshot.forEach((doc) => {
//             wishes.push({
//                 id: doc.id,
//                 data: doc.data(),
//             });
//         });
//         wishlist = wishes;
//   }

var lists = document.querySelector('.content');
// let wishlists = [];
window.onload = () =>
{
    listChildren(userUID);
    lists.innerHTML = "";
}

function listChildren(userUID) {
    db.collection('family')
      .doc(userUID )
      .collection('children')
      .onSnapshot(drawChildrenListFromSnapshot);
  };

  // //draw children from snapshot
function drawChildrenListFromSnapshot(snapshot) {
    children = [];
    lists.innerHTML = "";
    snapshot.forEach((doc) => {
        let child = {id: doc.id, data: doc.data()};
        getWishLists(doc.id, (data)=>{
            var whishlist = [];
            data.docs.forEach((item) => {
                whishlist.push(item.data())
            });;
            drawRow(child, whishlist); 
           
        });
        // console.log(wishlists);
        // drawRow(child,wishlists);
    });
}
// huuhed list

function drawRow(child,childWishes)
{
    let wishes = [];
    wishes = childWishes;
    var profile = document.createElement('div');
    profile.classList.add('childContainer', 'flex');
    var content = `
        <div class="profile">
            <div class="child flex">
                <img class="avatarimg" src="https://api.getepic.com/utils/compose.png?avatar_id=15&amp;frame_id=1&amp;size=2x&amp;style_type=avatar" alt="avatar" width="170px">
                <h3 class="name">${child.data.name}</h3>
            </div>
        </div>
        
    `;
    let wishbox = document.createElement('div');
    wishbox.classList.add('wishbox','flex', 'flex-6');

    var wishlist  = [];
    childWishes.forEach((item) =>{
        var wish = document.createElement('div');
        wish.classList.add('wish','flex');
        var content = `
            <img class="avatarimg" src=${item.image} alt="avatar" width="170px">
            <h3 class="name">${item.title}</h3>
        `;
        wish.innerHTML = content;
        wish.onclick = () => {
            localStorage.setItem('selectedWishID', item.id); //selected wish ID local deer set hiih 
            localStorage.setItem('selectedWishDataTitle', item.title); //selected wish title local deer set hiih 
            localStorage.setItem('selectedWishDataImg', item.image); //selected wish image src local deer set hiih 
            localStorage.setItem('selectedWishDataDesc', item.description); //selected wish desc local deer set hiih 
            window.location.href = 'schedule.html';
        };

        wishbox.append(wish);
    });
    // wishbox.innerHTML = wishlist;

    // content = content + wishbox.innerHTML;
    // profile.innerHTML = content;

    lists.append(profile);
    lists.append(wishbox);
}

function getWishLists(childID, callback)
{
    const wishes = []; 
     db.collection('family')
    .doc(userUID)
    .collection('whilist')
    .where("childrenId" , "==", childID)
    .get()
    .then((snapshot) => {
        callback(snapshot)
    })
}

function arrayFromSnapshot(snapshot)
{
    wishlists = [];
    snapshot.forEach((doc) => {
        wishlists.push({
            id: doc.id,
            data: doc.data(),
        });
    });
    drawWishlist(wishlists);
}


// wishlist list
function drawWishlist(wishlist)
{
    let wishbox = document.createElement('div');
    wishbox.classList.add('wishbox','flex', 'flex-6');
    var wish = '';
    var temp;
    wishlist.forEach((item) =>{
        //  wish += `
        //     <div class="wish flex">
        //         <img class="avatarimg" src=${item.data.image} alt="avatar" width="170px">
        //         <h3 class="name">${item.data.title}</h3>
        //     </div>
        // `;
        
        wishbox.append($list);
    });
    // wishbox.innerHTML = temp;
    lists.append(wishbox);
}