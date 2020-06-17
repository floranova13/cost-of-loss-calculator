module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('jobPostings', [
      { service: 'Glassdoor', cost: 49800, notes: 'Based on 1 premium job slot open for 60-days' },
      { service: 'Monster', cost: 39900, notes: '1 post for 60-days (at 1 posting for 60-days)' },
      { service: 'Career Builder', cost: 39800, notes: '1 post for 60-days (at $199/month)' },
      { service: 'Simply Hired', cost: 0, notes: 'Free service' },
      { service: 'LinkedIn', cost: 99000, notes: '1 post for 60-days (at $495/month)' },
      { service: 'Dice', cost: 39500, notes: 'per post price (no time limit)' },
      { service: 'SnagAJob', cost: 17800, notes: '1 post for 60-days (at $89/month)' },
      { service: 'Craigslist', cost: 4500, notes: 'per post price (no time limit)' },
      { service: 'Indeed', cost: 30000, notes: '$5/day for 60 days for a sponsored posting' },
      { service: 'Workable', cost: 19800, notes: '$99/month for 60-days' },
      { service: 'Proven', cost: 20300, notes: '$99/month for 60-days plus a $5 fee' },
      { service: 'ZipRecruiter', cost: 17800, notes: '$89/month for 60-days' },
      { service: 'Job.com', cost: 39800, notes: '1 post for 60-days (at $199/month)' },
    ])

    await queryInterface.bulkInsert('recruiterFees', [
      { discipline: 'Finance and Banking', fee: 3392200, salary: 16625000 },
      { discipline: 'Scientific', fee: 2927000, salary: 12746600 },
      { discipline: 'Engineering', fee: 2452100, salary: 10583100 },
      { discipline: 'IT/Information Systems/Data Processing', fee: 2195600, salary: 9843700 },
      { discipline: 'Sales and Marketing', fee: 2171800, salary: 10148500 },
    ])

    await queryInterface.bulkInsert('signingBonuses', [
      { company: 'Facebook', amount: 4570800 },
      { company: 'Amazon', amount: 4134000 },
      { company: 'Pinterest', amount: 3337600 },
      { company: 'Dropbox', amount: 3283300 },
      { company: 'Twitter', amount: 2614400 },
      { company: 'Salesforce', amount: 2831400 },
      { company: 'Fitbit', amount: 2545900 },
      { company: 'Google', amount: 2754700 },
      { company: 'Apple', amount: 2720100 },
      { company: 'Airbnb', amount: 2325000 },
      { company: 'Snap', amount: 2370500 },
      { company: 'Vmware', amount: 1885100 },
      { company: 'LinkedIn', amount: 2541800 },
      { company: 'Microsoft', amount: 2019100 },
      { company: 'Pandora', amount: 1888600 },
      { company: 'Square', amount: 1799600 },
      { company: 'Arista Network', amount: 1865200 },
      { company: 'Spotify', amount: 2249200 },
      { company: 'Tesla Motors', amount: 1944700 },
      { company: 'Capital One', amount: 856800 },
      { company: 'Hewlett Packard Enterprise', amount: 826500 },
      { company: 'Oculus VR', amount: 692600 },
      { company: 'Uber', amount: 180700 },
      { company: 'Netflix', amount: 252000 },
      { company: 'CSRA', amount: 118600 },
      { company: 'UnitedHealth Group', amount: 11800 },
    ])

    return queryInterface.bulkInsert('salaries', [
      { title: 'Corporate Recruiter', totalSalary: 3241, benefitsPercent: 35 },
      { title: 'Director of Engineering (Hiring Manager)', totalSalary: 8433, benefitsPercent: 35 },
      { title: 'IT Technician', totalSalary: 2179, benefitsPercent: 35 },
      { title: 'Human Resources Manager', totalSalary: 4079, benefitsPercent: 35 },
      { title: 'CEO, Executives/Decision-Maker', totalSalary: 8414, benefitsPercent: 35 },
      { title: 'Peer Worker (Estimated 3 people)', totalSalary: 4808, benefitsPercent: 35 },
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
