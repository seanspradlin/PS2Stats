(function() {
    var SearchSvc = function($http, BaseSvc) {
        //Return a list of players beginning with the search term
        var getPlayers = function(search) {
            search = typeof search !== 'undefined' ? search : 'higby';
            search = search.replace(/\s+/g, '').toLowerCase();
            return $http.jsonp(BaseSvc.urlBuilder.build('character', [
                    'name.first_lower=^' + search,
                    'c:limit=100',
                    'c:resolve=world,online_status,outfit(alias)',
                    'c:join=faction^on:faction_id^inject_at:faction',
                    'c:join=world^on:world_id^inject_at:world',
                    'c:hide=certs,daily_ribbon,head_id,profile_id,times,title_id',
                    'c:lang=en'
                ]))
                .then(function(response) {
                    return response.data.character_list;
                });
        };

        //Return a list of outfits beginning with the search term
        var getOutfits = function(search) {
            search = typeof search !== 'undefined' ? search : 'nuc';
            search = search.replace(/\s+/g, '').toLowerCase();
            return $http.jsonp(BaseSvc.urlBuilder.build('outfit', [
                    'alias_lower=^' + search,
                    'c:limit=100'
                ]))
                .then(function(response) {
                    return response.data.outfit_list;
                });
        };

        return {
            'getPlayers': getPlayers,
            'getOutfits': getOutfits
        };
    };

    var module = angular.module('PS2Info');
    module.factory('SearchSvc', SearchSvc);
}());
