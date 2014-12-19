import Controller from 'controller';

import 'validate';

export default Controller.extend(
	{
		defaults: {
			
		}
	}, {
		variables: function() {
			this.classname = 'active';
			
			this.form_processing = 0;
			
			this.items = this.element.find('.item');
			this.form = this.element.find('.faq_form');
		},
		
		after_init: function(data) {
			this.items.filter(':not(.active)').find('.text').hide();
		},
		
		'.item .top_label span click': function(el) {
			var top_label = el.parent(),
				tab_block = top_label.parent(),
				text = top_label.next(),
				func = 'slideDown';
			
			if(tab_block.hasClass(this.classname)) {
				func = 'slideUp';
			}
			
			text.stop(true, false)[func](300);
			
			tab_block.toggleClass(this.classname);
		},
		
		'.faq_form submit': function(el, ev) {
			ev.preventDefault();
			
			if(this.form_processing) {
				return false;
			}
			
			this.question_validate(el);
			
			if(!el.valid()) {
				return false;
			}
			
			this.form_processing = 1;
			
			var	that = this,
				data = el.serialize();
			
			can.ajax({
				url: '/send_question',
				data: data,
				type: 'POST',
				timeout: 3000,
				success: can.proxy(this.success_send_question, this),
				error: can.proxy(this.error_send_question, this)
			});
		},
		
		success_send_question: function(data) {
			this.form_processing = 0;
			
			if(data.err) {
				show_error(data.err);
			}
			
			show_success('Спасибо, Ваш вопрос сохранен!');
			
			this.form.find('input, textarea').val('');
		},
		
		error_send_question: function(jqXHR, textStatus, errorThrown) {
			this.form_processing = 0;
			show_error(errorThrown);
		},
		
		question_validate: function(element){
			var required = 'Это обязательное поле';
			
			element.validate({
				rules: {
					name: {
						required: true,
						maxlength: 128,
						minlength: 2
					},
					email: {
						required: true,
						maxlength: 64,
						minlength: 6,
						email: true
					},
					question: {
						required: true,
						maxlength: 8000,
						minlength: 3
					}
				},
				messages: {
					name: {
						required: required,
						maxlength: 'Максимальное количество символов - 128',
						minlength: 'Минимальное количество символов - 3'
					},
					email: {
						required: required,
						maxlength: 'Максимальное количество символов - 64',
						minlength: 'Минимальное количество символов - 6',
						email: 'Введите корректный e-mail'
					},
					question: {
						required: required,
						maxlength: 'Максимальное количество символов - 8000',
						minlength: 'Минимальное количество символов - 7'
					}
				},
				
				errorPlacement: function(error, el){
					el.next().append(error).animate({
						opacity: "1"
					}, 1000);
				}
			});
		}
    }
);