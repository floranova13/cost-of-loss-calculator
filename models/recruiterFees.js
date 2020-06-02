const recruiterFees = (connection, Sequelize) => {
  return connection.define('recruiterFees', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    discipline: { type: Sequelize.STRING },
    amount: { type: Sequelize.INTEGER },
    salary: { type: Sequelize.INTEGER },
  }, { paranoid: true })
}

module.exports = recruiterFees
