(function() {
    var app = angular.module('PS2Info');

    var FriendsCtrl = ['$scope', '$log', 'PlayerSvc',
        function($scope, $log, PlayerSvc) {
            //Load friends list
            var loadFriends = function(playerId) {
                PlayerSvc.getPlayerFriends(playerId).then(function(data) {
                    $scope.friends = data;
                    $scope.friends.sort = {
                        isOpen: $scope.friends.length < 10,
                        visible: $scope.friends.length > 0,
                        order: 'name',
                        reverse: false
                    };

                    //Pagination logic
                    $scope.currentPage = 1;
                    $scope.pageSize = 20;
                }, onError);
            };

            //Execute on error
            var onError = function(reason) {
                $scope.error = true;
                $log.error('FriendsCtrl: ' + reason);
            };

            //Execute when character ID is loaded
            $scope.$watch('player.id', function(playerid) {
                if (typeof playerid !== 'undefined') {
                    loadFriends(playerid, 20);
                }
            });
        }
    ];
    app.controller('FriendsCtrl', FriendsCtrl);
}());
