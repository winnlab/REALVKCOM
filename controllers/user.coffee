express = require 'express'

Main = require './user/main'
OneScreen = require './user/onescreen'
News = require './user/news'
FAQ = require './user/faq'
Cabinet = require './user/cabinet'

Router = express.Router()

#

Router.get '/', Main.index

#

Router.get '/onescreen', OneScreen.index

#

Router.get '/cabinet', Cabinet.index

#

Router.get '/news', News.index

#

Router.get '/faq', FAQ.index

#

Router.post '/send_question', FAQ.send

#

exports.Router = Router