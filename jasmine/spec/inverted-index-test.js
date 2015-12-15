'use strict';
describe('Read book data', function() {
  var contents;
  var inverted = new Index();

  beforeEach(function(done) {
    inverted.readFile('books.json').done(function(data) {
      contents = data;
      done();

    });
  });

  it('file is not empty', function(done) {
    expect(contents).toBeTruthy();
    expect(contents).toEqual(jasmine.any(Object));
    expect(contents.length).toEqual(2);
    done();
  });
});


describe('Populate index', function() {
  var inverted = new Index();

  beforeAll(function(done) {
    inverted.createIndex('books.json').then(function() {
      done();
    });
  });

  it('Index has been created', function(done) {
    expect(inverted.getIndex()).toBeTruthy();
    expect(inverted.getIndex()).toEqual(jasmine.objectContaining({
      'alice': [0]
    }));
    done();
  });

  it('Index contains right tokens', function() {
    expect(inverted.getIndex().alice).toEqual([0]);
    expect(inverted.getIndex().a).toEqual([0, 1]);
  });

});

describe('Search index', function() {
  var inverted = new Index();

  beforeAll(function(done) {
    inverted.createIndex('books.json').then(function() {
      done();
    });
  });

  it('Search returns correct results', function() {
    expect(inverted.searchIndex('alice')).toEqual([0]);
    expect(inverted.searchIndex('bob')).toEqual([]);
    expect(inverted.searchIndex('a')).toEqual([0, 1]);
    expect(inverted.searchIndex('alice', 'a')).toEqual([0]);
  });
});
