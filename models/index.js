const Sequelize = require('sequelize')
const allConfigs = require('../configs/sequelize')
const signingBonusesModel = require('./signingBonuses')
const jobPostingsModel = require('./jobPostings.js')
const recruiterFeesModel = require('./recruiterFees.js')
const calculatorEntriesModel = require('./calculatorEntries')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const SigningBonus = signingBonusesModel(connection, Sequelize)
const JobPosting = jobPostingsModel(connection, Sequelize)
const RecruiterFee = recruiterFeesModel(connection, Sequelize)
const calculatorEntry = calculatorEntriesModel(connection, Sequelize)

module.exports = { SigningBonus, JobPosting, RecruiterFee, calculatorEntry }
