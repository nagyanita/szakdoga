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
            barcode: ''
        },
        editItemForm: {
            '.key': '',
            name: '',
            quantity: 1,
            barcode: ''
        },
        itemFilter: '',
        barcodeFilter: '',
        sortFilter: 0
    },
    firebase: {
        items: database.ref('items')
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
        },
        editItem: function (item) {
            this.editItemForm['.key'] = item['.key'];
            this.editItemForm.name = item.name;
            this.editItemForm.quantity = item.quantity;
            this.editItemForm.barcode = item.barcode;
        },
        saveEditedItem() {
            var item = {};

            item.name = this.editItemForm.name;
            item.quantity = this.editItemForm.quantity;
            item.barcode = this.editItemForm.barcode;
            database.ref(`items/${this.editItemForm['.key']}`).set(item);
        },
        deleteItem: function (item) {
            database.ref(`items/${item['.key']}`).remove().then(function () {
                console.log('Remove succeeded.');
            }).catch(function (error) {
                console.log('Remove failed:' + error.message);
            });
        },
        sortByQuantity: function () {
            this.sortFilter++;
            if (this.sortFilter === 3) {
                this.sortFilter = 0;
            }
        }
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
                }
            }
        }
    }
});