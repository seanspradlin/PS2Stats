(function() {
    var SearchSvc = ['$http', 'BaseSvc',
        function($http, BaseSvc) {
            //Return a list of players beginning with the search term
            var getPlayers = function(search) {
                search = typeof search !== 'undefined' ? search : 'higby';
                search = angular.lowercase(search.replace(/\s+/g, ''));
                return $http.jsonp(BaseSvc.urlBuilder.build('character', [
                        'name.first_lower=^' + search,
                        'c:limit=100',
                        'c:resolve=world,online_status,outfit(alias)',
                        'c:join=faction^on:faction_id^inject_at:faction',
                        'c:join=world^on:world_id^inject_at:world',
                        'c:hide=certs,daily_ribbon,head_id,profile_id,times,title_id',
                        'c:lang=en',
                        'battle_rank.value=>0'
                    ]))
                    .then(function(response) {
                        var data = response.data.character_list;
                        var parsedData = [];
                        angular.forEach(data, function(player) {
                            var parsedPlayer = {
                                'name': player.name.first,
                                'battle_rank': parseInt(player.battle_rank.value),
                                'faction': player.faction.name.en,
                                'faction_id': parseInt(player.faction.faction_id),
                                'online_status': parseInt(player.online_status),
                                'world': player.world.name.en,
                                'world_id': parseInt(player.world.world_id),
                                'outfit': (typeof player.outfit !== 'undefined') ? player.outfit.alias : ''
                            };
                            this.push(parsedPlayer);
                        }, parsedData);
                        //Convert battle_rank.value to an int
                        return parsedData;
                    });
            };

            //Return a list of outfits beginning with the search term
            var getOutfits = function(search) {
                search = typeof search !== 'undefined' ? search : 'nuc';
                search = angular.lowercase(search.replace(/\s+/g, ''));
                return $http.jsonp(BaseSvc.urlBuilder.build('outfit', [
                        'alias_lower=^' + search,
                        'c:limit=100'
                    ]))
                    .then(function(response) {
                        var data = response.data.outfit_list;
                        var parsedData = [];
                        angular.forEach(data, function(outfit) {
                            return $http.jsonp(BaseSvc.urlBuilder.build('character', [
                                    'character_id=' + outfit.leader_character_id,
                                    'c:show=name,faction_id,character_id,world_id',
                                    'c:resolve=world,faction',
                                    'c:join=faction^on:faction_id^inject_at:faction',
                                    'c:lang=en',
                                    'c:join=world^on:world_id^inject_at:world^hide:state'
                                ]))
                                .then(function(response) {
                                    var leader = response.data.character_list[0];
                                    var parsedOutfit = {
                                        'name': outfit.name,
                                        'alias': outfit.alias,
                                        'member_count': outfit.member_count,
                                        'faction': leader.faction.name.en,
                                        'faction_id': parseInt(leader.faction_id),
                                        'world': leader.world.name.en,
                                        'world_id': parseInt(leader.world_id),
                                        'leader': leader.name.first
                                    };
                                    parsedData.push(parsedOutfit);
                                });
                        }, parsedData);
                        return parsedData;
                    });
            };

            return {
                'getPlayers': getPlayers,
                'getOutfits': getOutfits
            };
        }
    ];

    var module = angular.module('PS2Info');
    module.factory('SearchSvc', SearchSvc);
}());
