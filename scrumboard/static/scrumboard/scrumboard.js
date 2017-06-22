        (function(){
            'use strict';

            angular.module('scrumboard.demo',[])
                .controller("ScrumboardController", ['$scope','$http','$log', ScrumboardController]);

            function ScrumboardController($scope, $http,$log){
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

                $scope.data= [];
                $scope.header = {}
                $http.get("/scrumboard/lists/").then(function(response){
                    $scope.data = response.data;
                });


            }
        }());