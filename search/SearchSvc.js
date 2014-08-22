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
                        angular.forEach(data, function(outfit) {
                            outfit.member_count = parseInt(outfit.member_count);
                        });
                        return data;
                    });
            };

            //Return a list of servers
            var getServers = function() {
                return $http.jsonp(BaseSvc.urlBuilder.build('world', [
                        'c:limit=20',
                        'c:lang=en',
                        'state=online'
                    ]))
                    .then(function(response) {
                        var data = response.data.world_list;
                        var parsedData = [{
                            'name': '-- All Servers --',
                            'id': 0
                        }];
                        angular.forEach(data, function(server) {
                            var parsedServer = {
                                'name': server.name.en,
                                'id': parseInt(server.world_id)
                            };
                            this.push(parsedServer);
                        }, parsedData);
                        return parsedData;
                    });
            };

            //Return a list of factions
            var getFactions = function() {
                return $http.jsonp(BaseSvc.urlBuilder.build('faction', [
                        'c:limit=20',
                        'c:lang=en',
                        'faction_id=>0'
                    ]))
                    .then(function(response) {
                        var data = response.data.faction_list;
                        var parsedData = [{
                            'id': 0,
                            'name': '-- All Factions --'
                        }];
                        angular.forEach(data, function(faction) {
                            var parsedFaction = {
                                'name': faction.name.en,
                                'id': parseInt(faction.faction_id)
                            };
                            this.push(parsedFaction);
                        }, parsedData);
                        return parsedData;
                    });
            };

            return {
                'getPlayers': getPlayers,
                'getOutfits': getOutfits,
                'getServers': getServers,
                'getFactions': getFactions
            };
        }
    ];

    var module = angular.module('PS2Info');
    module.factory('SearchSvc', SearchSvc);
}());
