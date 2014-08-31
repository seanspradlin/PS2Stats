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
                        'c:resolve=rank,leader(name,battle_rank,faction_id),member_character(name,battle_rank,member_since_date,rank,title_id,times)',
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

                                    outfit.ranks = [];
                                    for (var i = 0; i < data.ranks.length; i++) {
                                        var rank = {
                                            'name': data.ranks[i].name,
                                            'description': data.ranks[i].description,
                                            'id': parseInt(data.ranks[i].ordinal)
                                        };
                                        outfit.ranks.push(rank);
                                    }

                                    outfit.members = [];
                                    for (i = 0; i < data.members.length; i++) {
                                        var member = {
                                            'name': typeof data.members[i].name !== 'undefined' ? data.members[i].name.first : '',
                                            'battle_rank': typeof data.members[i].battle_rank !== 'undefined' ? parseInt(data.members[i].battle_rank.value) : 0,
                                            'joined': new Date(0).setUTCSeconds(data.members[i].member_since),
                                            'lastLogin': typeof data.members[i].times !== 'undefined' ? new Date(0).setUTCSeconds(data.members[i].times.last_login) : new Date(0),
                                            'rank': {
                                                'name': data.members[i].rank,
                                                'id': parseInt(data.members[i].rank_ordinal)
                                            },
                                            'title': findTitle(i)
                                        };
                                        member.isActive = member.lastLogin > new Date(new Date().setDate(new Date().getDate() - 14)),
                                        outfit.members.push(member);
                                    }
                                    outfit.activeMembers = 0;
                                    for (i = 0; i < outfit.members.length; i++) {
                                        if (outfit.members[i].isActive) outfit.activeMembers++;
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
