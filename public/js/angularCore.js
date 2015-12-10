var pgSchedule = angular.module('pgSchedule', ['ui.bootstrap', 'ngCookies']);

pgSchedule.controller('mainController', ['$scope', '$http', '$log', '$interval', '$location', '$cookies', '$modal', function($scope, $http, $log, $interval, $location, $cookies, $modal) {
  $scope.timeUntil = '';
  $scope.currentDay = '';
  $scope.currentBlock = '';
  $scope.dateString = '';
  $scope.cookies = []; // A=BLOCK,B=BLOCK
  $scope.weekend = false;
  $scope.lunch = [];
  $scope.day = new Date();
  $scope.week = '';
  $scope.nightMode = false;
  $scope.announcement;

  $scope.getTimeUntil = function() {
    $http.get(getApi('timeUntil')).success(function(data) {
      if (data === -1) {
        $scope.dateString = 'No Class';
      } else {
        $scope.timeUntil = (parseInt(data) + 1) + '';
        $scope.dateString = ($scope.timeUntil) + ' minutes until next class.';
        if ($scope.timeUntil === 1) {
          $scope.dateString = ($scope.timeUntil) + ' minute until next class';
        }
      }
    });
  };

  $scope.updateDate = function() {
    if ($scope.dt === null) {
      return;
    }
    $scope.day = new Date($scope.dt);
    var apiString = 'getFutureDate' +
      '/' + ($scope.day.getMonth()) +
      '/' + ($scope.day.getDate()) +
      '/' + ($scope.day.getFullYear());
    $http.get(getApi(apiString)).success(function(data) {
      $scope.currentDay = data[Object.keys(data)[0]];
      if (Object.keys(data)[0] === 'WEEKEND') {
        $scope.week = 'Weekend';
      } else {
        $scope.week = Object.keys(data)[0] + ' Week';
      }
      $scope.weekend = (Object.keys(data)[0] === 'WEEKEND');
    });
  };

  $scope.changeDay = function(offset) {
    var dateOffset = (24 * 60 * 60 * 1000) * offset;
    $scope.day.setTime($scope.day.getTime() + dateOffset);
    var apiString = 'getFutureDate' +
      '/' + ($scope.day.getMonth()) +
      '/' + ($scope.day.getDate()) +
      '/' + ($scope.day.getFullYear());
    $http.get(getApi(apiString)).success(function(data) {
      $scope.currentDay = data[Object.keys(data)[0]];
      if (Object.keys(data)[0] === '') {
        $scope.week = 'Weekend';
      } else {
        $scope.week = Object.keys(data)[0] + ' Week';
      }
      $scope.weekend = (Object.keys(data)[0] === '');
    });
  };

  $scope.getCurrentBlock = function() {
    $http.get(getApi('currentBlock')).success(function(data) {
      $scope.currentBlock = data;
      if ($cookies.get('schedule')) {
        var classCookie = $cookies.get('schedule').split(',');
        for (var i = 0; i < classCookie.length; i++) {
          var theClass = classCookie[i].split('=');
          $scope.cookies[theClass[0]] = theClass[1];
        }
      }
    });
  };

  $scope.getCurrentDay = function() {
    if ($scope.day.getDate() !== new Date().getDate()) {
      return;
    }
    $http.get(getApi('currentDay')).success(function(data) {
      $scope.currentDay = data[Object.keys(data)[0]];
      if (Object.keys(data)[0] === 'WEEKEND') {
        $scope.week = 'Weekend';
      } else {
        $scope.week = Object.keys(data)[0] + ' Week';
      }
      $scope.weekend = (Object.keys(data)[0] === 'WEEKEND');
    });
  };

  $scope.addClasses = function() {
    var cookieString = '';
    angular.forEach(angular.element.find('.classInput'), function(node) {
      cookieString += (node.id.substring(0, 1)) + '=' + '' + node.value + ',';
    });
    $cookies.put('schedule', cookieString, {expires: new Date('5/29/2016')});
    location.reload(); // Until we get angular-bootstrap working correctly.
  };

  $scope.getLunchMenu = function() {
    $http.get('/api/getLunchMenu').success(function(data) {
      $scope.lunch = data;
      $scope.lunch.pop();
    });
  };

  $scope.getAnnouncement = function() {
    var views = 0;
    if ($cookies.get('announcement')) {
      var cookie = $cookies.get('announcement');
      views = parseInt(cookie.split(':')[0]);
      if (views > parseInt(cookie.split(':')[1])) {
        return;
      }
    }
    $http.get('/api/getAnnouncement').success(function(data) {
      $scope.announcement = data;
      $cookies.put('announcement', views + 1 + ':' + data.loads, {expires: new Date(data.expires)});
    });
  };

  $scope.beautifyTime = function(time) {
    var hours = parseInt(time.substring(0,2)) % 12;
    hours = (hours === 0 ? 12 : hours);
    return hours + time.substring(2, 5);
  };

  function getApi(endpoint) {
    return '/api/' + endpoint + (($location.absUrl().indexOf('middle') > -1) ? '?middle=1' : '');
  }

  $scope.getCurrentDay();
  $scope.getCurrentBlock();
  $scope.getTimeUntil();
  $scope.getAnnouncement();

  $interval($scope.getCurrentBlock, 1000 * 10);
  $interval($scope.getCurrentDay, 1000 * 60 * 60);
  $interval($scope.getTimeUntil, 1000 * 10);

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.open = function($event) {
    $scope.showWeeks = false;
    $scope.status.opened = true;
  };

  $scope.status = {
    opened: false,
  };

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  };

}]);
