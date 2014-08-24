(function() {
    var BaseSvc = ['$log', '$http',
        function($log, $http) {

            var data = {
                'getFactions': function() {
                    return $http.jsonp(urlBuilder.build('faction', [
                            'c:limit=3',
                            'user_selectable=1',
                            'c:lang=en',
                            'c:hide=image_id,image_path,image_set_id'
                        ]))
                        .then(function(response) {
                            var data = response.data.faction_list;
                            var factions = [];
                            for (var i = 0; i < data.length; i++) {
                                var faction = {
                                    'name': data[i].name.en,
                                    'tag': data[i].code_tag,
                                    'id': parseInt(data[i].faction_id)
                                };
                                factions.push(faction);
                            }
                            return factions;
                        });
                },
                'getServers': function() {
                    return $http.jsonp(urlBuilder.build('world', [
                            'c:limit=20',
                            'c:lang=en',
                            'state=online'
                        ]))
                        .then(function(response) {
                            var data = response.data.world_list;
                            var servers = [];
                            for (var i = 0; i < data.length; i++) {
                                var server = {
                                    'name': data[i].name.en,
                                    'id': parseInt(data[i].world_id)
                                };
                                servers.push(server);
                            }
                            return servers;
                        });
                },
                'getTitles': function() {
                    return $http.jsonp(urlBuilder.build('title', [
                            'c:limit=200',
                            'c:lang=en'
                        ]))
                        .then(function(response) {
                            var data = response.data.title_list;
                            var titles = [];
                            for (var i = 0; i < data.length; i++) {
                                var title = {
                                    'name': data[i].name.en,
                                    'id': parseInt(data[i].title_id)
                                };
                                titles.push(title);
                            }
                            return titles;
                        });
                }
            };

            /*      ()==[::::::::::::> UTILITIES <::::::::::::]==()      */

            var utility = {
                //Return an array of integers
                'range': function(low, high) {
                    var array = [];
                    for (var i = low; i <= high; i++) {
                        array.push(i);
                    }
                    return array;
                },

                //Define types of operations
                operations: {
                    'addition': function(x, y) {
                        return x + y;
                    },
                    'subtraction': function(x, y) {
                        return x - y;
                    },
                    'division': function(x, y) {
                        return x / y;
                    },
                    'multiplication': function(x, y) {
                        return x * y;
                    }
                },

                //Execute calculation
                calculate: function(x, y, operation) {
                    return this.operations[operation](x, y);
                },

                //Add commas to numbers
                addCommas: function(nStr) {
                    nStr += '';
                    var x = nStr.split('.');
                    var x1 = x[0];
                    var x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                    }
                    return x1 + x2;
                }
            };

            /*      ()==[::::::::::::> URL BUILDER <::::::::::::]==()      */

            var urlBuilder = {
                root: 'https://census.soe.com/s:responsiveps2/get/ps2:v2/',
                suffix: '?callback=JSON_CALLBACK',

                //Build an API GET Request
                build: function(collection, schema) {
                    collection = typeof collection !== 'undefined' ? collection : '';
                    schema = typeof schema !== 'undefined' ? schema : [];
                    var url = this.root + collection + this.suffix;
                    schema.forEach(function(element) {
                        url += '&' + element;
                    });
                    $log.info('GET: ' + url);
                    return url;
                }
            };

            /*      ()==[::::::::::::> CHART BUILDER <::::::::::::]==()      */

            var chartBuilder = {
                //Builds a google chart
                //columns: an array with column object details, eg. {id: "day-id", label: "Day", type: "string" }
                //rows: populate rows with data, use buildData function
                //chartOptions: object with chart options, eg. title vAxis.title, hAxis.title
                //chartType (optional): string of the chartType, defaults to LineChart
                //chartFormatters (optional): object of chart formatters, defaults to empty
                build: function(columns, rows, chartOptions, chartType, chartFormatters) {
                    chartFormatters = typeof chartFormatters !== 'undefined' ? chartFormatters : {};
                    chartType = typeof chartType !== 'undefined' ? chartType : 'LineChart';

                    var month = {};
                    month.type = chartType;
                    month.options = chartOptions;
                    month.formatters = chartFormatters;
                    month.data = {
                        'cols': columns,
                        'rows': rows
                    };
                    return month;
                },

                //Perform an operation between two arrays
                //data1: first data object
                //data2: second data object
                //operation: operation to be performed
                mergeDataObjects: function(data1, data2, operation) {
                    var result = [];
<<<<<<< HEAD
                    for (var i = 0; i < data1.length; i++) {
=======
                    for (var i in data1) {
>>>>>>> 7f2647e902dad7e10a4cfe8d3f18d71f2d3c7e68
                        result.push(utility.calculate(data1[i], data2[i], operation));
                    }
                    return result;
                },

                //Perform a math operation on all items of a data object
                //data: data object to be operated on
                //value: the value of the operation
                //operation: the type of operation
                calculateDataObject: function(data, value, operation) {
                    var result = [];
                    for (var i = 0; i < data.length; i++) {
                        result.push(utility.calculate(data[i], value, operation));
                    }
                    return result;
                },

                //Build row data for chartBuilder
                //dataArray: array of data objects to iterate through
                buildData: function(dataArray) {
                    var columns = utility.range(1, dataArray[0].length);
                    var array = [];
                    columns.forEach(function(value, index) {
                        var columnArray = [];
                        columnArray.push({
                            v: value
                        });
                        dataArray.forEach(function(value) {
                            columnArray.push({
                                v: value[index]
                            });
                        });
                        array.push({
                            c: columnArray
                        });
                    });

                    return array;
                }
            };

            return {
                'data': data,
                'utility': utility,
                'urlBuilder': urlBuilder,
                'chartBuilder': chartBuilder
            };
        }
    ];

    var module = angular.module('PS2Info');
    module.factory('BaseSvc', BaseSvc);
}());
