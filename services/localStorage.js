const localStorageKey = 'favoritePokemons'

function getFavoritePokemons() {
  return JSON.parse(localStorage.getItem(localStorageKey))
}

function saveToLocalStorage(pokemon) {
  const pokemons = getFavoritePokemons() || []
  pokemons.push(pokemon)

  const pokemonsJSON = JSON.stringify(pokemons)
  localStorage.setItem(localStorageKey, pokemonsJSON)
}

function checkPokeminIsFavorited(id) {
  const pokemons = getFavoritePokemons() || []
  return pokemons.find(pokemon => pokemon.id == id)
}

function removeFromLocalStorage(id) {
  const pokemons = getFavoritePokemons() || []
  const findPokemon = pokemons.find(pokemon => pokemon.id == id)
  const newPokemons = pokemons.filter(pokemon => pokemon.id != findPokemon.id)
  localStorage.setItem(localStorageKey, JSON.stringify(newPokemons))
}

export const LocalStorage = {
  getFavoritePokemons,
  saveToLocalStorage,
  checkPokeminIsFavorited,
  removeFromLocalStorage
}