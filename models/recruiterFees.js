export default (connection, Sequelize) => connection.define('recruiterFees', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  discipline: { type: Sequelize.STRING },
  fee: {
    type: Sequelize.INTEGER,
    set(value) {
      return this.setDataValue(value * 100)
    },
  },
  salary: {
    type: Sequelize.INTEGER,
    set(value) {
      return this.setDataValue(value * 100)
    },
  },
  percent: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${Math.ceil((this.fee / this.salary) * 100)}%`
    },
  },
}, { paranoid: true })
