'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth) {
    $scope.user = {};
    $scope.SignIn = function(e) {
        e.preventDefault();
        var username = $scope.user.email;
        var password = $scope.user.password;
        
        firebase.auth().signInWithEmailAndPassword(username, password).then(function(value){
            console.log("Вы вошли успешно");
            console.log($location.path());
            $scope.$apply(function() {
                $location.path('/management');
            });
        }, function(error){
            console.log("ошибка");
            console.log(error);
        });
            /*.catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });*/
    }
}]);