'use strict';

angular.module('myApp.management', ['ngRoute'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/management', {
        templateUrl: 'management/management.html',
        controller: 'ManagementCtrl',
    });
}])

// Register controller
.controller('ManagementCtrl', [function() {

}]);
