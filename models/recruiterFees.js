export default (connection, Sequelize) => connection.define('recruiterFees', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  discipline: { type: Sequelize.STRING },
  fee: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('fee') / 100
    },
    set(value) {
      this.setDataValue('fee', value * 100)
    },
  },
  salary: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('salary') / 100
    },
    set(value) {
      return this.setDataValue('salary', value * 100)
    },
  },
  percent: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${Math.ceil((this.fee / this.salary) * 100)}%`
    },
  },
}, { paranoid: true })
