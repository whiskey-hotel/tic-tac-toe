const singlePlayerModeBtn = document.getElementById("singlePlayerModeBtn");
const multiPlayerModeBtn = document.getElementById("multiPlayerModeBtn");
const singleFormSection = document.getElementById("single-form-section");
const multiFormSection = document.getElementById("multi-form-section");
const newPlayerForm = document.getElementsByClassName("add-player");
const formSection = document.getElementsByClassName("form-section");
const formContainer = document.getElementsByClassName("form-container");
const singleFormContainer = document.getElementById("single-form-container");
const multiFormContainer = document.getElementById("multi-form-container");
const singlePlayerForm = document.getElementById("singlePlayerForm");
const multiplayerForm = document.getElementById("multiplayerForm");
const gameboard = document.getElementsByClassName("boardSelectionLayout");
let player1;
let player2;


const players = (name, playerType) => {
	const _type = playerType;
	const _playerPositions = [null, null, null, null, null, null, null, null, null];
	const getName = () => name;

	const updateChoices = (index) => {
		_playerPositions[index] = _type;
	};

	return { getName, updateChoices };
};



const display = (() => {
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

	return { openForm, closeForm, resetForm, escapeForm };
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

	return { populateStorage, getStorage };
})();



const game = (() => {
	const test = () => {
		console.log("test");
	};
	return { test };
})();



singlePlayerModeBtn &&
	singlePlayerModeBtn.addEventListener("click", () => {
		display.openForm(singleFormSection);
	});

multiPlayerModeBtn &&
	multiPlayerModeBtn.addEventListener("click", () => {
		display.openForm(multiFormSection);
	});

singleFormSection &&
	singleFormSection.addEventListener("click", (e) => {
		display.escapeForm(e.target, singleFormContainer, singleFormSection, newPlayerForm);
	});

multiFormSection &&
	multiFormSection.addEventListener("click", (e) => {
		display.escapeForm(e.target, multiFormContainer, multiFormSection, newPlayerForm);
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

gameboard &&
	Array.from(gameboard).forEach((g) => {
		g.addEventListener("click", () => {
			console.log("board-click");
			g.textContent = "X";
		});
	});

if (!player1) {
	player1 = players(pageState.getStorage("player1").name, pageState.getStorage("player1").type);
	player2 = players(pageState.getStorage("player2").name, pageState.getStorage("player2").type);
	localStorage.removeItem("player1");
	localStorage.removeItem("player2");
}


