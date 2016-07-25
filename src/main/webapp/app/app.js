(function () {
    'use strict';
    angular.module('testidb', ['ngRoute'])
            .config(mainConfig);

    function mainConfig($routeProvider) {
        $routeProvider
                .when('/hello', {
                    templateUrl: 'app/views/home.html',
                    controller: 'helloController',
                    controllerAs: 'helloVm'
                })
                .otherwise({
                    redirectTo: '/hello'
                });

    }
})();