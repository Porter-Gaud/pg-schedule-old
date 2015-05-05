var pgSchedule = angular.module("pgSchedule", []);

pgSchedule.controller("mainController", ["$scope", "$http", "$log", "$interval", function($scope, $http, $log, $interval){
	$scope.timeUntil = "";
	$scope.currentDay = "";
  $scope.currentBlock = "";
	$scope.isDay = true;

	$scope.getIsDay = function(){
		$http.get("/api/currentDay")
		.success(function(data){
			if(data===""){
				$scope.isDay = false;
			} else {
				$scope.isDay = true;
			}
		});			
	}

	$scope.getTimeUntil = function(){
		$http.get("/api/timeUntil")
		.success(function(data){
			if(data===-1){
				$scope.timeUntil = " ";
			} else {
				$scope.timeUntil = data;
			}
		});
	}
  $scope.getCurrentBlock = function(){
    $http.get("/api/currentBlock")
    .success(function(data){
      $scope.currentBlock = data;
    });
  }  

	$scope.getCurrentDay = function(){
		$http.get("/api/currentDay/")
		.success(function(data){
			$scope.currentDay = data;
		});
	}
  
  $scope.beautifyTime = function(time){
    var hours = parseInt(time.substring(0,2))%12;
    hours = (hours === 0 ? 12 : hours);
    return hours + time.substring(2,5);
  }
  
	$interval($scope.getIsDay, 1000);
  $scope.getCurrentDay(); 
	if($scope.isDay){
    $interval($scope.getCurrentBlock, 1000);
		$interval($scope.getCurrentDay, 3600000);
		$interval($scope.getTimeUntil, 1000);
	}
}]);
