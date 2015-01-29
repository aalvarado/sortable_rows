describe("sortableRows", function() {
  var elem;

  beforeEach(function(){
    loadFixtures('example.html');
    elem = $('table.sortable');
  });

  describe('.sortableRows()', function(){
    it("is able to load plugin on table elements", function(){
      $(elem).sortableRows();
      expect($(elem).data('plugin_sortableRows')).not.toBe(null);
    });

    it("sorts on start", function() {
      var first_row_el = 'tbody tr:first input.sort';
      var first_row = $(elem).find( first_row_el );
      expect( first_row.val() ).not.toBe('0');
      $(elem).sortableRows();
      first_row = $(elem).find( first_row_el );
      expect( first_row.val() ).toBe('0');
    });
  });
});
