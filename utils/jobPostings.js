import fetchJobPostings from '../actions/jobPostings'

export const filterJobPostings = (list, term) => list.filter(posting => (
  posting.service.toLowerCase().includes(term.toLowerCase())
))

export const retrieveJobPostings = async () => {
  const jobPostings = await fetchJobPostings()

  return jobPostings
}
