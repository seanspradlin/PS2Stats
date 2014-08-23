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
                        var data = response.data.character_list[0];
                        var player = {
                            'name': data.name.first,
                            'id': data.character_id,
                            'battle_rank': parseInt(data.battle_rank.value),
                            'certs': {
                                'available': parseInt(data.certs.available_points),
                                'earned': parseInt(data.certs.earned_points),
                                'spent': parseInt(data.certs.spent_points)
                            },
                            'faction': {
                                'name': data.faction.name.en,
                                'tag': data.faction.code_tag,
                                'id': parseInt(data.faction.faction_id)
                            },
                            'isOnline': parseInt(data.online_status),
                            'outfit': {
                                'name': data.outfit.details.name,
                                'tag': data.outfit.details.alias,
                                'id': parseInt(data.outfit.outfit_id),
                                'joined': data.outfit.member_since_date,
                                'rank': data.outfit.rank
                            },
                            'created': Date.parse(data.times.creation_date),
                            'timePlayed': parseInt(data.times.minutes_played),
                            'title': data.title.name.en,
                            'world': {
                                'name': data.world.name.en,
                                'id': parseInt(data.world.world_id)
                            }
                        };
                        return player;
                    });
            };

            //Get a player's friends, returns object containing online and offline friends
            var getPlayerFriends = function(playerID) {
                return $http.jsonp(BaseSvc.urlBuilder.build('characters_friend', [
                        'c:resolve=character(name,battle_rank,faction_id,title_id,world_id)',
                        'character_id=' + playerID
                    ]))
                    .then(function(response) {
                        var data = response.data.characters_friend_list[0].friend_list;
                        return BaseSvc.data.getFactions().then(function(factionsData) {
                            var factions = [];
                            factions = factionsData;
                            return BaseSvc.data.getTitles().then(function(titlesData) {
                                var titles = [];
                                titles = titlesData;

                                var findFaction = function(i) {
                                    if (typeof data[i].faction_id !== 'undefined') {
                                        for (var x = 0; x < factions.length; x++) {
                                            if (factions[x].id === parseInt(data[i].faction_id)) {
                                                return factions[x].name;
                                            }
                                        }
                                    }
                                };

                                var findTitle = function(i) {
                                    if (typeof data[i].title_id !== 'undefined') {
                                        for (var x = 0; x < titles.length; x++) {
                                            if (titles[x].id === parseInt(data[i].title_id)) {
                                                return titles[x].name;
                                            }
                                        }
                                    }
                                };

                                var friends = [];
                                for (var i = 0; i < data.length; i++) {
                                    var friend = {
                                        'name': data[i].name.first,
                                        'battle_rank': parseInt(data[i].battle_rank.value),
                                        'isOnline': parseInt(data[i].online),
                                        'faction': {
                                            'id': parseInt(data[i].faction_id),
                                            'name': findFaction(i)
                                        },
                                        'title': {
                                            'id': parseInt(data[i].title_id),
                                            'name': findTitle(i)
                                        }
                                    };
                                    friends.push(friend);
                                }
                                return friends;
                            });
                        });

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
                        var data = response.data.characters_event_list;
                        var killboard = [];
                        for (var i = 0; i < data.length; i++) {
                            var kill = {
                                'attacker': {
                                    'name': data[i].name.first,
                                    'faction': {
                                        'name': data[i].attacker_loadout.faction.name.en,
                                        'tag': data[i].attacker_loadout.faction.code_tag,
                                        'id': parseInt(data[i].attacker_loadout.faction_id)
                                    },
                                    'vehicle': data[i].vehicle.name.en,
                                    'weapon': data[i].weapon.name.en
                                },
                                'victim': {
                                    'name': data[i].character.name.first,
                                    'faction': {
                                        'name':data[i].character.faction.name.en,
                                        'tag': data[i].character_loadout.faction.code_tag,
                                        'id': parseInt(data[i].character_loadout.faction_id)
                                    }
                                },
                                'isHeadshot': parseInt(data[i].is_headshot),
                                'isCritical': parseInt(data[i].is_critical)
                            };
                            killboard.push(kill);
                        }
                        return killboard;
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
