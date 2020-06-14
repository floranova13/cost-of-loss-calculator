export default (connection, Sequelize) => connection.define('userInputs', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  nameFirst: { type: Sequelize.STRING },
  nameLast: { type: Sequelize.STRING },
  periodStart: { type: Sequelize.DATEONLY },
  periodEnd: { type: Sequelize.DATEONLY },
  companyIndustry: { type: Sequelize.STRING },
  occupationalSpecialty: { type: Sequelize.STRING },
  jobTitle: { type: Sequelize.STRING },
  laborCode: { type: Sequelize.INTEGER },
  annualSalary: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('annualSalary') / 100
    },
    set(value) {
      this.setDataValue('annualSalary', value * 100)
    },
  },
  hourlySalary: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('hourlySalary') / 100
    },
    set(value) {
      this.setDataValue('hourlySalary', value * 100)
    },
  },
  weeklyWorkHours: { type: Sequelize.INTEGER },
  oesSecCode: { type: Sequelize.STRING },
  degree: { type: Sequelize.STRING },
  externalCorporateRecruiter: { type: Sequelize.BOOLEAN },
  signOnBonus: { type: Sequelize.BOOLEAN },
  relocationBonus: { type: Sequelize.BOOLEAN },
}, { paranoid: true })
