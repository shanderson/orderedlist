angular.module('orderedlistExample', [])
.controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {

}])
.directive('list', function() {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      'list': '='
    },
    templateUrl: '.html'
  };
});
