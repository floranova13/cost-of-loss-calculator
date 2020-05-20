const jobPostings = (connection, Sequelize) => {
  return connection.define('jobPostings', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    service: { type: Sequelize.STRING },
    cost: { type: Sequelize.INTEGER },
    notes: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },
  }, { paranoid: true })
}

module.exports = jobPostings
