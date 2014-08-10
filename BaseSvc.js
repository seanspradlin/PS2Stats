(function() {
	var BaseSvc = function() {

		/*      ()==[::::::::::::> UTILITIES <::::::::::::]==()      */

		var utility = {
			//Return an array of integers
			range : function(low, high) {
				var array = [];
				for (var i = low; i <= high; i++) {
					array.push(i);
				}
				return array;
			},

			//Define types of operations
			operations : {
				'addition' : function(x, y) { return x + y; },
				'subtraction' : function(x, y) { return x - y; },
				'division' : function(x, y) { return x / y; },
				'multiplication' : function(x, y) { return x * y; }
			},

			//Execute calculation
			calculate : function(x, y, operation) {
				return this.operations[operation](x, y);
			},

			//Add commas to numbers
			addCommas : function(nStr)
			{
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				return x1 + x2;
			}
		};

		/*      ()==[::::::::::::> URL BUILDER <::::::::::::]==()      */

		var urlBuilder = {
			root : 'https://census.soe.com/s:responsiveps2/get/ps2:v2/',
			suffix : '?callback=JSON_CALLBACK',

			//Build an API GET Request
			build : function (collection, schema) {
				collection = typeof collection !== 'undefined' ? collection : '';
				schema = typeof schema !== 'undefined' ? schema : [];
				var url = this.root + collection + this.suffix;
				schema.forEach(function(element) {
					url += '&&' + element;
				});
				console.log(url);
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
			build : function(columns, rows, chartOptions, chartType, chartFormatters) {
				chartFormatters = typeof chartFormatters !== 'undefined' ? chartFormatters : {};
				chartType = typeof chartType !== 'undefined' ? chartType : 'LineChart';

				var month = {};
				month.type = chartType;
				month.options = chartOptions;
				month.formatters = chartFormatters;
				month.data = {
					'cols' : columns,
					'rows' : rows
				};
				return month;
			},

			//Perform an operation between two repeating objects
			//data1: first data object
			//data2: second data object
			//operation: operation to be performed
			mergeDataObjects : function(data1, data2, operation) {
				var result = {};
				for(var i in data1) {
					if (data1.hasOwnProperty(i) && data2.hasOwnProperty(i)) {
						result[i] = utility.calculate(data1[i], data2[i], operation);
					}
				}
				return result;
			},

			//Perform a math operation on all items of a data object
			//data: data object to be operated on
			//value: the value of the operation
			//operation: the type of operation
			calculateDataObject : function(data, value, operation) {
				var result = {};
				for (var i in data) {
					if (data.hasOwnProperty(i)) {
						result[i] = utility.calculate(data[i], value, operation);
					}
				}
				return result;
			},

			//Build row data for chartBuilder
			//columns: array of values to label the columns
			//dataArray: array of data objects to iterate through
			buildData : function(columns, dataArray) {
				var convertJsonToArray = function (data) {
					var result = [];
					for(var i in data) {
						if (data.hasOwnProperty(i)) {
							result.push(data[i]);
						}
					}
					return result;
				};

				var data = [];
				dataArray.forEach(function(value) {
					data.push(convertJsonToArray(value));
				});

				var array = [];
				columns.forEach(function(value, index) {
					var columnArray = [];
					columnArray.push({ v : value });
					data.forEach(function(value) {
						columnArray.push({ v : value[index] });
					});
					array.push({
						c : columnArray
					});
				});

				return array;
			}
		};

		return {
			'utility' : utility,
			'urlBuilder' : urlBuilder,
			'chartBuilder' : chartBuilder
		};
	};

	var module = angular.module('PS2Info');
	module.factory('BaseSvc', BaseSvc);
}());