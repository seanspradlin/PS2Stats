(function() {
    var KillboardCtrl = ['$scope', '$log', 'PlayerSvc',
        function($scope, $log, PlayerSvc) {
            //Load killboard
            var loadKillboard = function(id, length) {
                PlayerSvc.getPlayerKillboard(id, length).then(function(data) {
                    $scope.killboard = data;

                    //Set color value
                    $scope.killboard.forEach(function(value) {
                        value.color = value.isDeath ? 'danger' : '';
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
                    loadKillboard(id, $scope.killboardLength);
                }
            });

            $scope.killboardLength = 25;
        }
    ];
    
    var app = angular.module('PS2Info');
    app.controller('KillboardCtrl', KillboardCtrl);
}());
