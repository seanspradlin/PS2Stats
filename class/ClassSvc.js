(function() {
	var ClassSvc = function($http, BaseSvc) {
		var getSkillsetList = function(skillID) {
			return $http.jsonp(BaseSvc.urlBuilder.build('skill_set', [
				'skill_set_id=' + skillID,
				'c:lang=en',
				'c:join=skill_category^on:skill_set_id^inject_at:skill_set^list:1' + 
				'(skill_line^on:skill_category_id^inject_at:skill_line^list:1' + 
				'(skill^on:skill_line_id^inject_at:skill^list:1))'
				]))
			.then(function(response) {
				return response.data.skill_set_list;
			});
		};

		return {
			getSkillsetList: getSkillsetList
		};
	};

	var module = angular.module('PS2Info');
	module.factory('ClassSvc', ClassSvc);
}());