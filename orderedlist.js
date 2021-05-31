;(function(window, undefined) {
  var superlist = function(basearray){
    if (basearray === undefined || !Array.isArray(basearray)) {
      basearray = [];
      console.error('Supplied argument is not an Array object.');
    }
    this.passedArray = basearray;
    this.items = JSON.parse(JSON.stringify(basearray)); // deep copy
    this.masterArray = JSON.parse(JSON.stringify(basearray)); // deep copy
    this.mappedArray = this.masterArray.keys();
  }
  superlist.protocol.addItem(item) {
    this.items.push(item);
    this.masterArray.push(item);
    this.mappedArray.push(this.masterArray.length - 1);
  }
  superlist.protocol.resetItems = function() {
    this.items = JSON.parse(JSON.stringify(this.masterArray));
    this.mappedArray = this.masterArray.keys();
  }
  superlist.protocol.bubbleup = function(index) {
    index = parseInt(index);
    if (index <= 0 || index >= this.masterArray.length) return;
    var mover = this.masterArray.indexOf(index);
    var displaced = this.masterArray.indexOf(index - 1);
    var removed = this.items.splice(index, 1);
    this.items.splice(index - 1, 0, removed[0]);
    this.masterArray[mover] = index - 1;
    this.masterArray[displaced] = index;
  }
  superlist.protocol.slidedown = function(index) {
    index = parseInt(index);
    if(index >= this.items.length - 1 || index < 0) return;
    var mover = this.masterArray.indexOf(index);
    var displaced = this.masterArray.indexOf(index + 1);
    var removed = this.items.splice(index, 1);
    this.items.splice(index + 1, 0, removed[0]);
    this.masterArray[mover] = index + 1;
    this.masterArray[displaced] = index;
  }
  superlist.protocol.moveItem = function(fromIndex, toIndex) {
    fromIndex = parseInt(fromIndex);
    toIndex = parseInt(toIndex);
    if (fromItem === toItem) return;
    var source = this.mappedArray.indexOf(fromItem);
    var destination = this.mappedArray.indexOf(toItem);
    // console.log('source, dest', source, destination);
    if (fromItem < toItem){
      for(var i=fromItem+1;i<=toItem && i<this.items.length;i++) {
        var mover = this.mappedArray.indexOf(i);
      //   console.log('i, mover, values', i, mover, $scope.mappedArray[mover], $scope.mappedArray[mover]-1);
        this.mappedArray[mover]--;
      }
      this.mappedArray[source] = toItem;
    } else { // 2->1 , 0
      for(var i=fromItem-1;i>=toItem && i>=0;i--) {
        var mover = this.mappedArray.indexOf(i); //
    //     console.log('i, mover, values', i, mover, $scope.mappedArray[mover], $scope.mappedArray[mover]+1);
        this.mappedArray[mover]++;
      }
      this.mappedArray[source] = toItem;
    }
    var removed = this.items.splice(fromItem, 1);
    this.items.splice(toItem, 0, removed[0]);
  }
  superlist.protocol.removeItem = function(index) {
    index = parseInt(index);
    var removed = this.items.splice(index, 1);
  }
  window.superlist = superlist;
})(window);
angular.module('orderedlistExample', [])
.controller('Controller', ['$scope', '$timeout','$document', function($scope, $timeout,$document) {
  $scope.yourName = "Fred Flintstone";
  $scope.names = new superlist(["Gunter", "George"]);
  // $scope.masterArray = JSON.parse(JSON.stringify($scope.names)); // deep copy
  // $scope.mappedArray = Array.from($scope.masterArray.keys());
  $scope.addName = function() {
    $scope.names.addItem($scope.yourName);
  //   $scope.names.push($scope.yourName);
  //   $scope.masterArray.push($scope.yourName);
  //   $scope.mappedArray.push($scope.masterArray.length-1);
  };
  $scope.resetList = function() {
    $scope.names.resetItems();
  //   $scope.names = JSON.parse(JSON.stringify($scope.masterArray));
  //   $scope.mappedArray = Array.from($scope.masterArray.keys());
  //   if(!$scope.$$phase) {
  //     $scope.$digest();
  //   }
  };
  $scope.moveUpOne = function(index) { console.log('moveUpOne', index, $scope.mappedArray);
    $scope.names.bubbleup(index);
  //   index = parseInt(index);
  //   if (index <= 0) return;
  //   let mover = $scope.mappedArray.indexOf(index);
  //   let displaced = $scope.mappedArray.indexOf(index-1); console.log('mover, displaced', mover, displaced);
  //   let removed = $scope.names.splice(index, 1);
  //   $scope.names.splice(index-1, 0, removed[0]);
  //   $scope.mappedArray[mover] = index-1;
  //   $scope.mappedArray[displaced] = index;
  //   console.log("moveUpOne", removed[0], $scope.mappedArray);
  };
  $scope.moveDownOne = function(index) {console.log('moveDownOne', index, $scope.mappedArray);
    $scope.names.slidedown(index);
  //   index = parseInt(index);
  //   if(index>= $scope.names.length-1) return;
  //   let mover = $scope.mappedArray.indexOf(index);
  //   let displaced = $scope.mappedArray.indexOf(index+1); console.log('mover, displaced', mover, displaced);
  //   let removed = $scope.names.splice(index, 1);
  //   $scope.names.splice(index+1, 0, removed[0]);
  //   $scope.mappedArray[mover] = index+1;
  //   $scope.mappedArray[displaced] = index;
  //   console.log("moveDownOne", removed[0], $scope.mappedArray);
  };
  $scope.insertAndAdjust = function(fromItem, toItem){
    $scope.names.moveItem(fromItem, toItem);
  //   //
  //   console.log('insertAndAdjust', fromItem, toItem, $scope.names, $scope.mappedArray);
  //   fromItem = parseInt(fromItem);
  //   toItem = parseInt(toItem);
  //   if (fromItem === toItem) return;
  //   let source = $scope.mappedArray.indexOf(fromItem);
  //   let destination = $scope.mappedArray.indexOf(toItem);
  //   console.log('source, dest', source, destination);
  //   if (fromItem < toItem){
  //     for(let i=fromItem+1;i<=toItem && i<$scope.names.length;i++) {
  //       let mover = $scope.mappedArray.indexOf(i);
  //     //   console.log('i, mover, values', i, mover, $scope.mappedArray[mover], $scope.mappedArray[mover]-1);
  //       $scope.mappedArray[mover]--;
  //     }
  //     $scope.mappedArray[source] = toItem;
  //   } else { // 2->1 , 0
  //     for(let i=fromItem-1;i>=toItem && i>=0;i--) {
  //       let mover = $scope.mappedArray.indexOf(i); //
  //   //     console.log('i, mover, values', i, mover, $scope.mappedArray[mover], $scope.mappedArray[mover]+1);
  //       $scope.mappedArray[mover]++;
  //     }
  //     $scope.mappedArray[source] = toItem;
  //   }
  //   //
  //   let removed = $scope.names.splice(fromItem, 1);
  //   $scope.names.splice(toItem, 0, removed[0]);
    if(!$scope.$$phase) {
      $scope.$digest();
    }
  //   console.log('insertAndAdjust', $scope.names, $scope.mappedArray);
  };
  $scope.deleteItem = function(index){
    index = parseInt(index);
    let removed = $scope.names.splice(index, 1);
    console.log("Delete", index, $scope.mappedArray);
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
      if ( event.target.className.indexOf("dropzone") >-1  || event.target.className.indexOf("draggablecontainer") > -1) {
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
