let player1;
let player2;

const players = (name, playerType) => {
	const getName = () => name;
	const getType = () => playerType;

	return { getName, getType };
};

const gameBoard = (() => {
	const gameboardElement = document.getElementsByClassName("boardSelectionLayout");
	let gameboard = [];

	gameboardElement &&
		Array.from(gameboardElement).forEach((g) => {
			g.addEventListener("click", () => {
				if (gameboard.length % 2 == 0) {
					let player1Input = game.updatePositions(+g.dataset.value, player1.getType());
					if (player1Input) {
						g.textContent = player1Input;
						gameboard.push(player1Input);
						if (gameboard.length > 4) {
							console.log(game.gameOver(player1Input));
						}
					}
				} else {
					let player2Input = game.updatePositions(+g.dataset.value, player2.getType());
					if (player2Input) {
						g.textContent = player2Input;
						gameboard.push(player2Input);
						if (gameboard.length > 4) {
							console.log(game.gameOver(player2Input));
						}
					}
				}
			});
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

	const gameOver = (type) => {
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
				return `Three in a row for ${type}`;
		}
	};
	return { gameOver, updatePositions };
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
			window.location.href = "../html/gameboard.html";
		});

	multiplayerForm &&
		multiplayerForm.addEventListener("submit", () => {
			pageState.populateStorage(multiplayerForm.elements["multiPlayer1"].value, multiplayerForm.elements["multiInputType1"].value, "player1");
			pageState.populateStorage(multiplayerForm.elements["multiPlayer2"].value, multiplayerForm.elements["multiInputType2"].value, "player2");
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
