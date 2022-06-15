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
  cardPokemon.addEventListener('click', () => renderCardPokemons(pokemon) )
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

async function renderCardPokemons(pokemon) {
  const { id, name, sprites, types } = pokemon
  let backgroundColor
  let firstpower = ''
  let secondpower = ''

  firstpower = types[0].type.name
  types.length > 1 ? (secondpower = types[1].type.name) : (secondpower = '')

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

  console.log(pokemon)
  const overlayElement = document.createElement('div')
  overlayElement.classList.add('overlay')
  pokemonsSection.appendChild(overlayElement)
  overlayElement.addEventListener('click', () => {
    overlayElement.style.display = 'none'
    modalElement.style.display = 'none'
  })

  const modalElement = document.createElement('div')
  modalElement.classList.add('modal')
  modalElement.style.backgroundColor = backgroundColor
  pokemonsSection.appendChild(modalElement)

  const iconsElement = document.createElement('div')
  iconsElement.classList.add('icons')
  modalElement.appendChild(iconsElement)

  const iconHeartElement = document.createElement('img')
  iconHeartElement.src = 'assets/heart-empty.svg'
  iconHeartElement.alt = 'heart empty'
  iconsElement.appendChild(iconHeartElement)

  const iconCloseElement = document.createElement('i')
  iconCloseElement.classList.add('fa-solid')
  iconCloseElement.classList.add('fa-x')
  iconCloseElement.classList.add('fa-2xl')
  iconsElement.appendChild(iconCloseElement)
  iconCloseElement.addEventListener('click', () => {
    overlayElement.style.display = 'none'
    modalElement.style.display = 'none'
  })

  const topInfoElement = document.createElement('div')
  topInfoElement.classList.add('top-info')
  modalElement.appendChild(topInfoElement)

  const descriptionElement = document.createElement('div')
  descriptionElement.classList.add('description')
  topInfoElement.appendChild(descriptionElement)

  const namePokemonElement = document.createElement('h4')
  namePokemonElement.textContent = name
  descriptionElement.appendChild(namePokemonElement)

  const powersElement = document.createElement('div')
  powersElement.classList.add('powers')
  descriptionElement.appendChild(powersElement)

  const firstPower = document.createElement('p')
  firstPower.classList.add('power')
  firstPower.style.backgroundColor = backgroundColor
  firstPower.textContent = firstpower
  powersElement.appendChild(firstPower)

  const secondPower = document.createElement('p')
  secondPower.classList.add('power')
  secondPower.style.backgroundColor = backgroundColor
  secondPower.textContent = secondpower
  powersElement.appendChild(secondPower)

  const spanDescription = document.createElement('span')
  spanDescription.textContent = '#001'
  topInfoElement.appendChild(spanDescription)

  const imgPokemonElement = document.createElement('img')
  imgPokemonElement.classList.add('pokemon')
  imgPokemonElement.src = sprites.other.home.front_shiny
  imgPokemonElement.alt = name
  modalElement.appendChild(imgPokemonElement)

  const bottomInfoElement = document.createElement('div')
  bottomInfoElement.classList.add('bottom-info')
  modalElement.appendChild(bottomInfoElement)

  const bottomOptionsElement = document.createElement('div')
  bottomOptionsElement.classList.add('options')
  bottomInfoElement.appendChild(bottomOptionsElement)

  const linkAboutElement = document.createElement('a')
  const linkEvolutionElement = document.createElement('a')
  const linkMovesElement = document.createElement('a')
  linkAboutElement.textContent = 'About'
  linkEvolutionElement.textContent = 'Evolution'
  linkMovesElement.textContent = 'Moves'
  bottomOptionsElement.appendChild(linkAboutElement)
  bottomOptionsElement.appendChild(linkEvolutionElement)
  bottomOptionsElement.appendChild(linkMovesElement)

  const line = document.createElement('div')
  line.classList.add('line')
  bottomInfoElement.appendChild(line)

  const firstSectionElement = document.createElement('div')
  firstSectionElement.classList.add('section')
  firstSectionElement.classList.add('first')
  bottomInfoElement.appendChild(firstSectionElement)

  const firstCol = document.createElement('div')
  firstCol.classList.add('col-a')
  firstSectionElement.appendChild(firstCol)

  const speciesLabelElement = document.createElement('p')
  const heightLabelElement = document.createElement('p')
  const weightLabelElement = document.createElement('p')
  const abilitiesLabelElement = document.createElement('p')
  speciesLabelElement.textContent = ' Species'
  heightLabelElement.textContent = 'Height'
  weightLabelElement.textContent = 'Weight'
  abilitiesLabelElement.textContent = 'Abilities'
  firstCol.appendChild(speciesLabelElement)
  firstCol.appendChild(heightLabelElement)
  firstCol.appendChild(weightLabelElement)
  firstCol.appendChild(abilitiesLabelElement)

  const secondCol = document.createElement('div')
  secondCol.classList.add('col-b')

  const speciesInput = document.createElement('p')
  const heightInput = document.createElement('p')
  const weightInput = document.createElement('p')
  const abilitiesInput = document.createElement('p')
  speciesInput.textContent = 'Speed'
  heightInput.textContent = '0.70cm'
  weightInput.textContent = '6.9 kg'
  abilitiesInput.textContent = 'Overgrow, Chirophyl'
  secondCol.appendChild(speciesInput)
  secondCol.appendChild(heightInput)
  secondCol.appendChild(weightInput)
  secondCol.appendChild(abilitiesInput)
  firstSectionElement.appendChild(secondCol)

  const h4Element = document.createElement('h4')
  h4Element.textContent = 'Breeding'
  bottomInfoElement.appendChild(h4Element)

  const secondSection = document.createElement('div')
  secondSection.classList.add('section')
  secondSection.classList.add('second')
  bottomInfoElement.appendChild(secondSection)

  const firstColB = document.createElement('div')
  firstColB.classList.add('col-a')
  secondSection.appendChild(firstColB)

  const genderLabelElement = document.createElement('p')
  const eggGrupsLabelElement = document.createElement('p')
  const eggCycleLabelElement = document.createElement('p')
  genderLabelElement.textContent = 'Gender'
  eggGrupsLabelElement.textContent = 'Egg Groups'
  eggCycleLabelElement.textContent = 'Egg Cycle'
  firstColB.appendChild(genderLabelElement)
  firstColB.appendChild(eggGrupsLabelElement)
  firstColB.appendChild(eggCycleLabelElement)

  const secondColB = document.createElement('div')
  secondColB.classList.add('col-b')
  secondSection.appendChild(secondColB)

  const genderInput = document.createElement('p')
  const eggGrupsInput = document.createElement('p')
  const eggCycleInput = document.createElement('p')
  genderInput.textContent = '87.5% 12.5%'
  eggGrupsInput.textContent = 'Monster'
  eggCycleInput.textContent = 'Grass'
  secondColB.appendChild(genderInput)
  secondColB.appendChild(eggGrupsInput)
  secondColB.appendChild(eggCycleInput)
}
