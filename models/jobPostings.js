export default (connection, Sequelize) => connection.define('jobPostings', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  service: { type: Sequelize.STRING },
  cost: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('cost') / 100
    },
    set(value) {
      this.setDataValue('cost', value * 100)
    },
  },
  notes: { type: Sequelize.STRING },
}, { paranoid: true })
