import 'can/'
import 'can/route/'
import 'can/view/'
import 'can/map/define/'

export default can.Control.extend({
	defaults: {
		css_path: 'css/user/'
	}
}, {
	init: function() {
		this.bindings();
		
		this.window = $(window);
		
		var server = $('#modules').find('.module.server');
		
		this.server = server.length;
		
		this.module_preload = this.element.find('.module_preload');
		this.module_preload.height(this.window.height());
		
		if(this.server) {
			server.children().appendTo(this.element);
			server.remove();
			return this.after_request();
		}
		
		System.import(this.options.css_path + this.options.name + '/index.css!').then(can.proxy(this.request, this));
	},
	
	bindings: function() {
		
	},
	
	request: function() {
		var	str = this.options.path.server,
			strLastChar,
			params = ['name', 'entity_id', 'param2'],
			param,
			that = this,
			reg,
			i;
		
		for(i = params.length; i--;) {
			param = params[i];
			reg = new RegExp(':' + param, 'g');
			str = str.replace(reg, (this.options[param] ? this.options[param] : ''));
		}

		str = str.replace(/\/+(?=\/)/g,''); // remove multiple slashes

		strLastChar = str.length - 1;

		if(str[strLastChar] == '/') {
			str = str.substr(0, strLastChar); // remove ending slash
		}

		can.ajax({
			url: '/' + str + '?ajax=true',
			success: function(data) {
				that.successRequest(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error(errorThrown);
			}
		});
	},
	
	successRequest: function(data) {
		if(data.err) {
			return console.error(err);
		}
		
		var html = jadeTemplate.get('user/' + this.options.name + '/content', data.data);
		
		this.element.append(html);
		
		this.after_request(data.data);
	},
	
	after_request: function(data) {
		this.variables();
		this.plugins();
		this.sizes();
		
		this.after_init(data);
		
		this.module_preload.hide();
		
		if(this.server) {
			this.window.trigger('custom_ready');
		}
	},
	
	after_init: function(data) {
		
	},
	
	variables: function() {

	},

	plugins: function() {

	},

	sizes: function() {

	},
	
	'{window} resize': 'resize',
	
	resize: function() {
		if(!this.element.hasClass('active')) {
			return false;
		}

		this.sizes();
	}
});