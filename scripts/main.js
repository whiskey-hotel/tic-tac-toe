let player1;
let player2;

const players = (name, playerType) => {
	const type = playerType;
	const getName = () => name;

	return { getName, type };
};


const gameBoard = (() => {
	//display game i/o here
	const gameboardElement = document.getElementsByClassName("boardSelectionLayout");
	let gameboard = [];

	gameboardElement &&
		Array.from(gameboardElement).forEach((g) => {
			g.addEventListener("click", () => {
				if (gameboard.length % 2 == 0) {
					let player1Input = game.updateChoices(+g.dataset.value, player1.type);
					g.textContent = player1Input;
					gameboard.push(player1.type);
				} else {
					let player2Input = game.updateChoices(+g.dataset.value, player2.type);
					g.textContent = player2Input;
					gameboard.push(player2.type);
				}
			});
		});
})();


const game = (() => {
	const _playerPositions = [null, null, null, null, null, null, null, null, null];
	const updateChoices = (index, playerType) => {
		if (!_playerPositions[index]) {
			_playerPositions[index] = playerType;
			return playerType;
		} else {
			return _playerPositions[index];
		}
	};
	//determine if there are three in a row or a tie
	const play = () => {};

	return { play, updateChoices, _playerPositions };
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
