var pgSchedule = angular.module("pgSchedule", []);

pgSchedule.controller("mainController", function($scope, $http){
	$scope.timeUntil = "";
	$scope.currentDay = "";
	$scope.isDay = true;


	$scope.getIsDay = function(){
		//Sets isDay to false if any one of the API's comes up null
		$http.get("/api/timeUntil")
		.success(function(data){
			if(data===""){
				$scope.isDay = false;
			}
		});
		$http.get("/api/currentDay")
		.success(function(data){
			if(data===""){
				$scope.isDay=false;
			}
		});
	}
	$scope.getTimeUntil = function(){
		$http.get("/api/timeUntil")
		.success(function(data){
			console.log(data);
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
			console.log(data);
		});
	}
	//Looks to see if there is school day every hour
	setInterval($scope.getIsDay(), 3600000);
	//If there is a school day, get the API stuff
	if($scope.isDay){
		setInterval($scope.getCurrentDay(), 20000);
		setInterval($scope.getTimeUntil(), 20000);
	}
});