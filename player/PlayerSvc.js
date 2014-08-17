(function() {
    var PlayerSvc = ['$http', 'BaseSvc',
        function($http, BaseSvc) {
            //Returns basic player profile data
            var getPlayer = function(name) {
                name = typeof name !== 'undefined' ? name : 'higby';
                name = angular.lowercase(name.replace(/\s+/g, ''));
                return $http.jsonp(BaseSvc.urlBuilder.build('character', [
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

            //Get array of kill/death history
            var getPlayerKillboard = function(playerID, length) {
                length = typeof length !== 'undefined' ? length : 20;
                return $http.jsonp(BaseSvc.urlBuilder.build('characters_event', [
                        'character_id=' + playerID,
                        'c:limit=' + length,
                        'type=KILL,DEATH',
                        'c:resolve=character_name,attacker_name',
                        'c:join=type:loadout^on:attacker_loadout_id^to:loadout_id^inject_at:attacker_loadout(faction^on:faction_id^show:name.en%27code_tag%27image_path^inject_at:faction)',
                        'c:join=type:loadout^on:character_loadout_id^to:loadout_id^inject_at:character_loadout(faction^on:faction_id^show:name.en%27code_tag%27image_path^inject_at:faction)',
                        'c:join=type:item^on:attacker_weapon_id^to:item_id^inject_at:weapon^show:name.en',
                        'c:join=type:vehicle^on:attacker_vehicle_id^to:vehicle_id^inject_at:vehicle^show:name.en'
                    ]))
                    .then(function(response) {
                        return response.data.characters_event_list;
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
                'getPlayer': getPlayer,
                'getPlayerFriends': getPlayerFriends,
                'getPlayerKillboard': getPlayerKillboard,
                'getPlayerStat': getPlayerStat,
                'getPlayerStatByFaction': getPlayerStatByFaction,
                'getPlayerStatHistory': getPlayerStatHistory
            };
        }
    ];

    var module = angular.module('PS2Info');
    module.factory('PlayerSvc', PlayerSvc);
}());
