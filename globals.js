
var cols = {
    items: {}
},
    itemAutoIncrement = 1;


/*Elemek, cikkek, partnerek létrehozásához szükséges függvény*/
function createElem(col, newElemObj) {
    cols[col][newElemObj._id] = newElemObj;
}

/*Fejléc menüpontok beragadó active class fix.*/
$('.dropdown-menu li').on('click', function menuClickCallBack(e) {
    $('li').removeClass('active');
});
