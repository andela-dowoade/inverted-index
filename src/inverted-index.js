'use strict';

Array.prototype.unique = function() {
  var newArray = [];
  for (var i = 0, l = this.length; i < l; i++) {
    if (newArray.indexOf(this[i]) === -1 && this[i] !== '') {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

Array.prototype.intersect = function(array) {
  return this.filter((x) => array.indexOf(x) != -1);
};

var Index = class {

  readFile(path) {
    var promise = $.ajax({
      dataType: 'json',
      url: path,
    });
    return promise;
  }

  transformDocuments(original) {
    return original.map((itm) => itm.text.toLowerCase().replace(/[^a-zA-Z\s]/g, '').split(' '));
  }

  getTokens(transformedDocuments) {
    return transformedDocuments.reduce((prev, cur) => prev.concat(cur)).unique();
  }

  createIndex(documents) {
    var index = {};
    var myClass = this;
    return new Promise(function(resolve) {
      myClass.readFile(documents).then(function(readDocument) {
        var transformedDocuments = myClass.transformDocuments(readDocument);
        var tokens = myClass.getTokens(transformedDocuments);

        tokens.forEach(function(curToken) {
          index[curToken] = [];
          transformedDocuments.forEach(function(curDocument, documentIndex) {
            if (curDocument.indexOf(curToken) !== -1) {
              index[curToken].push(documentIndex);
            }
          });
        });

        myClass.index = index;
        resolve(true);
      });
    });
  }

  searchIndex() {
    var result = [];
    var pos = 0;
    for (var itm of arguments) {
      if (Object.keys(this.index).indexOf(itm) === -1) {
        return [];
      }
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
