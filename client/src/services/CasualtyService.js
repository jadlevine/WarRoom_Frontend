import Client from './api'

export const AddNewCasualty = async (unitType, countryId, roundOccurred) => {
  try {
    const reqBody = { unitType, roundOccurred }
    const res = await Client.post(`/countries/${countryId}/casualties`, reqBody)
    console.log(res)
    console.log(res.data)
    // return res.data
  } catch (error) {
    throw error
  }
}
