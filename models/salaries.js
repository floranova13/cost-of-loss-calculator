export default (connection, Sequelize) => connection.define('salaries', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: Sequelize.STRING },
  totalSalary: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('totalSalary') / 100
    },
    set(value) {
      this.setDataValue('totalSalary', value * 100)
    },
  },
  benefitsPercent: { type: Sequelize.INTEGER },
  totalBenefits: {
    type: Sequelize.VIRTUAL,
    get() {
      return Math.round((this.getDataValue('totalSalary') * this.getDataValue('benefitsPercent')) / 100) / 100
    },
  },
}, { paranoid: true })
