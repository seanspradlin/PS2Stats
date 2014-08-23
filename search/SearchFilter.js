(function() {
    var app = angular.module('PS2Info');

    var SearchFilter = function() {
        return function(input, server, faction, minLevel, maxLevel) {
            minLevel = typeof minLevel !== 'undefined' ? minLevel : 1;
            minLevel = minLevel > 0 ? minLevel : 1;
            minLevel = minLevel <= 100 ? minLevel : 100;

            maxLevel = typeof maxLevel !== 'undefined' ? maxLevel : 100;
            maxLevel = maxLevel <= 100 ? maxLevel : 100;
            maxLevel = maxLevel >= minLevel ? maxLevel : minLevel;

            var filtered = [];
            if (typeof input !== 'undefined') {
                for (var i = 0; i < input.length; i++) {
                    var isCorrectServer = input[i].world_id === server || server === 0;
                    var isCorrectFaction = input[i].faction_id === faction || faction === 0;
                    var isAboveMin = input[i].battle_rank >= minLevel || typeof input[i].battle_rank === 'undefined';
                    var isBelowMax = input[i].battle_rank <= maxLevel || typeof input[i].battle_rank === 'undefined';
                    if (isCorrectFaction && isCorrectServer && isAboveMin && isBelowMax) {
                        filtered.push(input[i]);
                    }
                }
            }
            return filtered;
        };
    };
    app.filter('SearchFilter', SearchFilter);
}());
