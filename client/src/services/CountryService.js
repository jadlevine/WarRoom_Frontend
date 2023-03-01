import Client from './api'

export const UpdateCountry = async (country) => {
  try {
    // console.log(country.stressLevel)
    const res = await Client.put(`/countries/update`, country)
    // return res.data
  } catch (error) {
    throw error
  }
}
