import Client from './api'

export const AddNewCasualty = async (unitType, countryId, roundOccurred) => {
  try {
    const reqBody = { unitType, roundOccurred }
    const res = await Client.post(`/countries/${countryId}/casualties`, reqBody)
    // return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteCasualty = async (unitType, countryId) => {
  try {
    const res = await Client.delete(
      `/countries/${countryId}/casualties/${unitType}`
    )
  } catch (error) {
    throw error
  }
}
