import Sequelize from 'sequelize'
import allConfigs from '../configs/sequelize'
import signingBonusesModel from './signingBonuses'
import jobPostingsModel from './jobPostings'
import recruiterFeesModel from './recruiterFees'
import userInputsModel from './userInputs'

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const SigningBonuses = signingBonusesModel(connection, Sequelize)
const JobPostings = jobPostingsModel(connection, Sequelize)
const RecruiterFees = recruiterFeesModel(connection, Sequelize)
const UserInputs = userInputsModel(connection, Sequelize)

export default {
  SigningBonuses, JobPostings, RecruiterFees, UserInputs, Op: Sequelize.Op,
}
