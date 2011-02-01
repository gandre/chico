/**
 *	@class Modal. Create and manage modal windows
 *  @requires: floats.
 *	@return Public Object.
 */

ui.modal = function(conf){

/**
 *  Constructor
 */
	conf.$trigger = $(conf.element);
	conf.closeButton = (conf.name=="modal") ? true : false ;
	conf.classes = 'box';
		
	conf.ajax = ( !conf.hasOwnProperty("ajax") && !conf.hasOwnProperty("content") && !conf.hasOwnProperty("msg") ) ? true : conf.ajax; //Default
/**
 *  Inheritance
 */

	var that = ui.floats(conf); // Inheritance	

/**
 *  Private Members
 */

	// Dimmer 2.0
	// Dimmer object
	var $dimmer = $('<div>')
			.addClass('ch-dimmer')
			.css({height:$(window).height(), display:'block', zIndex:ui.utils.zIndex++})
			.hide();

	// Dimmer Controller
	var dimmer = {
		on: function() { //TODO: posicionar el dimmer con el positioner
			$dimmer
				.appendTo('body')
				.fadeIn();

			if (conf.name=="modal") {
				$dimmer.one("click",hide);
			}
			
		},
		off: function() {
			$dimmer.fadeOut('normal', function(){ 
				$dimmer.detach(); 
			});
		}
	};

	var show = function(event) {
		dimmer.on();
		that.show(event, conf);
		ui.positioner(conf.position);
		$('.ch-modal .btn.ch-close').one('click', hide);
		conf.$trigger.blur();
	};

	var hide = function(event) {
		dimmer.off();
		that.hide(event, conf);
	};

	
/**
 *  Protected Members
 */ 
 
/**
 *  Default event delegation
 */	
	conf.$trigger
		.css('cursor', 'pointer')
		.bind('click', show);

/**
 *  Expose propierties and methods
 */	
	that.publish = {
	
	/**
	 *  @ Public Properties
	 */
    	uid: conf.id,
		element: conf.element,
		type: conf.name,
		content: (conf.content) ? conf.content : ((conf.ajax === true) ? (conf.$trigger.attr('href') || conf.$trigger.parents('form').attr('action')) : conf.ajax ),
	/**
	 *  @ Public Methods
	 */
	 	show: function() {
			show();
			return that.publish;
		},
		hide: function() {
			hide();
			return that.publish;
		},
		position: function(o) {
			return that.position(o,conf) || that.publish;
		}
	};
	
	return that.publish;
};



/**
 *	@Interface Transition
 *	@return An interface object
 

var t = $("div").transition("Aguarde mientras transiosiono");
	t.hide();
 
 */
 
ui.transition = function(conf) {
    
    conf = conf || {};
	
	conf.closeButton = false;
	conf.msg = conf.msg || "Espere por favor...";
	conf.content = "<div class=\"loading\"></div><p>"+conf.msg+"</p>";
	
    return ui.modal(conf);
    
}

ui.factory({ component: 'transition' });
