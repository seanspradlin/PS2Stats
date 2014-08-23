(function() {
    var app = angular.module('PS2Info');

    //Functionality for search box
    var SearchCtrl = ['$scope', '$routeParams', '$log', 'SearchSvc', 'BaseSvc',
        function($scope, $routeParams, $log, SearchSvc, BaseSvc) {

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
                var placeholder = [{
                    'name': '-- All Servers --',
                    'id': 0
                }];
                $scope.servers = placeholder.concat(data);
                $scope.servers.sortOrder = 'name';
            };

            //Execute when faction data received
            var onFactionsComplete = function(data) {
                var placeholder = [{
                    'id': 0,
                    'name': '-- All Factions --'
                }];
                $scope.factions = placeholder.concat(data);
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
            BaseSvc.data.getServers().then(onServersComplete, onError);
            BaseSvc.data.getFactions().then(onFactionsComplete, onError);

            $scope.playerList = {
                'sortOrder': 'name',
                'reverse': false
            };

            $scope.outfitList = {
                'sortOrder': 'name',
                'reverse': false
            };

            $scope.server = 0;
            $scope.faction = 0;
            $scope.minLevel = 1;
            $scope.maxLevel = 100;
        }
    ];
    app.controller('SearchCtrl', SearchCtrl);
}());
