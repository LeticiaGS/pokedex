const pokemonsSection = document.querySelector('.pokemons')

const changePokemonsColors = [
  { originalColor: 'yellow', substituteColor: '#F1B81A' },
  { originalColor: 'blue', substituteColor: '#5C92CB' },
  { originalColor: 'white', substituteColor: '#D0B9B3' },
  { originalColor: 'black', substituteColor: '#202020' },
  { originalColor: 'green', substituteColor: '#5D9242' },
  { originalColor: 'red', substituteColor: 'brown' },
  { originalColor: 'brown', substituteColor: '#684E36' },
  { originalColor: 'purple', substituteColor: '#674D7D' }
]

async function fetchPokemons() {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemonPromises = []

  for (let i = 1; i <= 150; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then(response => response.json())
    )
  }

  Promise.all(pokemonPromises).then(pokemons => {
    pokemons.forEach(pokemon => {
      renderPokemons(pokemon)
    })
  })
}

async function getColorPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  return fetch(url)
}

window.onload = async () => {
  await fetchPokemons()
}

async function renderPokemons(pokemon) {
  const { id, name, sprites, types } = pokemon
  let backgroundColor
  let firstPower = ''
  let secondpower = ''

  await getColorPokemon(id)
    .then(response => {
      return response.json()
    })
    .then(data => {
      backgroundColor = data.color.name
      for (let i = 0; i < changePokemonsColors.length; i++) {
        if (data.color.name.includes(changePokemonsColors[i].originalColor)) {
          backgroundColor = changePokemonsColors[i].substituteColor
        }
      }
    })

  firstPower = types[0].type.name
  types.length > 1 ? (secondpower = types[1].type.name) : (secondpower = '')

  const cardPokemon = document.createElement('div')
  cardPokemon.classList.add('card-pokemon')
  cardPokemon.style.backgroundColor = backgroundColor
  pokemonsSection.appendChild(cardPokemon)
  const itemsCard = document.createElement('div')
  itemsCard.classList.add('items')
  cardPokemon.appendChild(itemsCard)

  const pokemonNameElement = document.createElement('h3')
  pokemonNameElement.textContent = name
  itemsCard.appendChild(pokemonNameElement)

  const firstPowerElement = document.createElement('p')
  firstPowerElement.textContent = firstPower
  firstPowerElement.style.backgroundColor = backgroundColor
  firstPowerElement.classList.add('power')
  itemsCard.appendChild(firstPowerElement)

  const secondpowerElement = document.createElement('p')
  secondpowerElement.textContent = secondpower
  secondpowerElement.style.backgroundColor = backgroundColor
  secondpowerElement.classList.add('power')
  if (secondpower != '') itemsCard.appendChild(secondpowerElement)

  const imgPokemonElement = document.createElement('img')
  imgPokemonElement.src = sprites.other.home.front_shiny
  imgPokemonElement.alt = name
  cardPokemon.appendChild(imgPokemonElement)
}
