(function() {
    var app = angular.module('PS2Info');

    var KillboardCtrl = ['$scope', '$log', 'PlayerSvc',
        function($scope, $log, PlayerSvc) {
            //Load killboard
            var loadKillboard = function(id, length) {
                PlayerSvc.getPlayerKillboard(id, length).then(function(data) {
                    $scope.killboard = data;

                    //Set color value
                    $scope.killboard.forEach(function(value) {
                        value.color = value.attacker_character_id === id ? '' : 'danger';
                    });
                }, onError);
            };

            //Execute on error
            var onError = function(reason) {
                $scope.error = true;
                $log.error('KillboardCtrl: ' + reason);
            };

            //Execute when character ID is loaded
            $scope.$watch('player.id', function(id) {
                if (typeof id !== 'undefined') {
                    loadKillboard(id, 20);
                }
            });
        }
    ];
    app.controller('KillboardCtrl', KillboardCtrl);
}());
