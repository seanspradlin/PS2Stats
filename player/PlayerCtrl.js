(function() {
    var app = angular.module('PS2Info');

    var PlayerCtrl = ['$scope', '$routeParams', '$log', 'PlayerSvc',
        function($scope, $routeParams, $log, PlayerSvc) {
            //Execute when player data received
            var onPlayerComplete = function(data) {
                //Player Data
                $scope.player = data;
            };

            //Execute on error
            var onError = function(reason) {
                $scope.error = true;
                $log.error('PlayerCtrl: ' + reason);
            };

            PlayerSvc.getPlayer($routeParams.playername).then(onPlayerComplete, onError);
        }
    ];
    app.controller('PlayerCtrl', PlayerCtrl);
}());
