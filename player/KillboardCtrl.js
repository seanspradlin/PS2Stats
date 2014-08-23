(function() {
    var app = angular.module('PS2Info');

    var KillboardCtrl = ['$scope', '$log', 'PlayerSvc',
        function($scope, $log, PlayerSvc) {
            //Load killboard
            var loadKillboard = function(playerId, length) {
                PlayerSvc.getPlayerKillboard(playerId, length).then(function(data) {
                    $scope.killboard = data;

                    //Set color value
                    $scope.killboard.forEach(function(value) {
                        value.color = value.attacker_character_id === playerId ? '' : 'danger';
                    });
                }, onError);
            };

            //Execute on error
            var onError = function(reason) {
                $scope.error = true;
                $log.error('KillboardCtrl: ' + reason);
            };

            //Execute when character ID is loaded
            $scope.$watch('player.character_id', function(playerid) {
                if (typeof playerid !== 'undefined') {
                    loadKillboard(playerid, 20);
                }
            });
        }
    ];
    app.controller('KillboardCtrl', KillboardCtrl);
}());
