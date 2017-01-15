var config = {
    apiKey: "AIzaSyC_ydXHKwzPnX4e9QXVlXA7ebmoGyHtoUQ",
    authDomain: "teszt-b57ed.firebaseapp.com",
    databaseURL: "https://teszt-b57ed.firebaseio.com",
    storageBucket: "teszt-b57ed.appspot.com",
    messagingSenderId: "821833751798"
};
firebase.initializeApp(config);

var database = firebase.database();

/*Cikkek tárolása*/
$('#saveNewItem').on('click', function saveNewItemCallBack() {
    var itemName = $('#itemName').val(),
        itemQuantity = Number($('#itemQuantity').val());

    createElem('items', {
        _id: String(itemAutoIncrement++),
        name: itemName,
        quantity: itemQuantity
    });

    document.getElementById('itemCreateForm').reset();
});

/*Termékek kilistázása */
$('#listItemsToggle').on('show.bs.tab', function listItemsToggleCallBack() {
    var elem = document.createElement('tbody');

    _.each(cols.items, function eachItem(item) {
        $(elem).append(`
                      <tr id="rowId${item._id}">
                          <td>${item._id}</td>
                          <td>${item.name}</td>
                          <td>${item.quantity}</td>
                      </tr>`);

        $('#itemsTable').replaceWith(elem);
        elem.setAttribute('id', 'itemsTable');

        var database = firebase.database();

        var items = database.ref('item');
        items.on('value', function (snapshot) {
            var snap = snapshot.val();
            snap.forEach(function (childSnapshot) {
                $(`#${childSnapshot.id}`).replaceWith(`<tr id="rowId${childSnapshot._id}">
                         <td>${childSnapshot._id}</td>
                         <td>${childSnapshot.name}</td>
                         <td>${childSnapshot.quantity}</td>
                     </tr>`);
            });
        });
    });
});
