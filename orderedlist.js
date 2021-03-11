angular.module('orderedlistExample', [])
.controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.yourName = "Fred Flintstone";
  $scope.names = ["Gunter", "George"];
  $scope.addName = function() {
    $scope.names.push($scope.yourName);
  };
  $scope.moveUpOne = function(index) {
    if (index <= 0) return;
    let removed = $scope.names.splice(index, 1);
    console.log("move up", index, removed[0]);
    $scope.names.splice(index-1, 0, removed[0]);
  };
  $scope.moveDownOne = function(index) {
    if(index>= $scope.names.length-1) return;
    let removed = $scope.names.splice(index, 1);
    console.log("move down", index);
    $scope.names.splice(index+1, 0, removed[0]);
  };
}])
.directive('eoslist', function() {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      'list': '='
    },
    templateUrl: '.html'
  };
});
