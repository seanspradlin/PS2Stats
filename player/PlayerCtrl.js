(function() {
	var app = angular.module('PS2Info');

	var PlayerCtrl = function($scope, $routeParams, PlayerSvc, BaseSvc) {
		var onPlayerComplete = function(data) {
			// Player Data
			$scope.player = data;
			var id = $scope.player.character_id;

			// History
			PlayerSvc.getPlayerStatHistory(id,'kills,deaths,time,score').then(function(data) {
				$scope.history = data;
				$scope.player.spm = ($scope.history.score.all_time / $scope.history.time.all_time * 60).toFixed(1);
				$scope.player.kdr = ($scope.history.kills.all_time / $scope.history.deaths.all_time).toFixed(2);
				$scope.kdDay = BaseSvc.chartBuilder(
					[
					{id: "day-id", label: "Day", type: "string" },
					{id: "kills-id", label: "Kills", type: "number"},
					{id: "deaths-id", label: "Deaths", type: "number"}
					],
					BaseSvc.dataBuilder(BaseSvc.range(1,30),[$scope.history.kills.day, $scope.history.deaths.day]),
					{
						"title": "Kills/Deaths Per Day",
						"vAxis": { "title": "Score" },
						"hAxis": { "title": "Day" }
					});
				$scope.kdMonth = BaseSvc.chartBuilder(
					[
					{id: "day-id", label: "Day", type: "string" },
					{id: "kills-id", label: "Kills", type: "number"},
					{id: "deaths-id", label: "Deaths", type: "number"}
					],
					BaseSvc.dataBuilder(BaseSvc.range(1,12),[$scope.history.kills.month, $scope.history.deaths.month]),
					{
						"title": "Kills/Deaths Per Month",
						"vAxis": { "title": "Score" },
						"hAxis": { "title": "Month" }
					});
				$scope.kdWeek = BaseSvc.chartBuilder(
					[
					{id: "day-id", label: "Week", type: "string" },
					{id: "kills-id", label: "Kills", type: "number"},
					{id: "deaths-id", label: "Deaths", type: "number"}
					],
					BaseSvc.dataBuilder(BaseSvc.range(1,13),[$scope.history.kills.week, $scope.history.deaths.week]),
					{
						"title": "Kills/Deaths Per Week",
						"vAxis": { "title": "Score" },
						"hAxis": { "title": "Week" }
					});
			}, onError);


			$scope.player.created = new Date($scope.player.times.creation_date).toDateString();
		};
		var onError = function() {
			$scope.error = 'Could not fetch the data.';
		};

		PlayerSvc.getPlayer($routeParams.playername).then(onPlayerComplete, onError);
	};
	app.controller('PlayerCtrl', PlayerCtrl);
}());