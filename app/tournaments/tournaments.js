'use strict';

angular.module('myApp.tournaments', ['ngRoute', 'firebase', 'chart.js'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tournaments', {
        templateUrl: 'tournaments/tournaments.html',
        controller: 'TournamentsCtrl',
    });
}])

// Register controller
.controller('TournamentsCtrl', ['$scope', '$firebaseArray', 'orderByFilter', function($scope, $firebaseArray, orderBy) {
    
    var ref = new Firebase("https://fintech-84ec8.firebaseio.com/Clubs");
    var firebaseArr = $firebaseArray(ref);
    $scope.Clubs = firebaseArr;
    
    $scope.Clubs.$loaded()
      .then(function() {
        $scope.labels = [];
        $scope.data = [];
        $scope.pointsLabels = [];
        $scope.pointsData = [];
        $scope.GDdata = [];
        for (var i = 0; i < $scope.Clubs.length; i++) {
            $scope.labels.push($scope.Clubs[i].Name);
            $scope.data.push($scope.Clubs[i].GF);
            
            $scope.pointsLabels.push($scope.Clubs[i].Name);
            $scope.pointsData.push($scope.Clubs[i].points);
            $scope.GDdata.push($scope.Clubs[i].GD);
        }
    });

      
    
    
    function sortClubs() {
        var sortedClubs = orderBy($scope.Clubs, 'points', true);
        for (var i = 0; i < sortedClubs.length; i++) {
            $scope.Clubs[i] = sortedClubs[i];
            $scope.Clubs.$save(sortedClubs[i]);
        }
    }
}]);
