window.strip_tags = function(str) {
	return str.replace(/<\/?[^>]+>/gi, '');
};

window.escape = function(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

window.jadeTemplate = {
	viewPath: '/views/',
	savedViewFuncs: [],
	
	get: function(name, data) {
		if(!(typeof(this.savedViewFuncs[name]) != 'undefined' && this.savedViewFuncs[name])) {
			var response = $.ajax({
				url: this.viewPath + name,
				dataType: 'view',
				async: false
			});
			
			this.savedViewFuncs[name] = new Function('return ' + response.responseText)();
		}
		
		return this.savedViewFuncs[name](data);
	}
};

window.requestAnimFrame = (function() {
	return	window.requestAnimationFrame	 || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.oRequestAnimationFrame || 
		window.msRequestAnimationFrame || 
		function(callback, element){
			var timestamp = new Date().getTime();
			window.setTimeout(function() {
				callback(timestamp);
			}, 1000 / 30);
		};
})();

window.notify_param = {
	autoHide: true,
	TimeShown: 3000,
	HorizontalPosition: 'left',
	VerticalPosition: 'bottom',
	ShowOverlay: false
};

window.show_success = function(message) {
	jSuccess(message, window.notify_param);
};

window.show_error = function(message) {
	if(typeof(message) == 'undefined') {
		message = 'Произошла неизвестная ошибка'
	}
	
	jError(message, window.notify_param);
};