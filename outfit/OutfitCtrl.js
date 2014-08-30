(function() {
    var app = angular.module('PS2Info');

    var OutfitCtrl = ['$scope', '$log', '$routeParams', 'OutfitSvc',
        function($scope, $log, $routeParams, OutfitSvc) {
            //Execute when outfit data received
            var onOutfitComplete = function(data) {
                $scope.outfit = data;

                //Get average BR
                var sum = 0;
                for (var i = 0; i <= $scope.outfit.members.length; i++) {
                    if (typeof $scope.outfit.members[i] !== 'undefined') {
                        sum += $scope.outfit.members[i].battle_rank;
                    }
                }
                $scope.outfit.averageBR = sum / $scope.outfit.members.length;
                $scope.rankList = [{
                    'name': '--Select Rank--',
                    'id': -1
                }]
                    .concat($scope.outfit.ranks);
            };

            var onError = function(reason) {
                $log.error('OutfitCtrl: ' + reason);
            };

            OutfitSvc.getOutfit($routeParams.outfitname)
                .then(onOutfitComplete, onError);

            $scope.sort = function(table, sortVariable) {
                $scope[table] = typeof $scope[table] !== 'undefined' ? $scope[table] : {};
                $scope[table].sortOrder = sortVariable;
                $scope[table].reverse = typeof $scope[table].reverse !== 'undefined' ? !$scope[table].reverse : true;
            };

            $scope.memberList = {
                'sortOrder': 'name',
                'reverse': false
            };
            $scope.rank = -1;
            $scope.showActive = true;
        }
    ];
    app.controller('OutfitCtrl', OutfitCtrl);
}());
