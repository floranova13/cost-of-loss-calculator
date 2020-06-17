import fetchRecruiterFees from '../actions/recruiterFees'

export const filterRecruiterFees = (list, term) => list.filter(fee => (
  fee.discipline.toLowerCase().includes(term.toLowerCase())
))

export const retrieveRecruiterFees = async () => {
  const recruiterFees = await fetchRecruiterFees()

  return recruiterFees
}
