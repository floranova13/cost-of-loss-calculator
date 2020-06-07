import Sequelize from 'sequelize'
import allConfigs from '../configs/sequelize'
import signingBonusesModel from './signingBonuses'
import jobPostingsModel from './jobPostings'
import recruiterFeesModel from './recruiterFees'
import userInputsModel from './userInputs'
import salariesModel from './salaries'

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const SigningBonuses = signingBonusesModel(connection, Sequelize)
const JobPostings = jobPostingsModel(connection, Sequelize)
const RecruiterFees = recruiterFeesModel(connection, Sequelize)
const UserInputs = userInputsModel(connection, Sequelize)
const Salaries = salariesModel(connection, Sequelize)

export default {
  SigningBonuses, JobPostings, RecruiterFees, UserInputs, Salaries, Op: Sequelize.Op,
}
