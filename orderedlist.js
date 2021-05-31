;(function(window, undefined) {
  var orderedlist = function(basearray){
    if (basearray === undefined || !Array.isArray(basearray)) {
      basearray = [];
      console.error('Supplied argument is not an Array object.');
    }
    this.passedArray = basearray;
    this.items = JSON.parse(JSON.stringify(basearray)); // deep copy
    this.masterArray = JSON.parse(JSON.stringify(basearray)); // deep copy
    this.mappedArray = new Array(this.masterArray.keys());
    console.log('this', this);
  };
  orderedlist.prototype.addItem = function(item) {
    this.items.push(item);
    this.masterArray.push(item);
    this.mappedArray.push(this.masterArray.length - 1);
  };
  orderedlist.prototype.resetItems = function() {
    this.items = JSON.parse(JSON.stringify(this.masterArray));
    this.mappedArray = new Array(this.masterArray.keys());
  };
  orderedlist.prototype.bubbleup = function(index) {
    index = parseInt(index);
    if (index <= 0 || index >= this.masterArray.length) return;
    var mover = this.masterArray.indexOf(index);
    var displaced = this.masterArray.indexOf(index - 1);
    var removed = this.items.splice(index, 1);
    this.items.splice(index - 1, 0, removed[0]);
    this.masterArray[mover] = index - 1;
    this.masterArray[displaced] = index;
  };
  orderedlist.prototype.slidedown = function(index) {
    index = parseInt(index);
    if(index >= this.items.length - 1 || index < 0) return;
    var mover = this.masterArray.indexOf(index);
    var displaced = this.masterArray.indexOf(index + 1);
    var removed = this.items.splice(index, 1);
    this.items.splice(index + 1, 0, removed[0]);
    this.masterArray[mover] = index + 1;
    this.masterArray[displaced] = index;
  };
  orderedlist.prototype.moveItem = function(fromIndex, toIndex) {
    fromIndex = parseInt(fromIndex);
    toIndex = parseInt(toIndex);
    if (fromIndex === toIndex) return;
    var source = this.mappedArray.indexOf(fromIndex);
    var destination = this.mappedArray.indexOf(toIndex);
    if (fromIndex < toIndex){
      for(var i=fromIndex+1;i<=toIndex && i<this.items.length;i++) {
        var mover = this.mappedArray.indexOf(i);
        this.mappedArray[mover]--;
      }
      this.mappedArray[source] = toIndex;
    } else {
      for(var i=fromIndex-1;i>=toIndex && i>=0;i--) {
        var mover = this.mappedArray.indexOf(i); //
        this.mappedArray[mover]++;
      }
      this.mappedArray[source] = toIndex;
    }
    var removed = this.items.splice(fromIndex, 1);
    this.items.splice(toIndex, 0, removed[0]);
  };
  orderedlist.prototype.removeItem = function(index) {
    index = parseInt(index);
    var removed = this.items.splice(index, 1);
  };
  window.orderedlist = orderedlist;
})(window);
