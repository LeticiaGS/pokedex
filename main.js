const pokemonsSection = document.querySelector('.pokemons')

const pokemons = [
  {
    id: 1,
    name: 'bulbasaur',
    firstPower: 'Grass',
    secondpower: 'Poison',
    image_path: '../assets/bulbasaur.png',
    backgroundColor: '#5AB85F'
  },
  {
    id: 2,
    name: 'pikachu',
    firstPower: 'Raio',
    secondpower: 'Ashe',
    image_path: '../assets/pikachu.png',
    backgroundColor: '#FFD76F'
  },
  {
    id: 3,
    name: 'charmander',
    firstPower: 'Poder',
    secondpower: 'Outro poder',
    image_path: '../assets/charmander.png',
    backgroundColor: '#FC6C6D'
  },
  {
    id: 4,
    name: 'squirtle',
    firstPower: 'Fast',
    secondpower: 'Cute',
    image_path: '../assets/squitle.png',
    backgroundColor: '#70b6fa'
  }
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
      console.log(data.color.name)
      backgroundColor = data.color.name
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
