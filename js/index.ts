
let gameData = {
	selected: false,
	towers: [[],[],[]]
}


function setupClickHandlers() {
	let towers = document.querySelectorAll('.tower')

	towers.forEach(tower => {
		tower.addEventListener('click', _doMove)
	})
}

function _doMove(e: MouseEvent) {
	let tower = e.currentTarget

}

function makeInitialDiscs(qty: number) {
	let discContainer = document.querySelector('#tower-1 .disc-container')

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