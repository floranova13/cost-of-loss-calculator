import axios from 'axios'

export default async () => {
  // eslint-disable-next-line no-undef
  const { data } = await axios.get(`${API_BASE_URL}/novels`) // CHANGE TO WHEREVER WE WANT TO GO. I THINK I'LL DO THIS PART, BUT SET UP THE REACT COMPONENTS TO SHOW DATA

  return data
}
