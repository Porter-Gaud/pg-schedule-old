var pgSchedule = angular.module("pgSchedule", []);

pgSchedule.controller("mainController", ["$scope", "$http", "$log", "$interval", function($scope, $http, $log, $interval){
	$scope.timeUntil = "";
	$scope.currentDay = "";
	$scope.counter = 0;
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
		$scope.counter += 1;
		$http.get("/api/timeUntil")
		.success(function(data){
			$log.info(data);
			if(data===-1){
				$scope.timeUntil = "No school right now. Too bad.";
			} else {
				$scope.timeUntil = data;
			}
		});

	}

	$scope.getCurrentDay = function(){
		$http.get("/api/currentDay/")
		.success(function(data){
			$scope.currentDay = data;
			$log.info(data);
		});
	}
	$interval($scope.getIsDay, 1000);
	if($scope.isDay){
		$interval($scope.getCurrentDay, 3600000);
		$interval($scope.getTimeUntil, 1000);
	}
}]);
