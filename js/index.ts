
let gameData = {
	selected: false,
	towers: [[],[],[]],
	activeIndex: null
}


function setupClickHandlers() {
	let towers = document.querySelectorAll('.tower')

	towers.forEach(tower => {
		tower.addEventListener('click', _doMove)
	})
}

function _validateMove(from: Array<HTMLElement>, to: Array<any>) {
	let fromDisc = from[0]

	if(to.length > 0) {
		// validate size of discs
		if(to[0].dataset.size < fromDisc.dataset.size) {
			console.log('disc can be moved, smaller')
			return true
		}
		else {
			// no move allowed
			console.warn('cannot move', to[0].dataset.size, 'larger than', fromDisc.dataset.size)
			return false
		}
	}
	else {
		// just move
		console.log('no conflict, moving')
		return true
	}
}

function _deactivate() {
	const activeTower = document.querySelector(`[data-index="${gameData.activeIndex}"]`)
	activeTower.classList.remove('active')
	gameData.activeIndex = null
	
}

function _activate(index) {
	const activeTower = document.querySelector(`[data-index="${index}"]`)
	activeTower.classList.add('active')
	gameData.activeIndex = index
}

function _doMove(e: Event) {
	// get current tower index
	let currentIndex = e.currentTarget.dataset.index
	
	// if same index, deactivate
	if(gameData.activeIndex === currentIndex) {
		_deactivate()
		return
	}

	// if null index, make current click
	else if(gameData.activeIndex === null) {
		gameData.activeIndex = currentIndex
		_activate(currentIndex)
	}

	
	// if active && different index, make move
	else {
		let from = gameData.towers[gameData.activeIndex]
		let to = gameData.towers[currentIndex]

		// validate size
		if(_validateMove(from, to)) {
			let disc = from.shift()
			gameData.towers[currentIndex].unshift(disc)
			_deactivate()
			syncDiscsToDom()
		}
		else {
			_deactivate()
		}

	}

	// trigger refresh dom

}

function syncDiscsToDom() {
	let towers = document.querySelectorAll('.tower')
	
	gameData.towers.forEach((discStack, si) => {
		console.log(discStack)
		let discContainer = towers[si].querySelector('.disc-container')
		discContainer.innerHTML = ''
		discStack.forEach((s, i) => {
			discContainer.appendChild(s)
		})
	})
}

function makeInitialDiscs(qty: number) {
	const discContainer = document.querySelector('#tower-1 .disc-container')

	for(let i = qty; i > 0; i--) {
		let disc = document.createElement('div')
		disc.classList.add('disc')
		disc.setAttribute('data-size', (i).toString())
		disc.id = `disc-${i}`
		discContainer.appendChild(disc)
		gameData.towers[0].push(disc)
	}
}


function init() {
	setupClickHandlers()
	makeInitialDiscs(5)
}


init()