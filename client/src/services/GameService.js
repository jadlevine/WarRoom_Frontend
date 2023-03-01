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
    for (const i in res.data) {
      // console.log(res.data[game])
      gameArr.push(res.data[i])
    }
    // console.log(typeof gameArr)
    return gameArr
  } catch (error) {
    throw error
  }
}

export const GetGame = async (game_id) => {
  try {
    const res = await Client.get(`/games/${game_id}`)
    const game = res.data
    let countryArr = []
    for (const i in game.countries) {
      countryArr.push(game.countries[i])
    }
    game.countries = countryArr
    return game
  } catch (error) {
    throw error
  }
}

export const UpdateGame = async (gameRequest) => {
  try {
    const res = await Client.put(`/games/update`, gameRequest)
  } catch (error) {
    throw error
  }
}
