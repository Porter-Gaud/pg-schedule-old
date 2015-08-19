var pgSchedule = angular.module('pgSchedule', []);

pgSchedule.controller('mainController', ['$scope', '$http', '$log', '$interval', function($scope, $http, $log, $interval) {
  $scope.timeUntil = '';
  $scope.currentDay = '';
  $scope.currentBlock = '';
  $scope.dateString = '';
  $scope.weekend = false;

  $scope.getTimeUntil = function() {
    $http.get('/api/timeUntil').success(function(data) {
      if (data === -1) {
        $scope.dateString = 'No Class';
      } else {
        $scope.timeUntil = (parseInt(data) + 1) + '';
        $scope.dateString = ($scope.timeUntil) + ' minutes until next class.';
        if ($scope.timeUntil === 1) {
          $scope.dataString = ($scope.timeUntil) + ' minute until next class';
        }
      }
    });
  };

  $scope.getCurrentBlock = function() {
    $http.get('/api/currentBlock').success(function(data) {
      $scope.currentBlock = data;
    });
  };

  $scope.getCurrentDay = function() {
    $http.get('/api/currentDay/').success(function(data) {
      $scope.currentDay = data;
      $scope.weekend = (data === '');
    });
  };

  $scope.beautifyTime = function(time) {
    var hours = parseInt(time.substring(0,2)) % 12;
    hours = (hours === 0 ? 12 : hours);
    return hours + time.substring(2, 5);
  };

  $scope.getCurrentDay();
  $scope.getCurrentBlock();
  $scope.getTimeUntil();

  $interval($scope.getCurrentBlock, 1000 * 10);
  $interval($scope.getCurrentDay, 1000 * 60 * 60);
  $interval($scope.getTimeUntil, 1000 * 10);

}]);
