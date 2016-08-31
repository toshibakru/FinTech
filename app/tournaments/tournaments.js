'use strict';

angular.module('myApp.tournaments', ['ngRoute', 'firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tournaments', {
        templateUrl: 'tournaments/tournaments.html',
        controller: 'TournamentsCtrl',
    });
}])

// Register controller
.controller('TournamentsCtrl', ['$scope', '$firebaseArray',function($scope, $firebaseArray) {
    
    var ref = new Firebase("https://fintech-84ec8.firebaseio.com/Clubs");
    var firebaseArr = $firebaseArray(ref);
    $scope.Clubs = firebaseArr;
}]);
