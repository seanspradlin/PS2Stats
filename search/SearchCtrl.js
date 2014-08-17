(function() {
    var app = angular.module('PS2Info');

    //Functionality for search box
    var SearchCtrl = ['$scope', '$routeParams', '$log', 'SearchSvc',
        function($scope, $routeParams, $log, SearchSvc) {

            //Execute when player data received
            var onPlayersComplete = function(data) {
                $scope.players = data;
            };

            //Execute when outfit data received
            var onOutfitsComplete = function(data) {
                $scope.outfits = data;
            };

            //Execute on error
            var onError = function(reason) {
                $scope.error = true;
                $log.error(reason);
            };

            SearchSvc.getPlayers($routeParams.searchterm).then(onPlayersComplete, onError);
            SearchSvc.getOutfits($routeParams.searchterm).then(onOutfitsComplete, onError);

            $scope.playerList = {
                'sortOrder': 'name.first',
                'reverse': false
            };
            $scope.outfitList = {
                'sortOrder': 'name',
                'reverse': false
            };

            $scope.sort = function(table, sortVariable) {
                $scope[table] = typeof $scope[table] !== 'undefined' ? $scope[table] : {};
                $scope[table].sortOrder = sortVariable;
                $scope[table].reverse = typeof $scope[table].reverse !== 'undefined' ? !$scope[table].reverse : true;
            };
        }
    ];
    app.controller('SearchCtrl', SearchCtrl);
}());
