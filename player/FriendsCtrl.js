(function() {
    var app = angular.module('PS2Info');

    var FriendsCtrl = ['$scope', '$log', 'PlayerSvc',
        function($scope, $log, PlayerSvc) {
            //Load friends list
            var loadFriends = function(playerId) {
                PlayerSvc.getPlayerFriends(playerId).then(function(data) {
                    $scope.friends = {};
                    $scope.friends.offline = typeof data.online_0 !== 'undefined' ? data.online_0 : {};
                    $scope.friends.online = typeof data.online_1 !== 'undefined' ? data.online_1 : {};

                    $scope.friends.online.status = {
                        isOpen: $scope.friends.online.length < 10,
                        visible: $scope.friends.online.length > 0,
                        order: 'name.first'
                    };
                    $scope.friends.offline.status = {
                        isOpen: $scope.friends.offline.length < 10,
                        visible: $scope.friends.offline.length > 0,
                        order: 'name.first'
                    };
                }, onError);
            };

            //Execute on error
            var onError = function(reason) {
                $scope.error = true;
                $log.error('FriendsCtrl: ' + reason);
            };

            //Execute when character ID is loaded
            $scope.$watch('player.character_id', function(playerid) {
                if (typeof playerid !== 'undefined') {
                    loadFriends(playerid, 20);
                }
            });
        }
    ];
    app.controller('FriendsCtrl', FriendsCtrl);
}());
