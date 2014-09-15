(function() {
    var LeaderboardsSvc = ['$http', 'BaseSvc',
        function($http, BaseSvc) {

            var getLeaderboard = function(stat, period, world, start, limit) {
                var filters = [
                    'name=' + stat,
                    'period=' + period,
                    'c:resolve=character,characters_stat_history(all_time,stat_name),world',
                    'c:start=' + start,
                    'c:limit=' + limit
                ];
                if (world > 0) {
                    filters.push('world=' + world);
                }
                return $http.jsonp(BaseSvc.urlBuilder.build('leaderboard', filters))
                    .then(function(response) {
                        var data = response.data.leaderboard_list;
                        return BaseSvc.data.getFactions().then(function(factions) {
                            return BaseSvc.data.getTitles().then(function(titles) {
                                return BaseSvc.data.getServers().then(function(worlds) {
                                    var filteredData = [];
                                    //TODO refactor with OutfitSvc
                                    var findTitle = function(i) {
                                        if (typeof data[i].title_id !== 'undefined') {
                                            for (var x = 0; x < titles.length; x++) {
                                                if (titles[x].id === parseInt(data[i].title_id)) {
                                                    return titles[x].name;
                                                }
                                            }
                                        }
                                    };
                                    var findFaction = function(i) {
                                        for (var x = 0; x < factions.length; x++) {
                                            if (factions[x].id === parseInt(data[i].faction_id)) {
                                                return factions[x].name;
                                            }
                                        }
                                    };
                                    var findWorld = function(i) {
                                        for (var x = 0; x < worlds.length; x++) {
                                            if (worlds[x].id === parseInt(data[i].world_id)) {
                                                return worlds[x].name;
                                            }
                                        }
                                    };
                                    var getStatMaximums = function(i) {
                                        var max = {};
                                        for (var x = 0; x < data[i].stats.stat_history.length; x++) {
                                            max[data[i].stats.stat_history[x].stat_name] = parseInt(data[i].stats.stat_history[x].all_time);
                                        }
                                        return max;
                                    };
                                    for (var i = 0; i < data.length; i++) {
                                        var player = {
                                            'name': typeof data[i].name !== 'undefined' ? data[i].name.first : '',
                                            'battle_rank': typeof data[i].battle_rank !== 'undefined' ? parseInt(data[i].battle_rank.value) : 0,
                                            'certs': typeof data[i].certs !== 'undefined' ? {
                                                'available': parseInt(data[i].certs.available_points),
                                                'earned': parseInt(data[i].certs.earned_points),
                                                'gifted': parseInt(data[i].certs.gifted_points),
                                                'next': parseFloat(data[i].certs.percent_to_next),
                                                'spent': parseInt(data[i].certs.spent_points)
                                            } : {},
                                            'faction': {
                                                'name': findFaction(i),
                                                'id': parseInt(data[i].faction_id)
                                            },
                                            'world': {
                                                'name': findWorld(i),
                                                'id': parseInt(data[i].world_id)
                                            },
                                            'title': findTitle(i),
                                            'ranking': parseInt(data[i].rank) + 1,
                                            'created': typeof data[i].times !== 'undefined' ? new Date(0).setUTCSeconds(data[i].times.creation) : new Date(),
                                            'last_login': typeof data[i].times !== 'undefined' ? new Date(0).setUTCSeconds(data[i].times.last_login) : new Date(),
                                            'value': stat.toLowerCase() == 'time' ? parseInt(data[i].value)/3600 : parseInt(data[i].value),
                                            'maximums': getStatMaximums(i)
                                        };
                                        filteredData.push(player);
                                    }
                                    return filteredData;
                                });
                            });
                        });
                    });
            };

            return {
                'getLeaderboard': getLeaderboard,
            };
        }
    ];

    var module = angular.module('PS2Info');
    module.factory('LeaderboardsSvc', LeaderboardsSvc);
}());
