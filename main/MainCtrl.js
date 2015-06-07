(function () {
	var MainCtrl = function ($scope, MainSvc) {
		var onExtensionsComplete = function (data) {
			$scope.extensions = data;
		};
		var onError = function (reason) {
			$scope.error = 'Could not fetch the data.';
		};

		MainSvc.getExtensions().then(onExtensionsComplete, onError);
	};
	
	var app = angular.module('PS2Info');
	app.controller('MainCtrl', MainCtrl);
} ());