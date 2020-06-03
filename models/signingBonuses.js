export default (connection, Sequelize) => connection.define('signingBonuses', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  company: { type: Sequelize.STRING },
  amount: {
    type: Sequelize.INTEGER,
    set(value) {
      return this.setDataValue(value * 100)
    },
  },
  slug: { type: Sequelize.STRING },
}, { paranoid: true })
