Template = require '../lib/modelTemplate'

module.exports = new Template 'Question',
	name:
		type: String
	
	email:
		type: String
	
	question:
		type: String