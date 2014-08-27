(function() {
    var app = angular.module('PS2Info');

    var OutfitCtrl = ['$scope', '$log', '$routeParams', 'OutfitSvc', 'BaseSvc',
        function($scope, $log, $routeParams, OutfitSvc, BaseSvc) {
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
        }
    ];
    app.controller('OutfitCtrl', OutfitCtrl);
}());
