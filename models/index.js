import Sequelize from 'sequelize'
import allConfigs from '../configs/sequelize'
import signingBonusesModel from './signingBonuses'
import jobPostingsModel from './jobPostings'
import recruiterFeesModel from './recruiterFees'
import calculatorEntriesModel from './calculatorEntries'

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const SigningBonus = signingBonusesModel(connection, Sequelize)
const JobPosting = jobPostingsModel(connection, Sequelize)
const RecruiterFee = recruiterFeesModel(connection, Sequelize)
const calculatorEntry = calculatorEntriesModel(connection, Sequelize)

export default {
  SigningBonus, JobPosting, RecruiterFee, calculatorEntry, Op: Sequelize.Op,
}
