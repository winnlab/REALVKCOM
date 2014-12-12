import 'can/map/delegate/'
import 'can/map/define/'

import config from 'rConfig'
import Router from 'router'
import helpers from 'helpers'

var Core = can.Control.extend(
	{
		defaults: {
			
		}
	},
	
	{
		init: function() {
			this.window = $(window);
			
			this.main_container = $('#main_container');
			
			this.resize();
		},
		
		'{window} scroll': function(el, ev){
			
		},
		
		'{window} custom_ready': function() {
			$('body').css({
				overflow: 'auto'
			});
			
			$('#preloader').fadeOut(300);
		},
		
		'{window} resize': 'resize',
		
		resize: function() {
			
		},
		
		// custom
		
		
	}
);

new Core(document.body);

new Router(document.body, config.router);