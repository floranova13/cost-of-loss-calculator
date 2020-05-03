const Sequelize = require('sequelize')
const signingBonusesModel = require('./signingBonuses')
const jobPostingsModel = require('./jobPostings.js')
const recruiterFeesModel = require('./recruiterFees.js')

const connection = new Sequelize('open_avenues_calculator', 'open_avenues', 'tester', {
  host: 'localhost', dialect: 'mysql'
})

const SigningBonus = signingBonusesModel(connection, Sequelize)
const JobPosting = jobPostingsModel(connection, Sequelize)
const RecruiterFee = recruiterFeesModel(connection, Sequelize)

module.exports = { SigningBonus, JobPosting, RecruiterFee }
