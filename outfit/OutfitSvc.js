(function() {
    var OutfitSvc = ['$http', 'BaseSvc',
        function($http, BaseSvc) {
            var getWorld = function(playerID) {
                return $http.jsonp(BaseSvc.urlBuilder.build('character', [
                        'character_id=' + playerID,
                        'c:resolve=world',
                        'c:join=world^on:world_id^inject_at:world',
                        'c:show=character_id,world',
                        'c:lang=en'
                    ]))
                    .then(function(response) {
                        var data = response.data.character_list[0].world;
                        var world = {
                            'name': data.name.en,
                            'id': parseInt(data.world_id)
                        };
                        return world;
                    });
            };

            var getOutfit = function(alias) {
                alias = typeof alias !== 'undefined' ? alias : 'nuc';
                alias = angular.lowercase(alias.replace(/\s+/g, ''));
                return $http.jsonp(BaseSvc.urlBuilder.build('outfit', [
                        'c:resolve=leader(name,battle_rank,faction_id),member_character(name,battle_rank,member_since_date,rank,title_id,times)',
                        'alias_lower=' + alias
                    ]))
                    .then(function(response) {
                        var data = response.data.outfit_list[0];
                        //TODO Refactor promise tree
                        return BaseSvc.data.getFactions().then(function(factions) {
                            return BaseSvc.data.getTitles().then(function(titles) {
                                return getWorld(data.leader_character_id).then(function(world) {
                                    //TODO Refactor this with PlayerSvc.getPlayerFriends
                                    var findFaction = function() {
                                        if (typeof data.leader.faction_id !== 'undefined') {
                                            for (var x = 0; x < factions.length; x++) {
                                                if (factions[x].id === parseInt(data.leader.faction_id)) {
                                                    return factions[x].name;
                                                }
                                            }
                                        }
                                    };

                                    var findTitle = function(i) {
                                        if (typeof data.members[i].title_id !== 'undefined') {
                                            for (var x = 0; x < titles.length; x++) {
                                                if (titles[x].id === parseInt(data.members[i].title_id)) {
                                                    return titles[x].name;
                                                }
                                            }
                                        }
                                    };

                                    var outfit = {
                                        'name': data.name,
                                        'alias': data.alias,
                                        'created': Date.parse(data.time_created_date),
                                        'leader': data.leader.name.first,
                                        'faction': {
                                            'name': findFaction(),
                                            'id': parseInt(data.leader.faction_id)
                                        },
                                        'world': world
                                    };

                                    outfit.members = [];
                                    for (var i = 0; i < data.members.length; i++) {
                                        var member = {
                                            'name': typeof data.members[i].name !== 'undefined' ? data.members[i].name.first : '',
                                            'battle_rank': typeof data.members[i].battle_rank !== 'undefined' ? parseInt(data.members[i].battle_rank.value) : 0,
                                            'joined': new Date(0).setUTCSeconds(data.members[i].member_since),
                                            'lastLogin': new Date(0).setUTCSeconds(data.members[i].times.last_login),
                                            'rank': {
                                                'name': data.members[i].rank,
                                                'id': parseInt(data.members[i].rank_ordinal)
                                            },
                                            'title': findTitle(i)
                                        };
                                        outfit.members.push(member);
                                    }
                                    return outfit;
                                });
                            });
                        });
                    });
            };

            return {
                'getOutfit': getOutfit
            };
        }
    ];

    var module = angular.module('PS2Info');
    module.factory('OutfitSvc', OutfitSvc);
}());
