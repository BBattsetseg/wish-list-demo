
 userUID = localStorage.getItem('userUID'); //user uid local-s awah
 let wishes = [];

// wishlist crud

//wishlist uusgeh

function createWishlist(list){
    db.collection('family').doc(userUID)
    .collection('whilist').add({
        childrenId: list.childrenId,
        title: list.title ,
        description: list.description,
        createAt: new Date(Date.now()),
        isApproved: false,
        image: list.image,
        task: null, 
    })
}

//wishlist jagsaaj haruulah

function listWishlist(childID){
    db.collection('family')
    .doc(userUID)
    .collection('whilist')
    .where("childrenId" , "==", childID)
    .onSnapshot(drawWishlistFromSnapshot);
}



//wishlist ustgah

function deleteWishlist(id){
    db.collection('family').doc(userUID)
    .collection('whilist').doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}
