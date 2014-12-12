mongoose = require 'mongoose'

module.exports = [
    modelName: 'permission'
    data: [
        _id: 'denied'
        name: 'access_denied'
    ,
        _id: 'dashboard'
        name: 'dashboard'
    ,
        _id: 'users'
        name: 'users'
    ,
        _id: 'roles'
        name: 'roles'
    ,
        _id: 'permisions'
        name: 'permissions'
    ]
,
    modelName: 'role'
    data: [
        _id: 'admin'
        name: 'admin'
        'permissions': [
            'denied'
            'dashboard'
            'users'
            'roles'
            'permisions'
        ]
    ,
        _id: 'user'
        name: 'user'
        permissions: []
    ]
,
    modelName: 'user'
    data: [
        _id: '53b54577f5adc6a9932b1aec'
        username: 'admin'
        email: 'admin@admin.com'
        password: '79e262a81dd19d40ae008f74eb59edce' #passwd1
        role: 'admin'
        status: 1
    ]
]