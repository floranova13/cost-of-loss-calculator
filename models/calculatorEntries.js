const calculatorEntries = (connection, Sequelize) => {
  return connection.define('calculatorEntries', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nameFirst: { type: Sequelize.STRING },
    nameLast: { type: Sequelize.STRING },
    periodStart: { type: Sequelize.DATEONLY },
    periodEnd: { type: Sequelize.DATEONLY },
    occupationalSpecialty: { type: Sequelize.STRING },
    jobTitle: { type: Sequelize.STRING },
    laborCode: { type: Sequelize.INTEGER },
    annualSalary: { type: Sequelize.INTEGER },
    hourlySalary: { type: Sequelize.INTEGER },
    degree: { type: Sequelize.STRING },
    externalCorporateRecruiter: { type: Sequelize.BOOLEAN },
    signOnBonus: { type: Sequelize.BOOLEAN },
    relocationBonus: { type: Sequelize.BOOLEAN },
  }, { paranoid: true })
}

module.exports = calculatorEntries
