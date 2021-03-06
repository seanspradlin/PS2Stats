(function() {
    //Routing
    var app = angular.module('PS2Info', ['ngRoute', 'ui.bootstrap', 'googlechart']);
    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    'templateUrl': 'leaderboards/Leaderboards.html',
                    'controller': 'LeaderboardsCtrl'
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
        }
    ]);

    //Controller for root
    var BaseCtrl = ['$scope',
        function($scope) {
            $scope.isCollapsed = false;
        }
    ];

    //Controller for search
    var SearchFormCtrl = ['$scope', '$location',
        function($scope, $location) {
            $scope.pattern = /^\s*\w*\s*$/;
            $scope.validateButtonClass = 'btn-primary';
            $scope.search = function() {
                if ($scope.searchForm.searchField.$valid == true) {
                    $location.path('/search/' + $scope.searchterm);
                    $scope.validateClass = '';
                    $scope.validateButtonClass = 'btn-primary';
                } else {
                    $scope.validateClass = 'has-error';
                    $scope.validateButtonClass = 'btn-danger';
                }
            };
        }
    ];
    
    app.controller('BaseCtrl', BaseCtrl);
    app.controller('SearchFormCtrl', SearchFormCtrl);
}());
