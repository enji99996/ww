let players = [];
let isNightPhase = false;
let werewolfVictim = null;
let dayVictim = null;

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('night-action-button').addEventListener('click', nightAction);
document.getElementById('day-action-button').addEventListener('click', dayAction);
document.getElementById('night-phase-button').addEventListener('click', startNightPhase);
document.getElementById('day-phase-button').addEventListener('click', startDayPhase);

function startGame() {
  players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'];
  // Set random werewolf roles
  let werewolfIndex = Math.floor(Math.random() * players.length);
  let werewolf = players[werewolfIndex];
  displayPlayers();
  document.getElementById('game-status').innerText = `${werewolf} is a Werewolf!`;
  showPhaseOptions();
}

function displayPlayers() {
  const playerListDiv = document.getElementById('players-list');
  playerListDiv.innerHTML = 'Players: ' + players.join(', ');
}

function showPhaseOptions() {
  document.getElementById('actions').style.display = 'block';
}

function startNightPhase() {
  isNightPhase = true;
  document.getElementById('night-phase').style.display = 'block';
  const victimSelect = document.getElementById('werewolf-victim');
  victimSelect.innerHTML = '';
  players.forEach((player, index) => {
    if (player !== players[0]) {
      const option = document.createElement('option');
      option.value = player;
      option.textContent = player;
      victimSelect.appendChild(option);
    }
  });
}

function nightAction() {
  werewolfVictim = document.getElementById('werewolf-victim').value;
  alert(`${werewolfVictim} has been killed by the werewolf!`);
  document.getElementById('night-phase').style.display = 'none';
  startDayPhase();
}

function startDayPhase() {
  isNightPhase = false;
  document.getElementById('day-phase').style.display = 'block';
  const victimSelect = document.getElementById('day-victim');
  victimSelect.innerHTML = '';
  players.forEach(player => {
    if (player !== werewolfVictim) {
      const option = document.createElement('option');
      option.value = player;
      option.textContent = player;
      victimSelect.appendChild(option);
    }
  });
}

function dayAction() {
  dayVictim = document.getElementById('day-victim').value;
  alert(`${dayVictim} has been executed!`);
  // Simulate game over or next round
  // For simplicity, just end the game after the first round
  document.getElementById('game-status').innerText = `Game Over! ${dayVictim} was executed!`;
  resetGame();
}

function resetGame() {
  players = [];
  isNightPhase = false;
  werewolfVictim = null;
  dayVictim = null;
  document.getElementById('actions').style.display = 'none';
  document.getElementById('night-phase').style.display = 'none';
  document.getElementById('day-phase').style.display = 'none';
}
