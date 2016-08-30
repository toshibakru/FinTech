'use strict';

angular.module('myApp.tournaments', ['ngRoute'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tournaments', {
        templateUrl: 'tournaments/tournaments.html',
        controller: 'TournamentsCtrl',
    });
}])

// Register controller
.controller('TournamentsCtrl', [function() {

}]);
