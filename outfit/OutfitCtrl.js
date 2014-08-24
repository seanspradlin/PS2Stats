(function() {
    var app = angular.module('PS2Info');

    var OutfitCtrl = ['$scope', '$log', '$routeParams', 'OutfitSvc',
        function($scope, $log, $routeParams, OutfitSvc) {
            //Execute when outfit data received
            var onOutfitComplete = function(data) {
                $scope.outfit = data;
                $log.info(data);
            };

            var onError = function(reason) {
                $log.error('OutfitCtrl: ' + reason);
            };

            OutfitSvc.getOutfit($routeParams.outfitname)
                .then(onOutfitComplete, onError);
        }
    ];
    app.controller('OutfitCtrl', OutfitCtrl);
}());
