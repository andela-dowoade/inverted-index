invertedIndex = function(docpath) {
  var inverted = {};

  getDocuments = function(path) {
    return readFileSync(path);
  }

  transformDocuments = function(original) {
    return original.map((itm) => itm['text'].toLowerCase().replace(/[^a-zA-Z\s]/g, '').split(' '));
  }

  getTokens = function(transformedDocuments) {
    return transformedDocuments.reduce((prev, cur) => prev.concat(cur)).unique();
  }

  createIndex = function(documents) {
    var index = {}
    transformedDocuments = transformDocuments(getDocuments(documents));
    tokens = getTokens(transformedDocuments);
    tokens.forEach(function(curToken) {
      index[curToken] = [];
      transformedDocuments.forEach(function(curdoc, docindex) {
        if (curdoc.indexOf(curToken) != -1) index[curToken].push(docindex)
      });
    });
    return index
  }
  inverted = createIndex(docpath);


  return {

    searchIndex: function() {
      var result = []
      var pos = 0;
      for (var itm of arguments) {
        if (Object.keys(inverted).indexOf(itm) == -1) return [];
        if (pos == 0) {
          result = result.concat(inverted[itm]);
          pos = 1;
        } else {
          result = result.intersect(inverted[itm]);
        }
      }
      return result;
    },

    getIndex: function() {
      return inverted;
    }
  }

};




//console.log(invertedIndex('../jasmine/books.json').searchIndex('an'));
