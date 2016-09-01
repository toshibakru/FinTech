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
.controller('ManagementCtrl', ['$scope','$firebaseArray', 'orderByFilter', function($scope, $firebaseObject, orderBy) {
    var ref = new Firebase("https://fintech-84ec8.firebaseio.com/Clubs");
    var firebaseObj = $firebaseObject(ref);
    $scope.Clubs = firebaseObj;
    $scope.Clubs.$loaded()
      .then(function() {
        sortClubs();
      })
    var regExp = /^\d{1,}:\d{1,}$/;
    $scope.pointsBo = false;
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
                W : 0,
                D : 0,
                L : 0,
                GF : 0,
                GA : 0,
                id : $scope.Clubs.length,
            }, sortClubs);
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
            sortClubs();
            
        }
        else {
            $scope.errortext = "Команда уже есть в вашей таблице";
        }
    }
    
    $scope.addResult = function(i,j) {
        if ($scope.Clubs[i].competitors[j] == "") {
            $scope.Clubs[i].competitors[j] = "-:-";
            $scope.Clubs[j].competitors[i] = "-:-";
        }
        else if ($scope.Clubs[i].competitors[j].match(regExp)) {
            var res = $scope.Clubs[i].competitors[j].split(":");
            $scope.Clubs[j].competitors[i] = res[1] + ":" + res[0];
        }
        else {
            $scope.Clubs[j].competitors[i] = "-:-";
            $scope.Clubs[i].competitors[j] = "-:-";
        }
        $scope.Clubs[i].GD = 0; $scope.Clubs[i].GF = 0; $scope.Clubs[i].GA = 0; $scope.Clubs[i].W = 0; $scope.Clubs[i].D = 0; $scope.Clubs[i].L = 0;
        $scope.Clubs[j].GD = 0; $scope.Clubs[j].GF = 0; $scope.Clubs[j].GA = 0; $scope.Clubs[j].W = 0; $scope.Clubs[j].D = 0; $scope.Clubs[j].L = 0;
        $scope.Clubs[i].points = 0;
        $scope.Clubs[j].points = 0;
        for (var k = 0; k < $scope.Clubs[i].competitors.length; k++) {
            var res = $scope.Clubs[i].competitors[k].split(":");
            var secondRes = $scope.Clubs[j].competitors[k].split(":");
            var a = parseInt(res[0]);
            var b = parseInt(res[1]);
            if (res.length === 2 && !isNaN(a) && !isNaN(b)) {
                $scope.Clubs[i].GD += a - b;
                $scope.Clubs[i].GF += a;
                $scope.Clubs[i].GA += b;
                if (a === b) {
                    $scope.Clubs[i].points++;
                    $scope.Clubs[i].D++;
                }
                else if( a > b) {
                    $scope.Clubs[i].points += 3;
                    $scope.Clubs[i].W++;
                }
                else {
                    $scope.Clubs[i].L++;
                }
            }
            var a = parseInt(secondRes[0]);
            var b = parseInt(secondRes[1]);
            if (secondRes.length === 2 && !isNaN(a) && !isNaN(b)) {
                $scope.Clubs[j].GD += a - b;
                $scope.Clubs[j].GF += a;
                $scope.Clubs[j].GA += b;
                if (a === b) {
                    $scope.Clubs[j].points++;
                    $scope.Clubs[j].D++;
                }
                else if( a > b) {
                    $scope.Clubs[j].points += 3;
                    $scope.Clubs[j].W++;
                }
                else {
                    $scope.Clubs[j].L++;
                }
            }
        }
        sortClubs();
    }
    
    $scope.removeTeam = function(ind) {
        $scope.errortext = "";
        $scope.Clubs.$remove(ind);
    }
    var ch = [];
    function sortClubs() {
        
        /*
        for (var i = 0; i < $scope.Clubs.length - 1; i++) {
            for (var j = i +1 ; j < $scope.Clubs.length; j++) {
                if ($scope.Clubs[i].points < $scope.Clubs[j].points) {
                    for (var k = 0; k < $scope.Clubs.length; k++) {
                        var ob = $scope.Clubs[k].competitors[j];
                        $scope.Clubs[k].competitors[j] = $scope.Clubs[k].competitors[i];;
                        $scope.Clubs[k].competitors[i] = ob;
                    }
                    var ob = $scope.Clubs[i];
                    $scope.Clubs[i] = $scope.Clubs[j];
                    $scope.Clubs[j] = ob;
                }
            }
        }*/
        /*
        var mas = [];
        for (var i = 0; i < $scope.Clubs.length; i++) {
            mas[i] = [];
            for (var j = 0; j < $scope.Clubs.length; j++) {
                mas[i][j] = $scope.Clubs[i].competitors[j];
            }
        }
        ch = [];
        var sorted = $scope.Clubs.sort(comp);
        console.log(mas);
        console.log(ch);
        for (var l = 0; l < ch.length; l++) {
            for (var k = 0; k < $scope.Clubs.length; k++) {
                var ob = mas[k][ch[l][0]];
                mas[k][ch[l][0]] = mas[k][ch[l][1]];;
                mas[k][ch[l][1]] = ob;
            }
            for (var k = 0; k < $scope.Clubs.length; k++) {
                var ob = mas[ch[l][0]][k];
                mas[ch[l][0]][k] = mas[ch[l][1]][k];
                mas[ch[l][1]][k] = ob;   
            }
        }
        
        for (var i = 0; i < $scope.Clubs.length; i++) {
            for (var j = 0; j < $scope.Clubs.length; j++) {
                $scope.Clubs[i].competitors[j] = mas[i][j];
            }
        }
        */
        for (var i = 0; i < $scope.Clubs.length; i++) {
            $scope.Clubs.$save(i);
        }
    }
    
    function comp(a,b) {
        if (a.points < b.points) {
            ch.push([a.id, b.id]);
            
            return 1;
        }
        else {
            
            return -1;
        }
    }
}]);
