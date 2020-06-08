export default (connection, Sequelize) => connection.define('signingBonuses', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  company: { type: Sequelize.STRING },
  amount: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('amount') / 100
    },
    set(value) {
      this.setDataValue('amount', value * 100)
    },
  },
}, { paranoid: true })
