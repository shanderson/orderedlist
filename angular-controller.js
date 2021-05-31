angular.module('orderedlistExample', [])
.controller('Controller', ['$scope', '$timeout','$document', function($scope, $timeout,$document) {
  $scope.yourName = "Fred";
  $scope.names = new orderedlist(["Harold", "Gunter", "Tom", "George"]);
  $scope.addName = function() {
    $scope.names.addItem($scope.yourName);
  };
  $scope.resetList = function() {
    $scope.names.resetItems();
  };
  $scope.moveUpOne = function(index) { console.log('moveUpOne', index, $scope.mappedArray);
    $scope.names.bubbleup(index);
  };
  $scope.moveDownOne = function(index) {console.log('moveDownOne', index, $scope.mappedArray);
    $scope.names.slidedown(index);
  };
  $scope.insertAndAdjust = function(fromItem, toItem){
    $scope.names.moveItem(fromItem, toItem);
    if(!$scope.$$phase) {
      $scope.$digest();
    }
  };
  $scope.deleteItem = function(index){
    $scope.names.removeItem(index);
  };
  $scope.dragged;
  $scope.dragfun = function( event ) {};
  $scope.dragstartfun = function( event ) {
    console.log('start', event);
      // store a ref. on the dragged elem
      $scope.dragged = event.target.dataset.indexNumber;
      // make it half transparent
      event.target.style.opacity = .5;
  };
  $scope.dragendfun = function( event ) {
      // reset the transparency
      event.target.style.opacity = "";
  };
  $scope.dragoverfun = function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  };
  $scope.dragenterfun = function( event ) {
    //console.log('enter', event);
      // highlight potential drop target when the draggable element enters it
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "purple";
      }
  };
  $scope.dragleavefun = function( event ) {
    //console.log('leave', event);
      // reset background of potential drop target when the draggable element leaves it
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "";
      }
  };
  $scope.dropfun = function( event ) {
    console.log('drop', event);
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if ( event.target.className.indexOf("dropzone") > -1  || event.target.className.indexOf("draggablecontainer") > -1) {
          event.target.style.background = "";
          $scope.insertAndAdjust($scope.dragged, event.target.dataset.indexNumber);
          //$scope.dragged.parentNode.removeChild( $scope.dragged );
          //event.target.appendChild( $scope.dragged );
      }
  };
  /* events fired on the draggable target */
  $document[0].addEventListener("drag", $scope.dragfun, false);
  $document[0].addEventListener("dragstart", $scope.dragstartfun, false);
  $document[0].addEventListener("dragend", $scope.dragendfun, false);
  /* events fired on the drop targets */
  $document[0].addEventListener("dragover", $scope.dragoverfun, false);
  $document[0].addEventListener("dragenter", $scope.dragenterfun, false);
  $document[0].addEventListener("dragleave", $scope.dragleavefun, false);
  $document[0].addEventListener("drop", $scope.dropfun, false);
}]);
