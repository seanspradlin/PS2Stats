(function() {
	//Routing
	var app = angular.module('PS2Info', ['ngRoute', 'ui.bootstrap', 'googlechart']);
	app.config(function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'main/Main.html',
			controller: 'MainCtrl'
		})
		.when('/class', {
			templateUrl: 'class/Class.html',
			controller: 'ClassCtrl'
		})
		.when('/weapon', {
			templateUrl: 'weapon/Weapon.html',
			controller: 'WeaponCtrl'
		})
		.when('/implant', {
			templateUrl: 'implant/Implant.html',
			controller: 'ImplantCtrl'
		})
		.when('/vehicle', {
			templateUrl: 'vehicle/Vehicle.html',
			controller: 'VehicleCtrl'
		})
		.when('/player/:playername', {
			templateUrl: 'player/Player.html',
			controller: 'PlayerCtrl'
		})
		.otherwise({redirectTo:'/'});
	});

	//Controller for root
	var BaseCtrl = function($scope) {
		$scope.isCollapsed = false;
	};
	app.controller('BaseCtrl', BaseCtrl);
}());