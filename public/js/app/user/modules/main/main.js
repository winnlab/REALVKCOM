import Controller from 'controller';

export default Controller.extend(
	{
		defaults: {
			
		}
	}, {
		variables: function() {
			this.pages = this.element.find('.page');
			this.page = 1;
			
			this.active = 'active';
		},
		
		after_init: function(data) {
			
		},
		
		'.arrow.left click': 'prev_page',
		
		'.arrow.right click': 'next_page',
		
		prev_page: function() {
			if(this.page == 1) {
				this.page = this.pages.length;
			} else {
				this.page--;
			}
			
			this.set_page();
		},
		
		next_page: function() {
			if(this.page == this.pages.length) {
				this.page = 1;
			} else {
				this.page++;
			}
			
			this.set_page();
		},
		
		set_page: function() {
			this.pages.removeClass(this.active);
			this.pages.filter('.page_' + this.page).addClass(this.active);
		}
    }
);