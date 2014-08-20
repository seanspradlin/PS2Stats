(function() {
    var app = angular.module('PS2Info');

    //Functionality for search box
    var SearchCtrl = ['$scope', '$routeParams', '$log', '$filter', 'SearchSvc',
        function($scope, $routeParams, $log, $filter, SearchSvc) {

            //Execute when player data received
            var onPlayersComplete = function(data) {
                $scope.players = data;
            };

            //Execute when outfit data received
            var onOutfitsComplete = function(data) {
                $scope.outfits = data;
            };

            //Execute when server data received
            var onServersComplete = function(data) {
                $scope.servers = data;
                $scope.servers.sortOrder = 'name.en';
            };

            //Execute when faction data received
            var onFactionsComplete = function(data) {
                $scope.factions = data;
                $scope.factions.sortOrder = 'name.en';
            };

            //Execute on error
            var onError = function(reason) {
                $scope.error = true;
                $log.error(reason);
            };

            SearchSvc.getPlayers($routeParams.searchterm).then(onPlayersComplete, onError);
            SearchSvc.getOutfits($routeParams.searchterm).then(onOutfitsComplete, onError);
            SearchSvc.getServers().then(onServersComplete, onError);
            SearchSvc.getFactions().then(onFactionsComplete, onError);

            $scope.playerList = {
                'sortOrder': 'name.first',
                'reverse': false
            };
            $scope.outfitList = {
                'sortOrder': 'name',
                'reverse': false
            };
            $scope.parameters = {
                numbersFilter: /[\u0030-\u0039]+/g
            };

            $scope.sort = function(table, sortVariable) {
                $scope[table] = typeof $scope[table] !== 'undefined' ? $scope[table] : {};
                $scope[table].sortOrder = sortVariable;
                $scope[table].reverse = typeof $scope[table].reverse !== 'undefined' ? !$scope[table].reverse : true;
            };

            $scope.filterData = function() {
                $scope.filteredPlayers = $scope.players;
                if ($scope.filterParams.world.world_id > 0) {
                    $scope.filteredPlayers = $filter('filter')($scope.filteredPlayers, $scope.filterParams.world, true);
                }
                if ($scope.filterParams.faction.faction_id > 0) {
                    $scope.filteredPlayers = $filter('filter')($scope.filteredPlayers, $scope.filterParams.faction, true);
                }
            };
        }
    ];
    app.controller('SearchCtrl', SearchCtrl);
}());
