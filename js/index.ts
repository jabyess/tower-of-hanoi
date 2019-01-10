let gameData = <any>{
	selected: false,
	towers: [[], [], []],
	activeIndex: null,
	moves: 0
}

function setupClickHandlers() {
	let towers = document.querySelectorAll(".tower")

	towers.forEach(tower => {
		tower.addEventListener("click", handleClick)
	})

	let startButton = document.getElementById("start-button")

	startButton.addEventListener("click", (e: MouseEvent) => {
		e.preventDefault()

		const input = (<HTMLInputElement>document.getElementById("disc-count"))
			.value
		const discCount = parseInt(input, 10)

		if (discCount >= 3 && discCount <= 6) {
			gameData.discCount = discCount
			startGame(discCount)
		}
	})
}

function validateMove(from: Array<HTMLElement>, to: Array<any>) {
	let fromDisc = from[0]

	if (to.length > 0) {
		// validate size of discs
		if (to[0].dataset.size < fromDisc.dataset.size) {
			return true
		} else {
			// no move allowed
			return false
		}
	} else {
		// just move
		return true
	}
}

function _deactivateTower() {
	const activeTower = document.querySelector(
		`[data-index="${gameData.activeIndex}"]`
	)
	activeTower.classList.remove("active")
	gameData.activeIndex = null
}

function _activateTower(index) {
	const activeTower = document.querySelector(`[data-index="${index}"]`)
	activeTower.classList.add("active")
	gameData.activeIndex = index
}

function handleClick(e: any) {
	// get current tower index
	let currentIndex = e.currentTarget.dataset.index

	// if same index, deactivate
	if (gameData.activeIndex === currentIndex) {
		_deactivateTower()
		return
	}

	// if null index, make current click
	else if (gameData.activeIndex === null) {
		gameData.activeIndex = currentIndex
		_activateTower(currentIndex)
	}

	// if active && different index, make move
	else {
		let from = gameData.towers[gameData.activeIndex]
		let to = gameData.towers[currentIndex]

		// validate sizes
		if (validateMove(from, to)) {
			// perform actual move in arrays
			let disc = from.shift()
			gameData.towers[currentIndex].unshift(disc)
			_deactivateTower()

			gameData.moves += 1
			// trigger refresh dom
			syncDiscsToDom()
		} else {
			_deactivateTower()
		}
	}

	if (validateWin()) {
		showWinCondition()
	}
}


function showWinCondition() {
	let winContainer = document.querySelector('.win-container')
	let moves = document.getElementById('move-count')

	winContainer.classList.remove('hidden')
	moves.innerHTML = gameData.moves
}

function showGame() {
	let towerContainer = <HTMLElement>document.querySelector(".tower-container")
	towerContainer.style.display = "flex"
}

function validateWin() {
	let t3 = gameData.towers[2]

	if (t3.length > 0 && t3.length === gameData.discCount) {
		return true
	}
}

function syncDiscsToDom() {
	let towers = document.querySelectorAll(".tower")

	gameData.towers.forEach((discStack, si) => {
		let discContainer = towers[si].querySelector(".disc-container")
		discContainer.innerHTML = ""
		discStack.forEach((s, i) => {
			discContainer.appendChild(s)
		})
	})
}

function hideIntro() {
	let start = document.querySelector(".start-form")
	start.classList.add("hidden")
}

function makeInitialDiscs(qty: number) {
	const discContainer = document.querySelector("#tower-1 .disc-container")

	for (let i = qty; i > 0; i--) {
		let disc = document.createElement("div")
		disc.classList.add("disc")
		disc.setAttribute("data-size", i.toString())
		disc.id = `disc-${i}`
		discContainer.appendChild(disc)
		gameData.towers[0].push(disc)
	}
}

function startGame(discCount: number) {
	showGame()
	hideIntro()
	makeInitialDiscs(discCount)
}

function init() {
	setupClickHandlers()
}

init()
