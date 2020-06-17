import fetchSigningBonuses from '../actions/signingBonuses'

export const filterSigningBonuses = (list, term) => list.filter(bonus => (
  bonus.company.toLowerCase().includes(term.toLowerCase())
))

export const retrieveSigningBonuses = async () => {
  const signingBonuses = await fetchSigningBonuses()

  return signingBonuses
}
