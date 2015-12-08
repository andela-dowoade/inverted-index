'use strict';

Array.prototype.unique = function() {
  var newarr = [];
  for (var i = 0, l = this.length; i < l; i++)
    if (newarr.indexOf(this[i]) === -1 && this[i] !== "")
      newarr.push(this[i]);
  return newarr;
};

Array.prototype.intersect = function(array) {
  return this.filter((x) => array.indexOf(x) != -1);
};

var Index = class {


  readFile(path) {
    var content;
    $.ajax({
      dataType: "json",
      async: false,
      url: path,
      success: function(result) {
        content = result;
      }
    });
    return content;
  }


  transformDocuments(original) {
    return original.map((itm) => itm.text.toLowerCase().replace(/[^a-zA-Z\s]/g, "").split(" "));
  }


  getTokens(transformedDocuments) {
    return transformedDocuments.reduce((prev, cur) => prev.concat(cur)).unique();
  }


  createIndex(documents) {
    var index = {};
    var transformedDocuments = this.transformDocuments(this.readFile(documents));
    var tokens = this.getTokens(transformedDocuments);
    tokens.forEach(function(curToken) {
      index[curToken] = [];
      transformedDocuments.forEach(function(curdoc, docindex) {
        if (curdoc.indexOf(curToken) != -1) index[curToken].push(docindex);
      });
    });
    this.index = index;
  }


  searchIndex() {
    var result = [];
    var pos = 0;
    for (var itm of arguments) {
      if (Object.keys(this.index).indexOf(itm) == -1) return [];
      if (pos === 0) {
        result = result.concat(this.index[itm]);
        pos = 1;
      } else {
        result = result.intersect(this.index[itm]);
      }
    }
    return result;
  }

  getIndex() {
    return this.index;
  }


};
