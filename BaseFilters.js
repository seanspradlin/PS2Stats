(function() {
    var startFrom = function() {
        return function(input, start) {
            input = (input) ? input : [];
            start = +start;
            return input.slice(start);
        };
    };
    
    var app = angular.module('PS2Info');
    app.filter('startFrom', startFrom);
}());
