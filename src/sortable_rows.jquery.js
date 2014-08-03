/*
 *
/*
*/
/* --------------------------------------
 *	Made with jQuery Boilerplate - v3.3.4 by Zeno Rocha
 *	Under MIT License
 *	-------------------------------------
 */

;(function ( $, window, document, undefined ) {
	var pluginName = "sortableRows",
		defaults = {
		sortableSelector: '.sort',
		upLinkTemplate:		'<a href="#">[Up]</a>',
		downLinkTemplate: '<a href="#">[Down]</a>',
		upLinkAttrs : {
			class: 'sortable-row-up'
		},
		downLinkAttrs : {
			class: 'sortable-row-down'
		}
	};

	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend(true, {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {

			this.sortRows();
			this.setRowsValues();
			this.addUpDownLinks(this.element, this.settings);
			this.setupLinks(this.element, this.settings);
		},
		sortRows: function(){
			var plugin = this;
			var settings = plugin.settings;
			var element = plugin.element;
			var rows = plugin.getRows(element);

			rows.sort(function(a,b){
				var _a = plugin.getRowSortableValue(a,settings);
				var _b = plugin.getRowSortableValue(b,settings);

				if(_a < _b ){
					return -1;
				}

				if(_a > _b ){
					return 1;
				}

				return 0;
			});

			$.each(rows, function(index, row) {
				$(element).children('tbody').append(row);
			});

		},

		getRows: function(element){
			return $(element).find('tbody tr').get();
		},

		getRowSortableEl: function(element) {
			return $( element ).find(this.settings.sortableSelector);
		},

		getRowSortableValue: function(element, settings){
			return this.getRowSortableEl(element).val();
		},

		setRowSortableValue: function(element, value) {
			return this.getRowSortableEl(element).val(value);
		},

		setRowsValues: function(){
			var plugin = this;
			var element = plugin.element;
			var rows = plugin.getRows(element);

			$.each(rows, function(index, row) {
				plugin.setRowSortableValue(row, index);
			});
		},

		addUpDownLinks: function(element, settings){
			this.getRowSortableEl(element).after($( settings.upLinkTemplate ).
				attr(settings.upLinkAttrs)
			);
			this.getRowSortableEl(element).after($( settings.downLinkTemplate ).
				attr(settings.downLinkAttrs)
			);
		},

		moveRow: function(element, settings, direction){
			var parentTable = $(element).parents('table');
			var rows = this.getRows(parentTable);

			var rowsLastIdx = rows.length;
			var parentRow = $(element).parents('tr');

			var currentIdx = 0;

			$.each(rows, function(index, row){
				if( row == parentRow[0] ){
					currentIdx = index;
					return;
				}
			});

			if(direction === settings.upLinkAttrs.class){
				$( rows[currentIdx - 1] ).before(parentRow);
			}
			if(direction === settings.downLinkAttrs.class){
				$( rows[currentIdx + 1] ).after(parentRow);
			}
		},

		setupLinks: function(element, settings){
			var plugin = this;
			$(element).on('click','a', function(event){
				var cssClass = $(this).attr('class');
				if (cssClass == settings.upLinkAttrs.class || cssClass == settings.downLinkAttrs.class) {
					plugin.moveRow(this, settings, cssClass);
					plugin.setRowsValues();
					event.preventDefault();
				}
			});
		}

	});
	$.fn[ pluginName ] = function ( options ) {
		this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});

		return this;
	};

})( jQuery, window, document );