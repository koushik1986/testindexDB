(function () {
    'use strict';
    angular.module('testidb')
            .controller('helloController', helloController);
    function helloController() {
        var self = this;
        self.handleOnline = handleOnline;
        self.name = "";
        self.city = "";
        function handleOnline() {
            console.log('entered handling method');
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
            var open = indexedDB.open("TestDatabase", 1);
            open.onupgradeneeded = function () {
                var db = open.result;
                var store = db.createObjectStore("TestStore", {keyPath: "id"});
            };
            open.onsuccess = function () {
                var db = open.result;
                var tx = db.transaction("TestStore", "readwrite");
                var store = tx.objectStore("TestStore");
                store.put({id: 12345, name: self.name, city: self.city});
                var getJohn = store.get(12345);
                getJohn.onsuccess = function () {
                    console.log(getJohn.result.name.first);  // => "John"
                };
                tx.oncomplete = function () {
                    alert('inserted successfully in DB');
                    db.close();
                };
            };
        }
    }
})();