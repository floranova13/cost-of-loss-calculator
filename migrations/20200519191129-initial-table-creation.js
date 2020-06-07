export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userInputs', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nameFirst: { type: Sequelize.STRING },
      nameLast: { type: Sequelize.STRING },
      periodStart: { type: Sequelize.DATEONLY },
      periodEnd: { type: Sequelize.DATEONLY },
      companyIndustry: { type: Sequelize.STRING },
      occupationalSpecialty: { type: Sequelize.STRING },
      jobTitle: { type: Sequelize.STRING },
      laborCode: { type: Sequelize.INTEGER },
      annualSalary: { type: Sequelize.INTEGER },
      hourlySalary: { type: Sequelize.INTEGER },
      degree: { type: Sequelize.STRING },
      externalCorporateRecruiter: { type: Sequelize.BOOLEAN },
      signOnBonus: { type: Sequelize.BOOLEAN },
      relocationBonus: { type: Sequelize.BOOLEAN },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('jobPostings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      service: { type: Sequelize.STRING },
      cost: { type: Sequelize.INTEGER },
      notes: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('recruiterFees', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      discipline: { type: Sequelize.STRING },
      fee: { type: Sequelize.INTEGER },
      salary: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('signingBonuses', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company: { type: Sequelize.STRING },
      amount: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })

    return queryInterface.createTable('salaries', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING },
      totalSalary: { type: Sequelize.INTEGER },
      benefitsPercent: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('salaries')

    await queryInterface.dropTable('signingBonuses')

    await queryInterface.dropTable('recruiterFees')

    await queryInterface.dropTable('jobPostings')

    return queryInterface.dropTable('userInputs')
  },
}
