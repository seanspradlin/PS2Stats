(function() {
	var app = angular.module('PS2Info');

	var MainCtrl = function($scope, MainSvc) {
		var onExtensionsComplete = function(data) {
			$scope.extensions = data;
		};
		var onError = function(reason) {
			$scope.error = 'Could not fetch the data.';
		};

		MainSvc.getExtensions().then(onExtensionsComplete, onError);
	};

	app.controller('MainCtrl', MainCtrl);
}());