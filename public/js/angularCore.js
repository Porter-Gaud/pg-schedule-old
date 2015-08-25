var pgSchedule = angular.module('pgSchedule', ['ui.bootstrap', 'cgPrompt']);

pgSchedule.controller('mainController', ['$scope', '$http', '$log', '$interval', function($scope, $http, $log, $interval) {
  $scope.timeUntil = '';
  $scope.currentDay = '';
  $scope.currentBlock = '';
  $scope.dateString = '';
  $scope.weekend = false;

  $scope.getTimeUntil = function() {
    $http.get(getApi('timeUntil')).success(function(data) {
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
    $http.get(getApi('currentBlock')).success(function(data) {
      $scope.currentBlock = data;
    });
  };

  $scope.getCurrentDay = function() {
    $http.get(getApi('currentDay')).success(function(data) {
      $scope.currentDay = data;
      console.log(data);
      $scope.weekend = (data === '');
    });
  };

  $scope.getFutureDate = function(){
    day = null;
    prompt({
      "title": "Enter Date",
      "message": "",
      "input": true,
      "label": "Month/Day mm/dd",
      "value": "08/12"
    }).then(function(result){
      day = result;
    });
    $http.get(getApi('getFutureDate/' +
          '/' +
          day.substring(0, 2) +
          '/' +
          day.substring(3, 5)
          )
        .success(function(data){
          $scope.currentDay = data;
          $scope.weekend = (data === '');
        }));
  };

  $scope.beautifyTime = function(time) {
    var hours = parseInt(time.substring(0,2)) % 12;
    hours = (hours === 0 ? 12 : hours);
    return hours + time.substring(2, 5);
  };

  function getApi(endpoint) {
    return '/api/' + endpoint + ((window.location.href.indexOf('middle') == -1) ? '' : '?middle');
  }

  $scope.getCurrentDay();
  $scope.getCurrentBlock();
  $scope.getTimeUntil();

  $interval($scope.getCurrentBlock, 1000 * 10);
  $interval($scope.getCurrentDay, 1000 * 60 * 60);
  $interval($scope.getTimeUntil, 1000 * 10);

}]);
