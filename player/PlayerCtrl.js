(function() {
	var app = angular.module('PS2Info');

	var PlayerCtrl = function($scope, $routeParams, PlayerSvc, BaseSvc) {

		//Execute when player data received
		var onPlayerComplete = function(data) {
			// Player Data
			$scope.player = data;
			var id = $scope.player.character_id;

			// History
			PlayerSvc.getPlayerStatHistory(id,'kills,deaths,time,score').then(function(data) {
				$scope.history = data;
				$scope.player.spm = ($scope.history.score.all_time / $scope.history.time.all_time * 60).toFixed(1);
				$scope.player.kdr = ($scope.history.kills.all_time / $scope.history.deaths.all_time).toFixed(2);
				$scope.player.created = new Date($scope.player.times.creation_date).toDateString();

				//Generate data for kills/deaths by the day
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

				//Generate data for kills/deaths by the month
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

				//Generate data for kills/deaths by the week
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
};

		//Execute KDR Tab click
		$scope.kdrLoad = function() {

			//Define charts
			var createCharts = function() {
				$scope.kdrDay = BaseSvc.chartBuilder(
					[
					{ id: 'day-id', label: 'Day', type: 'string' },
					{ id: 'kdr-id', label: 'Kills/Death Ratio', type: 'number' }
					],
					BaseSvc.dataBuilder(BaseSvc.range(1,30),[BaseSvc.mergeDataObjects($scope.history.kills.day, $scope.history.deaths.day, 'division')]),
					{
						'title' : 'Kill/Death Ratio Per Day',
						'vAxis' : { 'title' : 'Ratio' },
						'hAxis' : { 'title' : 'Day' }
					});

				$scope.kdrWeek = BaseSvc.chartBuilder(
					[
					{ id: 'week-id', label: 'Week', type: 'string' },
					{ id: 'kdr-id', label: 'Kills/Death Ratio', type: 'number' }
					],
					BaseSvc.dataBuilder(BaseSvc.range(1,13),[BaseSvc.mergeDataObjects($scope.history.kills.week, $scope.history.deaths.week, 'division')]),
					{
						'title' : 'Kill/Death Ratio Per Week',
						'vAxis' : { 'title' : 'Ratio' },
						'hAxis' : { 'title' : 'Week' }
					});

				$scope.kdrMonth = BaseSvc.chartBuilder(
					[
					{ id: 'month-id', label: 'Month', type: 'string' },
					{ id: 'kdr-id', label: 'Kills/Death Ratio', type: 'number' }
					],
					BaseSvc.dataBuilder(BaseSvc.range(1,13),[BaseSvc.mergeDataObjects($scope.history.kills.month, $scope.history.deaths.month, 'division')]),
					{
						'title' : 'Kill/Death Ratio Per Month',
						'vAxis' : { 'title' : 'Ratio' },
						'hAxis' : { 'title' : 'Month' }
					});
			};

			//Check if kills/deaths data has been loaded, if not, then fetch the data
			if (typeof $scope.history.kills === 'undefined' || typeof $scope.history.deaths === 'undefined') {
				PlayerSvc.getPlayerStatHistory($scope.player.character_id,'kills,deaths').then(function(data) {
					$scope.history = data;
					createCharts();
				}, onError);
			}
			else {
				createCharts();
			}
		};

		//Execute on Certs Tab click
		$scope.certsLoad = function() {

		};

		//Execute on Score Per Hour Tab click
		$scope.sphLoad = function() {

		};

		//Execute on Time Played Tab click
		$scope.timeLoad = function() {

		};

		//Execute on error
		var onError = function() {
			$scope.error = 'Could not fetch the data.';
		};

		PlayerSvc.getPlayer($routeParams.playername).then(onPlayerComplete, onError);
	};
	app.controller('PlayerCtrl', PlayerCtrl);
}());