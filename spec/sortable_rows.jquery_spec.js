describe("sortableRows", function() {
  var elem;

  beforeEach(function(){
    loadFixtures('example.html');
    elem = $('table.sortable');
  });

  it("is able to load plugin on table elements", function(){
    $(elem).sortableRows();
    expect($(elem).data('plugin_sortableRows')).not.toBe(null);
  });
});
