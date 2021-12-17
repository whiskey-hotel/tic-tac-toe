let player1;
let player2;

const players = (name, playerType) => {
	const getName = () => name;
	const getType = () => playerType;

	return { getName, getType };
};

const gameBoard = (() => {
	const gameboardElement = document.getElementsByClassName("boardSelectionLayout");
	const resetGame = document.getElementById("resetGame");
	const newGame = document.getElementById("newGame");
	let turnTracker = [];

	gameboardElement &&
		Array.from(gameboardElement).forEach((g) => {
			g.addEventListener("click", () => {
				let index = +g.dataset.value;

				if (turnTracker.length % 2 == 0) {
					let player1Input = game.updatePositions(index, player1.getType());
					if (player1Input) {
						g.textContent = player1Input;
						turnTracker.push(player1Input);
						if (turnTracker.length > 4) {
							game.gameOver(player1Input, player1.getName());
						}
					}
				} else {
					let player2Input = game.updatePositions(index, player2.getType());
					if (player2Input) {
						g.textContent = player2Input;
						turnTracker.push(player2Input);
						if (turnTracker.length > 4) {
							game.gameOver(player2Input, player2.getName());
						}
					}
				}
			});
		});

	const reset = () => {
		Array.from(gameboardElement).forEach((g) => {
			g.textContent = "";
		});
		game.reset();
		winnerDisplay.reset();
		turnTracker = [];
	};

	resetGame &&
		resetGame.addEventListener("click", () => {
			reset();
		});

	newGame &&
		newGame.addEventListener("click", () => {
			reset();
			window.location.href = "../html/playerSelection.html";
		});
})();

const game = (() => {
	const _playerPositions = [null, null, null, null, null, null, null, null, null];
	const updatePositions = (index, playerType) => {
		if (!_playerPositions[index]) {
			_playerPositions[index] = playerType;
			return playerType;
		} else {
			return null;
		}
	};

	const reset = () => {
		_playerPositions.forEach((element, i) => {
			_playerPositions[i] = null;
		});
	};

	const gameOver = (type, name) => {
		switch (true) {
			default:
				return null;
			//Horizontal
			case _playerPositions[0] == type && _playerPositions[1] == type && _playerPositions[2] == type:
			case _playerPositions[3] == type && _playerPositions[4] == type && _playerPositions[5] == type:
			case _playerPositions[6] == type && _playerPositions[7] == type && _playerPositions[8] == type:
			//Vertical
			case _playerPositions[0] == type && _playerPositions[3] == type && _playerPositions[6] == type:
			case _playerPositions[1] == type && _playerPositions[4] == type && _playerPositions[7] == type:
			case _playerPositions[2] == type && _playerPositions[5] == type && _playerPositions[8] == type:
			//Diagonal
			case _playerPositions[0] == type && _playerPositions[4] == type && _playerPositions[8] == type:
			case _playerPositions[2] == type && _playerPositions[4] == type && _playerPositions[6] == type:
				winnerDisplay.results(name);
				break;
		}
	};
	return { gameOver, updatePositions, reset };
})();

const winnerDisplay = (() => {
	const winner = document.getElementById("winner");

	const results = (name) => {
		winner.textContent = `${name} is the winner`;
	};

	const reset = () => {
		winner.textContent = "";
	};
	return { results, reset };
})();

const playerInfoDisplay = (() => {
	const singlePlayerModeBtn = document.getElementById("singlePlayerModeBtn");
	const multiPlayerModeBtn = document.getElementById("multiPlayerModeBtn");
	const singleFormSection = document.getElementById("single-form-section");
	const multiFormSection = document.getElementById("multi-form-section");
	const newPlayerForm = document.getElementsByClassName("add-player");
	const singleFormContainer = document.getElementById("single-form-container");
	const multiFormContainer = document.getElementById("multi-form-container");
	const singlePlayerForm = document.getElementById("singlePlayerForm");
	const multiplayerForm = document.getElementById("multiplayerForm");

	const openForm = (formID) => {
		formID.style.display = "flex";
	};

	const closeForm = (formID) => {
		formID.style.display = "none";
	};

	const resetForm = (form) => {
		form.reset();
	};

	const escapeForm = (eTarget, formContainer, formSection, formValues) => {
		if (!formContainer.contains(eTarget)) {
			closeForm(formSection);
			Array.from(formValues).forEach((f) => {
				resetForm(f);
			});
		}
	};

	singlePlayerModeBtn &&
		singlePlayerModeBtn.addEventListener("click", () => {
			openForm(singleFormSection);
		});

	multiPlayerModeBtn &&
		multiPlayerModeBtn.addEventListener("click", () => {
			openForm(multiFormSection);
		});

	singleFormSection &&
		singleFormSection.addEventListener("click", (e) => {
			escapeForm(e.target, singleFormContainer, singleFormSection, newPlayerForm);
		});

	multiFormSection &&
		multiFormSection.addEventListener("click", (e) => {
			escapeForm(e.target, multiFormContainer, multiFormSection, newPlayerForm);
		});

	singlePlayerForm &&
		singlePlayerForm.addEventListener("submit", () => {
			pageState.populateStorage(singlePlayerForm.elements["singlePlayer1"].value, singlePlayerForm.elements["singleInputType"].value, "player1");
			pageState.populateStorage("CPU", "X", "player2");
			singlePlayerForm.reset();
			window.location.href = "../html/gameboard.html";
		});

	multiplayerForm &&
		multiplayerForm.addEventListener("submit", () => {
			pageState.populateStorage(multiplayerForm.elements["multiPlayer1"].value, multiplayerForm.elements["multiInputType1"].value, "player1");
			pageState.populateStorage(multiplayerForm.elements["multiPlayer2"].value, multiplayerForm.elements["multiInputType2"].value, "player2");
			multiplayerForm.reset();
			window.location.href = "../html/gameboard.html";
		});
})();

const pageState = (() => {
	const populateStorage = (objectName, objectType, objectKey) => {
		localStorage.setItem(
			objectKey,
			JSON.stringify({
				name: objectName,
				type: objectType,
			})
		);
	};

	const getStorage = (objectKey) => {
		return JSON.parse(localStorage.getItem(objectKey));
	};

	const deleteStorage = (objectKey) => {
		return localStorage.removeItem(objectKey);
	};

	return { populateStorage, getStorage, deleteStorage };
})();

if (!player1) {
	player1 = players(pageState.getStorage("player1").name, pageState.getStorage("player1").type);
	player2 = players(pageState.getStorage("player2").name, pageState.getStorage("player2").type);
	// pageState.deleteStorage("player1");
	// pageState.deleteStorage("player2");
}
