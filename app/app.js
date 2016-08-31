'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'myApp.home',
        'myApp.register',
        'myApp.management',
        'myApp.tournaments',
        'firebase'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/tournaments'
        });
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBwMGeA7Hh1nDbQ4EpldRhekrIkdRbKszw",
            authDomain: "fintech-84ec8.firebaseapp.com",
            databaseURL: "https://fintech-84ec8.firebaseio.com",
            storageBucket: "fintech-84ec8.appspot.com",
        };
        firebase.initializeApp(config);
    }]);