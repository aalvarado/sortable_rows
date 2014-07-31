/*
 *  jQuery Boilerplate - v3.3.4
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = "sortableRows",
		defaults = {
		//direction : 'asc',
		//skipHeaders : true,
		sortableSelector: '.sort',
		upLinkTemplate:   '<a href="#">[Up]</a>',
		downLinkTemplate: '<a href="#">[Down]</a>',
		upLinkAttrs : {
			class: 'sortable-row-up'
		},
		downLinkAttrs : {
			class: 'sortable-row-down'
		}
	};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend(true, {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function () {
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.settings).
			//console.log(this.element);

			this.sortRows(this.element, this.settings);
			this.setRowsValues(this.element, this.settings);
			this.addUpDownLinks(this.element, this.settings);
			this.setupLinks(this.element, this.settings);
		},
		sortRows: function(element, settings){
			var plugin = this;
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

		getRowSortableEl: function(element, settings) {
			return $( element ).find(settings.sortableSelector);
		},

		getRowSortableValue: function(element, settings){
			return this.getRowSortableEl(element, settings).val();
		},

		setRowSortableValue: function(element, settings, value) {
			return this.getRowSortableEl(element, settings).val(value);
		},

		setRowsValues: function(element, settings){
			var plugin = this;
			var rows = plugin.getRows(element);

			$.each(rows, function(index, row) {
				plugin.setRowSortableValue(row, settings, index);
			});
		},

		addUpDownLinks: function(element, settings){
			this.getRowSortableEl(element, settings).after($( settings.upLinkTemplate ).
				attr(settings.upLinkAttrs)
			);
			this.getRowSortableEl(element, settings).after($( settings.downLinkTemplate ).
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
					plugin.setRowsValues(plugin.element, settings);
					event.preventDefault();
				}
			});
		}

	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ pluginName ] = function ( options ) {
		this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});

		// chain jQuery functions
		return this;
	};

})( jQuery, window, document );
