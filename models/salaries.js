export default (connection, Sequelize) => connection.define('salaries', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: Sequelize.STRING },
  totalSalary: {
    type: Sequelize.INTEGER,
    set(value) {
      return this.setDataValue(value * 100)
    },
  },
  totalBenefits: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${Math.round((this.totalSalary * this.salary) / 100) / 100}%`
    },
  },
}, { paranoid: true })
