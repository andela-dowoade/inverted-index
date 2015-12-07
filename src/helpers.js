var readFileSync = function(file) {
  var content;
  $.ajax({
    dataType: "json",
    async: false,
    url: file,
    success: function(result) {
      content=result;
    }
  });
  return content;
}

Array.prototype.unique = function() {
  var newarr = [];
  for (var i = 0, l = this.length; i < l; i++)
    if (newarr.indexOf(this[i]) === -1 && this[i] !== '')
      newarr.push(this[i]);
  return newarr;
}

Array.prototype.intersect = function(array) {
  return this.filter((x) => array.indexOf(x) != -1);
}
