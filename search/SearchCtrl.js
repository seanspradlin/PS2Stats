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
                $scope.servers.sortOrder = 'name';
            };

            //Execute when faction data received
            var onFactionsComplete = function(data) {
                $scope.factions = data;
                $scope.factions.sortOrder = 'name';
            };

            //Execute on error
            var onError = function(reason) {
                $scope.error = true;
                $log.error(reason);
            };

            $scope.sort = function(table, sortVariable) {
                $scope[table] = typeof $scope[table] !== 'undefined' ? $scope[table] : {};
                $scope[table].sortOrder = sortVariable;
                $scope[table].reverse = typeof $scope[table].reverse !== 'undefined' ? !$scope[table].reverse : true;
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

                $scope.server = 0,
                $scope.faction = 0,
                $scope.minLevel = 1,
                $scope.maxLevel = 100
        }
    ];
    app.controller('SearchCtrl', SearchCtrl);

    app.filter('PlayerFilter', function() {
        return function(input, server, faction, minLevel, maxLevel) {
            minLevel = typeof minLevel !== 'undefined' ? minLevel : 1;
            minLevel = minLevel > 0 ? minLevel : 1;
            minLevel = minLevel <= 100 ? minLevel : 100;

            maxLevel = typeof maxLevel !== 'undefined' ? maxLevel : 100;
            maxLevel = maxLevel <= 100 ? maxLevel : 100;
            maxLevel = maxLevel >= minLevel ? maxLevel : minLevel;

            var filtered = [];
            input = typeof input !== 'undefined' ? input : [];
            for (var i = 0; i < input.length; i++) {
                var isCorrectServer = input[i].world_id === server || server === 0;
                var isCorrectFaction = input[i].faction_id === faction || faction === 0;
                var isAboveMin = input[i].battle_rank >= minLevel;
                var isBelowMax = input[i].battle_rank <= maxLevel;
                if (isCorrectFaction && isCorrectServer && isAboveMin && isBelowMax) {
                    filtered.push(input[i]);
                }
            }
            return filtered;
        };
    });
}());
