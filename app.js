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
    var BaseCtrl = function($scope) {
        $scope.isCollapsed = false;
    };

    //Controller for search
    var SearchFormCtrl = function($scope, $location) {
        $scope.pattern = /^\s*\w*\s*$/;
        $scope.search = function() {
            if ($scope.searchForm.searchField.$valid == true) {
                $location.path('/search/' + $scope.searchterm);
                $scope.validateClass = '';
            }
            else {
                $scope.validateClass = 'has-error';
            }
        };
    };
    app.controller('BaseCtrl', BaseCtrl);
    app.controller('SearchFormCtrl', SearchFormCtrl);
}());
