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
            quantity: 1
        }
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
        }
    }
});