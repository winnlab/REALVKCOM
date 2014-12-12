async = require 'async'

passport = require 'passport'
localStrategy = require('passport-local').Strategy

mongoose = require 'mongoose'

Model = require '../lib/model'

parameters =
	usernameField: 'username'
	passwordField: 'password'

parameters2 =
	usernameField: 'email'
	passwordField: 'password'

passport.serializeUser (user, done) ->
	done null, user.id

passport.deserializeUser (id, done) ->
	async.parallel
		client: (next) ->
			Model 'Client', 'findOne', next, _id : id
		user: (next) ->
			Model 'User', 'findOne', next, _id : id
	, (err, results) ->
		if err
			return done err

		done null, results.client || results.user

callbackToValidation = (username, password, done, err, user) ->
	validation err, user, password, done

validation = (err, user, password, done) ->
	if err
		return done err
	if not user
		return done null, false, { message: 'Пользователь с таким именем не существует!' }
	if not user.validPassword password
		return done null, false, { message: 'Пароль введен неправильно.' }

	done null, user

adminStrategy = (username, password, done) ->
	Model 'User', 'findOne', 
		async.apply(callbackToValidation, arguments...), {username : username}

userStrategy = (email, password, done) ->
	Model 'Client', 'findOne',
		async.apply(callbackToValidation, arguments...), {email : email}

exports.init = (callback) ->
	adminAuth = new localStrategy adminStrategy
	clientAuth = new localStrategy parameters2, userStrategy

	passport.use 'admin', adminAuth
	passport.use 'user', clientAuth

	callback()