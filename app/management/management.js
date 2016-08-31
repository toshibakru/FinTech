'use strict';

angular.module('myApp.management', ['ngRoute', 'firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/management', {
        templateUrl: 'management/management.html',
        controller: 'ManagementCtrl',
    });
}])

// Register controller
.controller('ManagementCtrl', ['$scope','$firebaseArray',function($scope, $firebaseArray) {
    var ref = new Firebase("https://fintech-84ec8.firebaseio.com/Clubs");
    var firebaseArr = $firebaseArray(ref);
    $scope.Clubs = firebaseArr;
    
    $scope.pointsBo = false;
    
    //firebase.database().ref('Clubs').set(['asd','asd','asd']);
    $scope.addTeam = function() {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        var bo = false;
        for (var i = 0; i < $scope.Clubs.length; i++) {
            if ($scope.Clubs[i].Name === $scope.addMe) {
                bo = true;
                break;
            }
        }
        if (!bo) {
            $scope.Clubs.$add({
                Name : $scope.addMe,
                points : 0,
                GD : 0,
            });
            $scope.addMe = "";
        }
        else {
            $scope.errortext = "Команда уже есть в вашей таблице";
        }
    }
    $scope.removeTeam = function(ind) {
        $scope.errortext = "";
        $scope.Clubs.$remove(ind);
    }
}]);
