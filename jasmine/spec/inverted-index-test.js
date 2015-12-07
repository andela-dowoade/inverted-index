describe("Read book data", function() {
  var contents;

  beforeEach(function() {
    contents = readFileSync('books.json');
  });

  it("file is not empty", function() {
    expect(contents).toBeTruthy();
    expect(contents).toEqual(jasmine.any(Object));
  });
});


describe("Populate index", function() {
  var inverted;

  beforeAll(function() {
    inverted = invertedIndex('books.json');
  });

  it("Index has been created", function() {
    expect(inverted.getIndex()).toBeTruthy();
    expect(inverted.getIndex()).toEqual(jasmine.objectContaining({
      'alice': [0]
    }));
  });

  it("Index contains right tokens", function() {
    expect(inverted.getIndex().alice).toEqual([0]);
    expect(inverted.getIndex().a).toEqual([0, 1]);
  });

});

describe("Search index", function() {
  var inverted;
  beforeAll(function() {
    inverted = invertedIndex('books.json');
  });

  it("file is not empty", function() {
    expect(inverted.searchIndex('alice')).toEqual([0]);
    expect(inverted.searchIndex('bob')).toEqual([]);
    expect(inverted.searchIndex('a')).toEqual([0, 1]);
    expect(inverted.searchIndex('alice', 'a')).toEqual([0]);
  });
});
