(function() {
    var app = angular.module('PS2Info');

    //Functionality for search box
    var SearchCtrl = function($scope, $routeParams, $log, SearchSvc, BaseSvc) {

        //Execute when player data received
        var onPlayersComplete = function(data) {
            $scope.players = data;
        };

        //Execute when outfit data received
        var onOutfitsComplete = function(data) {
            $scope.outfits = data;
        }

        //Execute on error
        var onError = function(reason) {
            $scope.error = true;
            $log.error(reason);
        };

        SearchSvc.getPlayers($routeParams.searchterm).then(onPlayersComplete, onError);
        SearchSvc.getOutfits($routeParams.searchterm).then(onOutfitsComplete, onError);
    };
    app.controller('SearchCtrl', SearchCtrl);
}());
