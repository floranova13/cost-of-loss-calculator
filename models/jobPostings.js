export default (connection, Sequelize) => connection.define('jobPostings', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  service: { type: Sequelize.STRING },
  cost: {
    type: Sequelize.INTEGER,
    set(value) {
      return this.setDataValue(value * 100)
    },
  },
  notes: { type: Sequelize.STRING },
  slug: { type: Sequelize.STRING },
}, { paranoid: true })
