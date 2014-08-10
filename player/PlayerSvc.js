(function() {
	var PlayerSvc = function($http, BaseSvc) {
		//Returns basic player profile data
		var getPlayer = function(name) {
			name = typeof name !== 'undefined' ? name : 'higby';
			name = name.replace(/\s+/g, '').toLowerCase();
			return $http.jsonp(BaseSvc.urlBuilder.build('character',[
				'name.first_lower=' + name,
				'c:join=faction^on:faction_id^inject_at:faction',
				'c:lang=en',
				'c:resolve=world&&c:join=world^on:world_id^inject_at:world',
				'c:join=title^on:title_id^inject_at:title',
				'c:resolve=online_status',
				'c:join=outfit_member^on:character_id^inject_at:outfit(outfit^on:outfit_id^inject_at:details)'
				]))
			.then(function(response) {
				return response.data.character_list[0];
			});
		};

		//Get a player's friends, returns object containing online and offline friends
		var getPlayerFriends = function(playerID) {
			return $http.jsonp(BaseSvc.urlBuilder.build('characters_friend', [
				'character_id=' + playerID,
				'c:resolve=character_name',
				'c:tree=start:friend_list^field:online^list:1^prefix:online_'
				]))
			.then(function(response) {
				return response.data.characters_friend_list[0].friend_list;
			});
		};

		//Gets specific player stats, stats separated by comma, ie. 'kills,deaths'
		var getPlayerStat = function(playerID, stat) {
			return $http.jsonp(BaseSvc.urlBuilder.build('characters_stat', [
				'character_id=' + playerID,
				'stat_name=' + stat,
				'c:limit=20',
				'c:tree=stat_name'
				]))
			.then(function(response) {
				return response.data.characters_stat_list[0];
			});	
		};
		//Gets faction-specific player stats, stats separated by comma, ie. 'kills,deaths'
		var getPlayerStatByFaction = function(playerID, stat) {
			return $http.jsonp(BaseSvc.urlBuilder.build('characters_stat_by_faction', [
				'character_id=' + playerID,
				'stat_name=' + stat,
				'c:limit=20',
				'c:tree=stat_name'
				]))
			.then(function(response) {
				return response.data.characters_stat_by_faction_list[0];
			});
		};
		//Gets timeline of specific player stats, stats separated by comma, ie. 'kills,deaths'
		var getPlayerStatHistory = function(playerID, stat) {
			return $http.jsonp(BaseSvc.urlBuilder.build('characters_stat_history', [
				'character_id=' + playerID,
				'stat_name=' + stat,
				'c:limit=20',
				'c:tree=stat_name'
				]))
			.then(function(response) {
				return response.data.characters_stat_history_list[0];
			});
		};

		return {
			'getPlayer' : getPlayer,
			'getPlayerFriends' : getPlayerFriends,
			'getPlayerStat' : getPlayerStat,
			'getPlayerStatByFaction' : getPlayerStatByFaction,
			'getPlayerStatHistory' : getPlayerStatHistory
		};
	};

	var module = angular.module('PS2Info');
	module.factory('PlayerSvc', PlayerSvc);
}());