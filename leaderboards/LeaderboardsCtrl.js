(function() {
	var app = angular.module('PS2Info');

	var LeaderboardsCtrl = ['$scope', '$log', 'LeaderboardsSvc',
		function($scope, $log, LeaderboardsSvc) {

		}
	];
	app.controller('LeaderboardsCtrl', LeaderboardsCtrl);
}());