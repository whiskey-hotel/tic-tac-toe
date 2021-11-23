const players = (name, playerType) => {
	const _type = playerType;
	const _playerPositions = [null, null, null, null, null, null, null, null, null];
	const getName = () => name;

	const updateChoices = (index) => {
		_playerPositions[index] = _type;
	};

	return { getName, updateChoices };
};

const player1 = players("justin", "X");
const player2 = players("justin's opponent", "O");
