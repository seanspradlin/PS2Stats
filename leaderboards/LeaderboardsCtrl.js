(function() {
	var LeaderboardsCtrl = ['$scope', '$log', 'LeaderboardsSvc', 'BaseSvc',
		function($scope, $log, LeaderboardsSvc, BaseSvc) {
			var onLeaderboardComplete = function(response) {
				$scope.leaderboard = response;
			};

			var onServersComplete = function(response) {
				$scope.servers = [ { 'name': 'All Servers', 'id': 0 } ].concat(response);
			};

			//Execute on error
			var onError = function(reason) {
			    $scope.error = true;
			    $log.error(reason);
			};

			$scope.search = function() {
				LeaderboardsSvc.getLeaderboard($scope.stat, $scope.period, $scope.world, $scope.start, $scope.limit)
							   .then(onLeaderboardComplete, onError);
			};

			$scope.next = function() {
				$scope.start += $scope.limit;
				$scope.search();
			};

			$scope.previous = function() {
				$scope.start -= $scope.limit;
				$scope.search();
			};

			$scope.statValues = [ "Kills", "Deaths", "Score", "Time" ];
			$scope.periodValues = [ "Forever", "Monthly", "Weekly", "Daily" ];
			$scope.limitValues = [ 25, 50, 75, 100 ];
			$scope.stat = 'Kills';
			$scope.period = 'Forever';
			$scope.world = 0;
			$scope.start = 0;
			$scope.limit = 25;

			BaseSvc.data.getServers().then(onServersComplete);
			$scope.search();
		}
	];
	
	var app = angular.module('PS2Info');
	app.controller('LeaderboardsCtrl', LeaderboardsCtrl);
}());