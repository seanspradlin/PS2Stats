(function() {
	var app = angular.module('PS2Info');

	var OutfitFilter = function() {
		return function(input, rank, showActive) {
			rank = typeof rank !== 'undefined' ? rank : -1;
			showActive = typeof showActive !== 'undefined' ? showActive : false;

			var filtered = [];
			if (typeof input !== 'undefined') {
				for (var i = 0; i < input.length; i++) {
					var isCorrectRank = input[i].rank.id === rank || rank === -1;
					if (showActive && input[i].isActive && isCorrectRank) {
						filtered.push(input[i]);
					}
					else if (isCorrectRank && !showActive) {
						filtered.push(input[i]);
					}
				}
			}
			return filtered;
		};
	};
	app.filter('OutfitFilter', OutfitFilter);
}());