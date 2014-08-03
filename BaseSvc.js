(function() {
	var BaseSvc = function() {
		var range = function(low, high) {
			array = [];
			for (var i = low; i <= high; i++) {
				array.push(i);
			};
			return array;
		};

		var urlBuilder = {
			root: 'https://census.soe.com/s:responsiveps2/get/ps2:v2/',
			suffix: '?callback=JSON_CALLBACK',
			language: function (language) {
				return 'c:lang=' + language;
			},
			build: function (collection, schema) {
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

		var dataBuilder = function(columns, dataArray) {
			var convertJsonToArray = function (data) {
				var result = [];
				for(var i in data) {
					result.push(data[i]);
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