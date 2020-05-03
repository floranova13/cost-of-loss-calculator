const signingBonuses = (connection, Sequelize) => {
  return connection.define('signingBonuses', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    company: { type: Sequelize.STRING },
    amount: { type: Sequelize.INTEGER },
    slug: { type: Sequelize.STRING }
  }, { paranoid: true })
}

module.exports = signingBonuses
