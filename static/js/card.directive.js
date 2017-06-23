(function(){
    'use strict';

    //calling angular.module with a name only, will retrieve the module object
    angular.module('scrumboard.demo')
        .directive("scrumboardCard", CardDirective);

    function CardDirective(){
        return {
            templateUrl: "/static/html/card.html",
            restrict: "E",
            //E mean the directive will be an html element, A mean the directive will be an attribute of an html element
            controller: ['$scope','$http',function($scope, $http){
                var url = '/scrumboard/cards/' + $scope.card.id + "/";
                $scope.destList = $scope.list;

                $scope.update = function(){
                    $http.put(url, $scope.card);
                };


                function removeCardFromList(card, list){
                    var cards = list.cards;
                     cards.splice(cards.indexOf(card),1);
                }

                $scope.delete = function(){
                    $http.delete(url).then(
                        function(){
                            removeCardFromList($scope.card, $scope.list)
                        }
                    );
                };

                $scope.modelOptions = {
                    debounce: 500
                };

                $scope.move = function() {
                    if ($scope.destList === undefined){
                        return;
                    }
                    $scope.card.list = $scope.destList.id;
                    //here if i use $scope.update(), it wont work, why?? $scope.update() is defined above.
                    $http.put(url, $scope.card).then(function(){
                        removeCardFromList($scope.card, $scope.list);
                        $scope.destList.cards.push($scope.card);
                    });
                };

            }]
        };
    }
})();