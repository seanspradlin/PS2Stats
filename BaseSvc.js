(function() {
	var BaseSvc = function() {

		//Return an array of integers
		var range = function(low, high) {
			var array = [];
			for (var i = low; i <= high; i++) {
				array.push(i);
			}
			return array;
		};

		var root = 'https://census.soe.com/s:responsiveps2/get/ps2:v2/';
		var suffix = '?callback=JSON_CALLBACK';
		//Build an API GET Request
		var urlBuilder = function (collection, schema) {
			collection = typeof collection !== 'undefined' ? collection : '';
			schema = typeof schema !== 'undefined' ? schema : [];
			var url = root + collection + suffix;
			schema.forEach(function(element) {
				url += '&&' + element;
			});
			console.log(url);
			return url;
		};

		//Builds a google chart
		//columns: an array with column object details, eg. {id: "day-id", label: "Day", type: "string" }
		//rows: populate rows with data, use dataBuilder function
		//chartOptions: object with chart options, eg. title vAxis.title, hAxis.title
		//chartType (optional): string of the chartType, defaults to LineChart
		//chartFormatters (optional): object of chart formatters, defaults to empty
		var chartBuilder = function(columns, rows, chartOptions, chartType, chartFormatters) {
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
		};

		//Build row data for chartBuilder
		//columns: array of values to label the columns
		//dataArray: array of data objects to iterate through
		var dataBuilder = function(columns, dataArray) {
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
			console.log(array);

			return array;
		};

		return {
			urlBuilder: urlBuilder,
			chartBuilder: chartBuilder,
			dataBuilder: dataBuilder,
			range: range
		};
	};

	var module = angular.module('PS2Info');
	module.factory('BaseSvc', BaseSvc);
}());