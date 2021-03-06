(function() {
    var PlayerHistoryCtrl = ['$scope', '$log', 'PlayerSvc', 'BaseSvc',
        function($scope, $log, PlayerSvc, BaseSvc) {
            var generateCharts = {
                'kdDay': function() {
                    $scope.charts.kdDay = BaseSvc.chartBuilder.build(
                        [{
                            id: 'day-id',
                            label: 'Day',
                            type: 'number'
                        }, {
                            id: 'kills-id',
                            label: 'Kills',
                            type: 'number'
                        }, {
                            id: 'deaths-id',
                            label: 'Deaths',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData([
                            $scope.history.kills.day,
                            $scope.history.deaths.day
                        ]), {
                            'title': 'Kills/Deaths',
                            'vAxis': {
                                'title': 'Score'
                            },
                            'hAxis': {
                                'title': 'Day'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Day ##'
                            }]
                        });
                },
                'kdWeek': function() {
                    $scope.charts.kdWeek = BaseSvc.chartBuilder.build(
                        [{
                            id: 'day-id',
                            label: 'Week',
                            type: 'number'
                        }, {
                            id: 'kills-id',
                            label: 'Kills',
                            type: 'number'
                        }, {
                            id: 'deaths-id',
                            label: 'Deaths',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData([
                            $scope.history.kills.week,
                            $scope.history.deaths.week
                        ]), {
                            'title': 'Kills/Deaths',
                            'vAxis': {
                                'title': 'Score'
                            },
                            'hAxis': {
                                'title': 'Week'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Week ##'
                            }]
                        });
                },
                'kdMonth': function() {
                    $scope.charts.kdMonth = BaseSvc.chartBuilder.build(
                        [{
                            id: 'day-id',
                            label: 'Day',
                            type: 'number'
                        }, {
                            id: 'kills-id',
                            label: 'Kills',
                            type: 'number'
                        }, {
                            id: 'deaths-id',
                            label: 'Deaths',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData([$scope.history.kills.month, $scope.history.deaths.month]), {
                            'title': 'Kills/Deaths',
                            'vAxis': {
                                'title': 'Score'
                            },
                            'hAxis': {
                                'title': 'Month'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Month ##'
                            }]
                        });
                },
                'kdrDay': function() {
                    $scope.charts.kdrDay = BaseSvc.chartBuilder.build(
                        [{
                            id: 'day-id',
                            label: 'Day',
                            type: 'number'
                        }, {
                            id: 'kdr-id',
                            label: 'Kills/Death Ratio',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData(
                            [BaseSvc.chartBuilder.mergeDataObjects(
                                $scope.history.kills.day,
                                $scope.history.deaths.day,
                                'division')]), {
                            'title': 'Kill/Death Ratio',
                            'vAxis': {
                                'title': 'Ratio'
                            },
                            'hAxis': {
                                'title': 'Day'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Day ##'
                            }, {
                                columnNum: 1,
                                pattern: '##.##'
                            }]
                        });
                },
                'kdrWeek': function() {
                    $scope.charts.kdrWeek = BaseSvc.chartBuilder.build(
                        [{
                            id: 'week-id',
                            label: 'Week',
                            type: 'number'
                        }, {
                            id: 'kdr-id',
                            label: 'Kills/Death Ratio',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData(
                            [BaseSvc.chartBuilder.mergeDataObjects(
                                $scope.history.kills.week,
                                $scope.history.deaths.week,
                                'division')]), {
                            'title': 'Kill/Death Ratio',
                            'vAxis': {
                                'title': 'Ratio'
                            },
                            'hAxis': {
                                'title': 'Week'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Week ##'
                            }, {
                                columnNum: 1,
                                pattern: '##.##'
                            }]
                        });
                },
                'kdrMonth': function() {
                    $scope.charts.kdrMonth = BaseSvc.chartBuilder.build(
                        [{
                            id: 'month-id',
                            label: 'Month',
                            type: 'number'
                        }, {
                            id: 'kdr-id',
                            label: 'Kills/Death Ratio',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData(
                            [BaseSvc.chartBuilder.mergeDataObjects(
                                $scope.history.kills.month,
                                $scope.history.deaths.month,
                                'division')]), {
                            'title': 'Kill/Death Ratio',
                            'vAxis': {
                                'title': 'Ratio'
                            },
                            'hAxis': {
                                'title': 'Month'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Month ##'
                            }, {
                                columnNum: 1,
                                pattern: '##.##'
                            }]
                        });
                },
                'certsDay': function() {
                    $scope.charts.certsDay = BaseSvc.chartBuilder.build(
                        [{
                            id: 'day-id',
                            label: 'Day',
                            type: 'number'
                        }, {
                            id: 'certs-id',
                            label: 'Certs',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData([$scope.history.certs.day]), {
                            'title': 'Certs',
                            'vAxis': {
                                'title': 'Points'
                            },
                            'hAxis': {
                                'title': 'Day'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Day ##'
                            }]
                        });
                },
                'certsWeek': function() {
                    $scope.charts.certsWeek = BaseSvc.chartBuilder.build(
                        [{
                            id: 'week-id',
                            label: 'Week',
                            type: 'number'
                        }, {
                            id: 'certs-id',
                            label: 'Certs',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData([$scope.history.certs.week]), {
                            'title': 'Certs',
                            'vAxis': {
                                'title': 'Points'
                            },
                            'hAxis': {
                                'title': 'Week'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Week ##'
                            }]
                        });
                },
                'certsMonth': function() {
                    $scope.charts.certsMonth = BaseSvc.chartBuilder.build(
                        [{
                            id: 'month-id',
                            label: 'Month',
                            type: 'number'
                        }, {
                            id: 'certs-id',
                            label: 'Certs',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData([$scope.history.certs.month]), {
                            'title': 'Certs',
                            'vAxis': {
                                'title': 'Points'
                            },
                            'hAxis': {
                                'title': 'Month'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Month ##'
                            }]
                        });
                },
                'sphDay': function() {
                    $scope.charts.sphDay = BaseSvc.chartBuilder.build(
                        [{
                            id: 'day-id',
                            label: 'Day',
                            type: 'number'
                        }, {
                            id: 'sph-id',
                            label: 'Score Per Hour',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData([
                            BaseSvc.chartBuilder.calculateDataObject(
                                BaseSvc.chartBuilder.mergeDataObjects(
                                    $scope.history.score.day,
                                    $scope.history.time.day,
                                    'division'),
                                3600, 'multiplication')
                        ]), {
                            'title': 'Score/Hour',
                            'vAxis': {
                                'title': 'Rate'
                            },
                            'hAxis': {
                                'title': 'Day'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Day ##'
                            }, {
                                columnNum: 1,
                                pattern: '###,###'
                            }]
                        });
                },
                'sphWeek': function() {
                    $scope.charts.sphWeek = BaseSvc.chartBuilder.build(
                        [{
                            id: 'week-id',
                            label: 'Week',
                            type: 'number'
                        }, {
                            id: 'sph-id',
                            label: 'Score Per Hour',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData([
                            BaseSvc.chartBuilder.calculateDataObject(
                                BaseSvc.chartBuilder.mergeDataObjects(
                                    $scope.history.score.week,
                                    $scope.history.time.week,
                                    'division'),
                                3600, 'multiplication')
                        ]), {
                            'title': 'Score/Hour',
                            'vAxis': {
                                'title': 'Rate'
                            },
                            'hAxis': {
                                'title': 'Week'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Week ##'
                            }, {
                                columnNum: 1,
                                pattern: '###,###'
                            }]
                        });
                },
                'sphMonth': function() {
                    $scope.charts.sphMonth = BaseSvc.chartBuilder.build(
                        [{
                            id: 'month-id',
                            label: 'Month',
                            type: 'number'
                        }, {
                            id: 'sph-id',
                            label: 'Score Per Hour',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData([
                            BaseSvc.chartBuilder.calculateDataObject(
                                BaseSvc.chartBuilder.mergeDataObjects(
                                    $scope.history.score.month,
                                    $scope.history.time.month,
                                    'division'),
                                3600, 'multiplication')
                        ]), {
                            'title': 'Score/Hour',
                            'vAxis': {
                                'title': 'Points'
                            },
                            'hAxis': {
                                'title': 'Month'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Month ##'
                            }, {
                                columnNum: 1,
                                pattern: '###,###'
                            }]
                        });
                },
                'timeDay': function() {
                    $scope.charts.timeDay = BaseSvc.chartBuilder.build(
                        [{
                            id: 'day-id',
                            label: 'Day',
                            type: 'number'
                        }, {
                            id: 'time-id',
                            label: 'Hours Played',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData(
                            [BaseSvc.chartBuilder.calculateDataObject($scope.history.time.day, 3600, 'division')]), {
                            'title': 'Time Played',
                            'vAxis': {
                                'title': 'Hours'
                            },
                            'hAxis': {
                                'title': 'Day'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Day ##'
                            }, {
                                columnNum: 1,
                                pattern: '###.#'
                            }]
                        });
                },
                'timeWeek': function() {
                    $scope.charts.timeWeek = BaseSvc.chartBuilder.build(
                        [{
                            id: 'week-id',
                            label: 'Week',
                            type: 'number'
                        }, {
                            id: 'time-id',
                            label: 'Hours Played',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData(
                            [BaseSvc.chartBuilder.calculateDataObject($scope.history.time.week, 3600, 'division')]), {
                            'title': 'Time Played',
                            'vAxis': {
                                'title': 'Hours'
                            },
                            'hAxis': {
                                'title': 'Week'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Week ##'
                            }, {
                                columnNum: 1,
                                pattern: '###.#'
                            }]
                        });
                },
                'timeMonth': function() {
                    $scope.charts.timeMonth = BaseSvc.chartBuilder.build(
                        [{
                            id: 'month-id',
                            label: 'Month',
                            type: 'number'
                        }, {
                            id: 'time-id',
                            label: 'Hours Played',
                            type: 'number'
                        }],
                        BaseSvc.chartBuilder.buildData(
                            [BaseSvc.chartBuilder.calculateDataObject($scope.history.time.month, 3600, 'division')]), {
                            'title': 'Time Played',
                            'vAxis': {
                                'title': 'Hours'
                            },
                            'hAxis': {
                                'title': 'Month'
                            }
                        },
                        'LineChart', {
                            number: [{
                                columnNum: 0,
                                pattern: 'Month ##'
                            }, {
                                columnNum: 1,
                                pattern: '###.#'
                            }]
                        });
                }
            };

            //Load player stat history and fill charts
            var loadHistory = function(playerId) {
                PlayerSvc.getPlayerStatHistory(playerId, 'kills,deaths,time,score,certs').then(function(data) {
                    $scope.history = data;
                    $scope.player.sph = BaseSvc.utility.addCommas(
                        ($scope.history.score.allTime / $scope.history.time.allTime * 3600)
                        .toFixed(0));
                    $scope.player.kdr = ($scope.history.kills.allTime / $scope.history.deaths.allTime).toFixed(2);

                    $scope.charts = {};
                    
                    $scope.loadDay = function() {
                        generateCharts.kdDay();
                        generateCharts.kdrDay();
                        generateCharts.certsDay();
                        generateCharts.sphDay();
                        generateCharts.timeDay();
                    };

                    $scope.loadWeek = function() {
                        generateCharts.kdWeek();
                        generateCharts.kdrWeek();
                        generateCharts.certsWeek();
                        generateCharts.sphWeek();
                        generateCharts.timeWeek();
                    };

                    $scope.loadMonth = function() {
                        generateCharts.kdMonth();
                        generateCharts.kdrMonth();
                        generateCharts.certsMonth();
                        generateCharts.sphMonth();
                        generateCharts.timeMonth();
                    };

                    //Run kdLoad since it is the active tab on page load
                    $scope.loadDay();
                }, onError);
            };

            //Execute on error
            var onError = function(reason) {
                $scope.error = true;
                $log.error('PlayerHistoryCtrl: ' + reason);
            };

            //Execute when character ID is loaded
            $scope.$watch('player.id', function(playerid) {
                if (typeof playerid !== 'undefined') {
                    loadHistory(playerid, 20);
                }
            });
        }
    ];
    
    var app = angular.module('PS2Info');
    app.controller('PlayerHistoryCtrl', PlayerHistoryCtrl);
}());
