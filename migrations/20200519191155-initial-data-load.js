module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('calculatorEntries', [

    ])

    await queryInterface.bulkInsert('jobPostings', [

    ])

    await queryInterface.bulkInsert('recruiterFees', [

    ])

    await queryInterface.bulkInsert('signingBonuses', [

    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('signingBonuses')

    await queryInterface.bulkDelete('jobPostings')

    await queryInterface.bulkDelete('recruiterFees')

    return queryInterface.bulkDelete('calculatorEntries')
  }
}
