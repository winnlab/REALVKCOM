_ = require 'lodash'
async = require 'async'

Model = require '../../lib/model'
Logger = require '../../lib/logger'
View = require '../../lib/view'

exports.index = (req, res) ->
	View.render 'user/faq/index', res

exports.send = (req, res) ->
	async.waterfall [
		(next) ->
			Model 'Question', 'create', next, req.body
		(doc, next) ->
			View.ajaxResponse res, null, doc
	], (err) ->
		error = err.message or err
		Logger.log 'info', "Error in controllers/user/faq/send: #{error}"
		View.ajaxResponse res, error