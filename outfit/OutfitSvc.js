(function() {
    var OutfitSvc = ['$http', 'BaseSvc',
        function($http, BaseSvc) {
        	var getOutfit = function(alias) {
        		alias = typeof alias !== 'undefined' ? alias : 'nuc';
        		alias = angular.lowercase(alias.replace(/\s+/g, ''));
        		return $http.jsonp(BaseSvc.urlBuilder.build('outfit', [
        			'alias_lower=' + alias,
        			'c:resolve=leader(name,battle_rank,faction_id),member_character(name,battle_rank,member_since_date,rank,title_id)'
        			]))
        		.then(function(response) {
        			var data = response.data.outfit_list[0];
        			return BaseSvc.data.getFactions().then(function(factions) {
        				return BaseSvc.data.getTitles().then(function(titles) {
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
        						'member_count': parseInt(data.member_count),
        						'created': Date.parse(data.time_created_date),
        						'leader': data.leader.name.first,
        						'faction': findFaction()
        					};

        					outfit.members = [];
        					for (var i = 0; i < data.members.length; i++) {
        						var member = {
        							'name': data.members[i].name.first,
        							'battle_rank': parseInt(data.members[i].battle_rank.value),
        							'joined': Date.parse(data.members[i].member_since_date),
        							'rank': data.members[i].rank,
        							'title': findTitle(i)
        						};
        						outfit.members.push(member);
        					}
        					return outfit;
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
