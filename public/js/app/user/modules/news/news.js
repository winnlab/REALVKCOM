import Controller from 'controller';
import 'scroller'

export default Controller.extend(
	{
		defaults: {
			
		}
	}, {
		plugins: function() {
			this.element.find('.items_container').mCustomScrollbar({
				scrollInertia: 400,
				scrollButtons: {
					enable: true,
					scrollAmount: 200,
					scrollType: 'stepless'
				}
			});
		},
		
		after_init: function(data) {
			
		}
	}
);