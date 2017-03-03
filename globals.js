
var cols = {
    items: {}
},
    itemAutoIncrement = 1,
    provider = new firebase.auth.GoogleAuthProvider();


/*Elemek, cikkek, partnerek létrehozásához szükséges függvény*/
function createElem(col, newElemObj) {
    cols[col][newElemObj._id] = newElemObj;
}

/*Fejléc menüpontok beragadó active class fix.*/
$('.dropdown-menu li').on('click', function menuClickCallBack(e) {
    $('li').removeClass('active');
});

$(document).ready(function () {
    $('#myModal').modal('show');
});

//provider.addScope('https://www.googleapis.com/auth/plus.login');

$('#signIn').on('click', function (userName, password) {
    var userName = $('#userName').val(),
        password = $('#password').val();
    console.log(userName);
    console.log(password);
});

$('#quit').on('click', function () {
    window.close();
});


//Animáció a legördülő menühöz
$('.dropdown').on('show.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

//Animáció a legördülő menühöz
$('.dropdown').on('hide.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});