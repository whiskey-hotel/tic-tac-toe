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
	const populateStorage = (object) => {
		localStorage.setItem(`${object}Key`, JSON.stringify(object));
	};

	const getStorage = (object) => {
		object = JSON.parse(localStorage.getItem(`${object}Key`));
	};

	return { populateStorage, getStorage };
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
		const singlePlayer1 = players(singlePlayerForm.elements["singlePlayer1"].value, singlePlayerForm.elements["singleInputType"].value);
		const cpu = players("CPU", "X");
		pageState.populateStorage(singlePlayer1);
		pageState.populateStorage(cpu);
		window.location.href = "../html/gameboard.html";
		console.log(singlePlayer1.getName());
		console.log(cpu.getName());
	});

multiplayerForm &&
	multiplayerForm.addEventListener("submit", () => {
		const multiPlayer1 = players(multiplayerForm.elements["multiPlayer1"].value, multiplayerForm.elements["multiInputType1"].value);
		const multiPlayer2 = players(multiplayerForm.elements["multiPlayer2"].value, multiplayerForm.elements["multiInputType2"].value);
		pageState.populateStorage(multiPlayer1);
		pageState.populateStorage(multiPlayer2);
		window.location.href = "../html/gameboard.html";
		console.log(multiPlayer1.getName());
		console.log(multiPlayer2.getName());
	});

if (localStorage.getItem("multiPlayer1Key")) {
	// pageState.getStorage(multiPlayer1);
	let multiPlayer1 = localStorage.getItem("multiPlayer1Key");
	console.log(multiPlayer1);
}

// 	if (!localStorage.getItem("bgcolor")) {
// 	populateStorage();
// } else {
// 	setStyles();
// }
