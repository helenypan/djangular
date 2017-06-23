        (function(){
            'use strict';

            angular.module('scrumboard.demo',['ngRoute'])
                .controller("ScrumboardController", ['$scope','$http','$location','$log',"Login", ScrumboardController]);

            function ScrumboardController($scope, $http,$location, $log, Login){
                $scope.add = function(list, title){
                    var card = {
                        list: list.id,
                        title:title
                    };
                    $http.post('/scrumboard/cards/', card)
                        .then(function(response){
                            list.cards.push(response.data)
                        },
                        function(){
                            alert("Could not create card");
                        });

                };

                Login.redirectIfNotLoggedIn();

                $scope.logout = Login.logout;

                $scope.data= [];
                $http.get("/scrumboard/lists/").then(function(response){
                    $scope.data = response.data;
                });


            }
        }());