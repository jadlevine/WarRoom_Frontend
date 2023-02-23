import Client from './api'

export const AddNewGame = async (game) => {
  try {
    const res = await Client.post('/games', game)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAllGames = async () => {
  try {
    const res = await Client.get('/games')
    const gameArr = []
    // console.log(res.data)
    for (const game in res.data) {
      console.log(res.data[game])
      gameArr.push(res.data[game])
    }
    // console.log(typeof gameArr)
    return gameArr
  } catch (error) {
    throw error
  }
}
