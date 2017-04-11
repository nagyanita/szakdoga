var config = {
    apiKey: "AIzaSyC_ydXHKwzPnX4e9QXVlXA7ebmoGyHtoUQ",
    authDomain: "teszt-b57ed.firebaseapp.com",
    databaseURL: "https://teszt-b57ed.firebaseio.com",
    storageBucket: "teszt-b57ed.appspot.com",
    messagingSenderId: "821833751798"
};
firebase.initializeApp(config);

var database = firebase.database();

var vm = new Vue({
    el: '#app',
    data: {
        item: {
            name: '',
            quantity: 1,
            barcode: '',
            units: '',
        },
        editItemForm: {
            '.key': '',
            name: '',
            quantity: 1,
            barcode: '',
            units: '',
        },
        itemFilter: '',
        barcodeFilter: '',
        sortFilter: 0,
        options: [
            { text: 'kg', value: 'kg' },
            { text: 'db', value: 'db' },
            { text: 'liter', value: 'liter' },
            { text: 'csomag', value: 'csomag' }
        ]
    },
    firebase: {
        items: database.ref('items'),
        shoppingLists: database.ref('shoppingLists'),
    },
    methods: {
        save: function () {
            this.$firebaseRefs.items.push(this.item);
            this.drop();
        },
        drop: function () {
            this.item.name = '';
            this.item.quantity = 1;
            this.item.barcode = '';
            this.item.units = '';
        },
        editItem: function (item) {
            this.editItemForm['.key'] = item['.key'];
            this.editItemForm.name = item.name;
            this.editItemForm.units = item.units;
            this.editItemForm.quantity = item.quantity;
            this.editItemForm.barcode = item.barcode;
        },
        refreshList: function (item) {
            var freshItem = {};

            freshItem.name = item.name;
            freshItem.quantity = item.quantity;
            freshItem.units = item.units;

            database.ref(`shoppingLists/${item['.key']}`).set(freshItem);
        },
        deleteShoppingItem: function (item) {
            $('#deleteItems').modal('show');
            $('#yesDelete').one('click', function yesDeleteCallBack() {
                database.ref(`shoppingLists/${item['.key']}`).remove().then(function () {
                    console.log('Remove succeeded.');
                    $('#deleteItems').modal('hide');
                }).catch(function (error) {
                    console.log('Remove failed:' + error.message);
                });
            });
        },
        getItem: function (item) {
            var shoppingItem = { name: item.name };

            this.$firebaseRefs.shoppingLists.push(shoppingItem);
        },
        saveEditedItem() {
            var item = {};

            item.name = this.editItemForm.name;
            item.quantity = this.editItemForm.quantity;
            item.barcode = this.editItemForm.barcode;
            item.units = this.editItemForm.units;
            database.ref(`items/${this.editItemForm['.key']}`).set(item);
        },
        deleteItem: function (item) {
            $('#deleteItems').modal('show');
            $('#yesDelete').one('click', function yesDeleteCallBack() {
                database.ref(`items/${item['.key']}`).remove().then(function () {
                    console.log('Remove succeeded.');
                    $('#deleteItems').modal('hide');
                }).catch(function (error) {
                    console.log('Remove failed:' + error.message);
                });
            });
        },
        sortByQuantity: function () {
            this.sortFilter++;
            if (this.sortFilter === 3) {
                this.sortFilter = 0;
            }
        },
    },
    computed: {
        filtereditems: function () {
            var result = _.filter(this.items, (elem) => {
                return elem.name.toLowerCase().includes(this.itemFilter.toLowerCase());
            });

            result = _.filter(result, (elem) => {
                return elem.barcode.includes(this.barcodeFilter);
            });

            if (this.sortFilter === 1) {
                result = _.sortBy(result, 'quantity');
            } else if (this.sortFilter === 2) {
                result = _.sortBy(result, 'quantity').reverse();
            }
            return result;
        },
        filteredShoppingItems: function () {
            var result = _.filter(this.shoppingLists, (elem) => {
                return elem.name;
            });
        }
    },
    components: {
        'input-number': {
            template: '#numberInput',
            props: ['value'],
            methods: {
                updateInput(elem) {
                    if (isNaN(elem.value)) {
                        return;
                    }
                    if (elem.value < 0) {
                        elem.value *= -1;
                    }
                    this.$emit('input', elem.value);
                }
            }
        },
        'input-barcode': {
            template: '#barcodeInput',
            props: ['value'],
            methods: {
                updateBarcode(elem) {
                    if (isNaN(elem.value)) {
                        return;
                    }
                    if (elem.value.length > 13) {
                        elem.value = elem.value.substring(0, 13);
                    }
                    this.$emit('input', elem.value);
                },
                 barcodeScanner(elem) {
                    var that = this;
                    cordova.plugins.barcodeScanner.scan(
                        function (result) {
                                alert("We got a barcode\n" +
                                "Result: " + result.text + "\n" +
                                "Format: " + result.format + "\n" +
                                "Cancelled: " + result.cancelled);
                                that.$emit('input', result.text);
                        
                        },
                        function (error) {
                          alert("Scanning failed: " + error);
                        },
                    {
                      preferFrontCamera : false, // iOS and Android
                      showFlipCameraButton : true, // iOS and Android
                      showTorchButton : true, // iOS and Android
                      torchOn: true, // Android, launch with the torch switched on (if available)
                      prompt : "Place a barcode inside the scan area", // Android
                      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                      formats : "BAR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                      orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                      disableAnimations : true, // iOS
                      disableSuccessBeep: false // iOS
                    }
                    );
                },
            },
        },
    },
});
