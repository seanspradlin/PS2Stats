(function() {
	var MainSvc = function($http) {

		var rootUrl = 'http://census.daybreakgames.com/s:responsiveps2/get/ps2:v2?callback=JSON_CALLBACK';

		var getExtensions = function() {
			return $http.jsonp(rootUrl)
			.then(function(response) {
				return response.data.datatype_list;
			});
		};

		return {
			getExtensions: getExtensions,
		};
	};

	var module = angular.module('PS2Info');
	module.factory('MainSvc', MainSvc);
}());