const Sequelize = require('sequelize')
const XsModel = require('./Xs')

const connection = new Sequelize('open-avenues-calculator', 'TABLE', 'PASS', {
  host: 'localhost', dialect: 'mysql'
})

const Xs = XModel(connection, Sequelize)

module.exports = { Xs }
