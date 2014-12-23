_ = require 'lodash'
async = require 'async'

Model = require '../../lib/model'
Logger = require '../../lib/logger'
View = require '../../lib/view'

exports.index = (req, res) ->
	View.render 'user/cost/index', res