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
.controller('ManagementCtrl', ['$scope','$firebaseArray',function($scope, $firebaseObject) {
    var ref = new Firebase("https://fintech-84ec8.firebaseio.com/Clubs");
    var firebaseObj = $firebaseObject(ref);
    $scope.Clubs = firebaseObj;
    /*
    for (var i = 0; i < $scope.Clubs.length; i++) {
        $scope.Clubs[i].competitors = [];
        for (var j = 0; j < $scope.Clubs.length; j++) {
            if (i === j) {
                $scope.Clubs[i].competitors[j] = "-";
                console.log(i,j,'-')
            }
            else {
                $scope.Clubs[i].competitors[j] = "-:-";
                console.log(i,j,'-:-');                
            }
            
        }
    }*/
    $scope.pointsBo = false;
    
    //firebase.database().ref('Clubs').set(['asd','asd','asd']);
    $scope.addTeam = function() {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        var bo = false;
        var mas = [];
        for (var i = 0; i < $scope.Clubs.length; i++) {
            if ($scope.Clubs[i].Name === $scope.addMe) {
                bo = true;
            }
            mas[i] = "-:-";
        }
        mas.push("---");
        if (!bo) {
            $scope.Clubs.$add({
                Name : $scope.addMe,
                points : 0,
                GD : 0,
                competitors : mas,
            });
            $scope.addMe = "";
            for (var i = 0; i < $scope.Clubs.length; i++) {
                mas = $scope.Clubs[i].competitors;
                for (var j = 0; j <= $scope.Clubs.length; j++) {
                    if (!mas[j]) {
                        mas [j] = i === j ? "---" : "-:-" ;   
                    }
                }
                $scope.Clubs[i].competitors = mas;
                $scope.Clubs.$save(i);
            }
            
        }
        else {
            $scope.errortext = "Команда уже есть в вашей таблице";
        }
    }
    
    $scope.addResult = function(i,j) {
        if ($scope.Clubs[i].competitors[j] == "") {
            $scope.Clubs[i].competitors[j] = "-:-";
        }
        else {
            $scope.Clubs[j].competitors[i] = $scope.Clubs[i].competitors[j];
        }
        $scope.Clubs.$save(i);
        $scope.Clubs.$save(j)
    }
    
    $scope.removeTeam = function(ind) {
        $scope.errortext = "";
        $scope.Clubs.$remove(ind);
    }
}]);
