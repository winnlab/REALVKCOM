_ = require 'lodash'
mongoose = require 'mongoose'

Template = (modelName, collectionName, schema) ->
    if _.isObject collectionName
        schema = collectionName
        collectionName = false

    unless _.isObject schema
        throw new Error "modelTemplate did not recieve schema object for model #{modelName}"

    options =
        collection: collectionName or do modelName.toLowerCase

    return mongoose.model modelName, new mongoose.Schema schema, options

module.exports = Template