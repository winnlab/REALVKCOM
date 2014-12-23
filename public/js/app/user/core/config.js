var config = {
	router: {
		base: '/',
		modulesContainer: '#modules',
		modules: [
			{
				name: 'main',
				path: {
					client: 'js/app/user/modules/main/',
					server: ''
				}
			},
			
			{
				name: 'onescreen',
				path: {
					client: 'js/app/user/modules/onescreen/',
					server: ':name'
				}
			},
			
			{
				name: 'news',
				path: {
					client: 'js/app/user/modules/news/',
					server: ':name'
				}
			},
			
			{
				name: 'faq',
				path: {
					client: 'js/app/user/modules/faq/',
					server: ':name'
				}
			},
			
			{
				name: 'cabinet',
				path: {
					client: 'js/app/user/modules/cabinet/',
					server: ':name'
				}
			},
			
			{
				name: 'cost',
				path: {
					client: 'js/app/user/modules/cost/',
					server: ':name'
				}
			}
		],
		defaultModule: 'main'
	}
};

export default config;