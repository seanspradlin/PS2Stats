(function() {
	var app = angular.module('PS2Info');

	var PlayerCtrl = function($scope, $routeParams, PlayerSvc, BaseSvc) {

		//Execute when player data received
		var onPlayerComplete = function(data) {
			// Player Data
			$scope.player = data;

			// History
			PlayerSvc.getPlayerStatHistory($scope.player.character_id,'kills,deaths,time,score').then(function(data) {
				$scope.history = data;
				$scope.player.sph = BaseSvc.utility.addCommas(($scope.history.score.all_time / $scope.history.time.all_time * 3600).toFixed(0));
				$scope.player.kdr = ($scope.history.kills.all_time / $scope.history.deaths.all_time).toFixed(2);
				$scope.player.created = new Date($scope.player.times.creation_date).toDateString();

				//Execute on KD Tab Click
				$scope.kdLoad = function() {

					//Define charts
					var createCharts = function() {
						//Generate data for kills/deaths by the day
						$scope.kdDay = BaseSvc.chartBuilder.build(
							[
							{id: "day-id", label: "Day", type: "string" },
							{id: "kills-id", label: "Kills", type: "number"},
							{id: "deaths-id", label: "Deaths", type: "number"}
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,30),[$scope.history.kills.day, $scope.history.deaths.day]),
							{
								"title": "Kills/Deaths Per Day",
								"vAxis": { "title": "Score" },
								"hAxis": { "title": "Day" }
							});

						//Generate data for kills/deaths by the week
						$scope.kdWeek = BaseSvc.chartBuilder.build(
							[
							{id: "day-id", label: "Week", type: "string" },
							{id: "kills-id", label: "Kills", type: "number"},
							{id: "deaths-id", label: "Deaths", type: "number"}
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,13),[$scope.history.kills.week, $scope.history.deaths.week]),
							{
								"title": "Kills/Deaths Per Week",
								"vAxis": { "title": "Score" },
								"hAxis": { "title": "Week" }
							});

						//Generate data for kills/deaths by the month
						$scope.kdMonth = BaseSvc.chartBuilder.build(
							[
							{id: "day-id", label: "Day", type: "string" },
							{id: "kills-id", label: "Kills", type: "number"},
							{id: "deaths-id", label: "Deaths", type: "number"}
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,12),[$scope.history.kills.month, $scope.history.deaths.month]),
							{
								"title": "Kills/Deaths Per Month",
								"vAxis": { "title": "Score" },
								"hAxis": { "title": "Month" }
							});
					};

					//Check if kills/deaths data has been loaded, if not, then fetch the data
					if (typeof $scope.history.kills === 'undefined' || typeof $scope.history.deaths === 'undefined') {
						PlayerSvc.getPlayerStatHistory($scope.player.character_id,'kills,deaths').then(function(data) {
							$scope.history.kills = data.kills;
							$scope.history.deaths = data.deaths;
							createCharts();
						}, onError);
					}
					else {
						createCharts();
					}
				};

				//Execute KDR Tab click
				$scope.kdrLoad = function() {

					//Define charts
					var createCharts = function() {

						//Generate data for k/d ratio by the day
						$scope.kdrDay = BaseSvc.chartBuilder.build(
							[
							{ id: 'day-id', label: 'Day', type: 'string' },
							{ id: 'kdr-id', label: 'Kills/Death Ratio', type: 'number' }
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,30),[BaseSvc.chartBuilder.mergeDataObjects($scope.history.kills.day, $scope.history.deaths.day, 'division')]),
							{
								'title' : 'Kill/Death Ratio Per Day',
								'vAxis' : { 'title' : 'Ratio' },
								'hAxis' : { 'title' : 'Day' }
							});

						//Generate data for k/d ratio by the week
						$scope.kdrWeek = BaseSvc.chartBuilder.build(
							[
							{ id: 'week-id', label: 'Week', type: 'string' },
							{ id: 'kdr-id', label: 'Kills/Death Ratio', type: 'number' }
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,13),[BaseSvc.chartBuilder.mergeDataObjects($scope.history.kills.week, $scope.history.deaths.week, 'division')]),
							{
								'title' : 'Kill/Death Ratio Per Week',
								'vAxis' : { 'title' : 'Ratio' },
								'hAxis' : { 'title' : 'Week' }
							});

						//Generate data for k/d ratio by the month
						$scope.kdrMonth = BaseSvc.chartBuilder.build(
							[
							{ id: 'month-id', label: 'Month', type: 'string' },
							{ id: 'kdr-id', label: 'Kills/Death Ratio', type: 'number' }
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,12),[BaseSvc.chartBuilder.mergeDataObjects($scope.history.kills.month, $scope.history.deaths.month, 'division')]),
							{
								'title' : 'Kill/Death Ratio Per Month',
								'vAxis' : { 'title' : 'Ratio' },
								'hAxis' : { 'title' : 'Month' }
							});
					};

					//Check if kills/deaths data has been loaded, if not, then fetch the data
					if (typeof $scope.history.kills === 'undefined' || typeof $scope.history.deaths === 'undefined') {
						PlayerSvc.getPlayerStatHistory($scope.player.character_id,'kills,deaths').then(function(data) {
							$scope.history.kills = data.kills;
							$scope.history.deaths = data.deaths;
							createCharts();
						}, onError);
					}
					else {
						createCharts();
					}
				};

				//Execute on Certs Tab click
				$scope.certsLoad = function() {
					//Define charts
					var createCharts = function() {

						//Generate data for k/d ratio by the day
						$scope.certsDay = BaseSvc.chartBuilder.build(
							[
							{ id: 'day-id', label: 'Day', type: 'string' },
							{ id: 'certs-id', label: 'Certs', type: 'number' }
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,30),[$scope.history.certs.day]),
							{
								'title' : 'Certs Per Day',
								'vAxis' : { 'title' : 'Points' },
								'hAxis' : { 'title' : 'Day' }
							});

						//Generate data for k/d ratio by the week
						$scope.certsWeek = BaseSvc.chartBuilder.build(
							[
							{ id: 'week-id', label: 'Week', type: 'string' },
							{ id: 'certs-id', label: 'Certs', type: 'number' }
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,13),[$scope.history.certs.week]),
							{
								'title' : 'Certs Per Week',
								'vAxis' : { 'title' : 'Points' },
								'hAxis' : { 'title' : 'Week' }
							});

						//Generate data for k/d ratio by the month
						$scope.certsMonth = BaseSvc.chartBuilder.build(
							[
							{ id: 'month-id', label: 'Month', type: 'string' },
							{ id: 'certs-id', label: 'Certs', type: 'number' }
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,12),[$scope.history.certs.month]),
							{
								'title' : 'Certs Per Month',
								'vAxis' : { 'title' : 'Points' },
								'hAxis' : { 'title' : 'Month' }
							});
					};

					//Check if kills/deaths data has been loaded, if not, then fetch the data
					if (typeof $scope.history.certs === 'undefined') {
						PlayerSvc.getPlayerStatHistory($scope.player.character_id,'certs').then(function(data) {
							$scope.history.certs = data.certs;
							createCharts();
						}, onError);
					}
					else {
						createCharts();
					}
				};

				//Execute on Score Per Hour Tab click
				$scope.sphLoad = function() {
					var createCharts = function() {

						//Generate data for k/d ratio by the day
						$scope.sphDay = BaseSvc.chartBuilder.build(
							[
							{ id: 'day-id', label: 'Day', type: 'string' },
							{ id: 'sph-id', label: 'Score Per Hour', type: 'number' }
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,30),[BaseSvc.chartBuilder.mergeDataObjects($scope.history.score.day, $scope.history.time.day, 'division')]),
							{
								'title' : 'Score/Hour Per Day',
								'vAxis' : { 'title' : 'Rate' },
								'hAxis' : { 'title' : 'Day' }
							});

						//Generate data for k/d ratio by the week
						$scope.sphWeek = BaseSvc.chartBuilder.build(
							[
							{ id: 'week-id', label: 'Week', type: 'string' },
							{ id: 'sph-id', label: 'Score Per Hour', type: 'number' }
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,13),[BaseSvc.chartBuilder.mergeDataObjects($scope.history.score.week, $scope.history.time.week, 'division')]),
							{
								'title' : 'Score/Hour Per Week',
								'vAxis' : { 'title' : 'Rate' },
								'hAxis' : { 'title' : 'Week' }
							});

						//Generate data for k/d ratio by the month
						$scope.sphMonth = BaseSvc.chartBuilder.build(
							[
							{ id: 'month-id', label: 'Month', type: 'string' },
							{ id: 'sph-id', label: 'Score Per Hour', type: 'number' }
							],
							BaseSvc.chartBuilder.buildData(BaseSvc.utility.range(1,12),[BaseSvc.chartBuilder.mergeDataObjects($scope.history.score.month, $scope.history.time.month, 'division')]),
							{
								'title' : 'Score/Hour Per Month',
								'vAxis' : { 'title' : 'Points' },
								'hAxis' : { 'title' : 'Month' }
							});
					};

					//Check if score/time data has been loaded, if not, then fetch the data
					if (typeof $scope.history.score === 'undefined' || typeof $scope.history.time === 'undefined') {
						PlayerSvc.getPlayerStatHistory($scope.player.character_id,'score,time').then(function(data) {
							$scope.history.score = data.score;
							$scope.history.time = data.time;
							createCharts();
						}, onError);
					}
					else {
						createCharts();
					}
				};

				//Run kdLoad since it is the active tab on page load
				$scope.kdLoad();
			}, onError);
			

			//Execute on Time Played Tab click
			$scope.timeLoad = function() {

			};
	};


		//Execute on error
		var onError = function() {
			$scope.error = 'Could not fetch the data.';
		};

		PlayerSvc.getPlayer($routeParams.playername).then(onPlayerComplete, onError);
	};
	app.controller('PlayerCtrl', PlayerCtrl);
}());