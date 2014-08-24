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
                    $scope.numberOfPages = function() {
                        return Math.ceil(($scope.friends.length) / $scope.pageSize);
                    };
                    $scope.currentPage = 0;
                    $scope.pageSize = 25;
                    $scope.numberOfPages();
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
