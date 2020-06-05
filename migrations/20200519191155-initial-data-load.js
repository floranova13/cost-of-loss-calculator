module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('userInputs', [

    ])

    await queryInterface.bulkInsert('jobPostings', [

    ])

    await queryInterface.bulkInsert('recruiterFees', [

    ])

    await queryInterface.bulkInsert('signingBonuses', [

    ])

    await queryInterface.bulkInsert('salaries', [

    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('salaries')

    await queryInterface.bulkDelete('signingBonuses')

    await queryInterface.bulkDelete('jobPostings')

    await queryInterface.bulkDelete('recruiterFees')

    return queryInterface.bulkDelete('userInputs')
  },
}
