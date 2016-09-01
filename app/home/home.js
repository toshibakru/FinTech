'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', '$location', '$firebaseAuth', '$rootScope', function($scope, $location, $firebaseAuth, $rootScope) {
    $scope.user = {};
    $scope.SignIn = function(e) {
        //e.preventDefault();
        //var username = $scope.user.email;
        //var password = $scope.user.password;
        $rootScope.authBo = true;
        $location.path('/management');
        /*firebase.auth().signInWithEmailAndPassword(username, password).then(function(value){
            console.log("Вы вошли успешно");
            $rootScope.auth = true;
            
            $scope.$apply(function() {
                $location.path('/management');
            });
        }, function(error){
            console.log("ошибка");
            console.log(error);
        });*/
    }
}]);