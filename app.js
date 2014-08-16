(function() {
    //Routing
    var app = angular.module('PS2Info', ['ngRoute', 'ui.bootstrap', 'googlechart']);
    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                'templateUrl': 'main/Main.html',
                'controller': 'MainCtrl'
            })
            .when('/search/:searchterm', {
                'templateUrl': 'search/Search.html',
                'controller': 'SearchCtrl'
            })
            .when('/outfit/:outfitname', {
                'templateUrl': 'outfit/Outfit.html',
                'controller': 'OutfitCtrl'
            })
            .when('/player/:playername', {
                'templateUrl': 'player/Player.html',
                'controller': 'PlayerCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

    //Controller for root
    var BaseCtrl = function($scope, $location) {
        $scope.isCollapsed = false;
        $scope.search = function() {
            $location.path(('/search/' + $scope.searchterm));
        };
    };
    app.controller('BaseCtrl', BaseCtrl);
}());
