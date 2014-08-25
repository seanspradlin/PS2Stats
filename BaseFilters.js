(function() {
    var app = angular.module('PS2Info');
    var startFrom = function() {
        return function(input, start) {
            input = (input) ? input : [];
            start = +start;
            return input.slice(start);
        };
    };
    app.filter('startFrom', startFrom);
}());
