(function () {
	var MainSvc = function ($http) {

		var rootUrl = 'http://census.daybreakgames.com/s:responsiveps2/get/ps2:v2?callback=JSON_CALLBACK';

		var getExtensions = function () {
			return $http.jsonp(rootUrl)
				.then(function (response) {
				return response.data.datatype_list;
			});
		};

		return {
			getExtensions: getExtensions,
		};
	};
	
	var app = angular.module('PS2Info');
	app.service('MainSvc', MainSvc);
} ());