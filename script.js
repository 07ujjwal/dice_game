//selectors.......

const inputForm = document.querySelector("form");
const containerApp = document.querySelector("main");
const containerNav = document.querySelector("nav");
const PlayersSection = document.querySelector(`.player_sections`);

const playerEl = document.querySelectorAll(".player");
const diceEl = document.querySelector(".dice");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const btnCheck = document.getElementById("btn--roll");
const btnHold = document.getElementById("btn--hold");
const btnNew = document.querySelector(".btn--new");
const btnBack = document.querySelector(".btn--back");

// variables.......

let currentScore = 0;
let scores = [0, 0, 0, 0];
let activePlayer = 0;
let previousState = 0;
let game_mode = 2;
let isPlaying = true;

score0El.textContent = 0;
score1El.textContent = 0;

// controller......

const FormListner = (e) => {
  const data = document.getElementsByName("game_type");
  e.preventDefault();
  if (data[0].checked === true) {
    console.log("Duo");
    game_mode = 2;

    btnBackClick(game_mode);

    DisplayGameWindow();
    displayDuo();

    btnCheckEvent(game_mode);
    btnHoldEvent(game_mode);
    btnNew.addEventListener("click", newEvent);
  } else {
    console.log("4");
    game_mode = 4;

    btnBackClick(game_mode);

    DisplayGameWindow();
    displayGang();
    displayMarkupGang(game_mode);

    const score2El = document.getElementById("score--2");
    const score3El = document.getElementById("score--3");

    score2El.textContent = 0;
    score3El.textContent = 0;

    btnCheckEvent(game_mode);
    btnHoldEvent(game_mode);

    btnNew.addEventListener("click", () => {
      score2El.textContent = 0;
      score3El.textContent = 0;
      newEvent();
    });
  }
};

//

inputForm.addEventListener("submit", FormListner, false);

//

// model.......

//

const changePlayer = (level) => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;

  // regenerating the active player veriable...
  // to change the active section...

  if (activePlayer === 0) {
    activePlayer = 1;
  } else if (activePlayer === 1) {
    activePlayer = level === 4 ? 2 : 0;
  } else if (activePlayer === 2 && level === 4) {
    activePlayer = 3;
  } else if (activePlayer === 3 && level === 4) {
    activePlayer = 0;
  }

  // storing the previous state for removal of active section...

  previousState = activePlayer === 0 ? level - 1 : activePlayer - 1;

  // revoval of previously active section.....

  document
    .querySelector(`.player--${previousState}`)
    .classList.remove("player--active");

  // addition of active section to active player..

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
};

//

//

const btnCheckEvent = (level) => {
  const checkEventListner = (e) => {
    e.preventDefault();
    if (isPlaying) {
      //.......generating random Number.....

      const diceNum = Math.trunc(Math.random() * 6) + 1;
      console.log(diceNum);

      // making the dice visible...

      diceEl.classList.remove("hidden");
      diceEl.src = `./img/dice-${diceNum}.png`;

      if (diceNum != 1) {
        currentScore += diceNum;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        changePlayer(level);
      }
    }
  };

  btnCheck.addEventListener("click", checkEventListner);
};

//

//

const btnHoldEvent = (level) => {
  const holdEventListner = () => {
    if (isPlaying) {
      // add the current accumulated score to active player...

      scores[activePlayer] += currentScore;

      //displaying the holded score.....

      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      if (scores[activePlayer] >= 101) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player--active");
        diceEl.classList.add("hidden");
        isPlaying = false;
      } else {
        changePlayer(level);
      }
    }
  };

  btnHold.addEventListener("click", holdEventListner);
};

//console.log(PlayersElArr.length);

const btnBackClick = (level) => {
  btnBack.addEventListener("click", () => {
    newEvent();
    containerNav.classList.remove("hidden");
    containerApp.classList.add("hidden");

    PlayersSection.innerHTML = "";

    console.log(PlayersSection.childNodes.length);

    if (PlayersSection.childNodes.length === 0) {
      resetMarkupDuo();
    }
    document.location.reload();
  });
};

//////
//new event loder....
//////

const newEvent = () => {
  currentScore = 0;
  scores = [0, 0, 0, 0];
  previousState = 0;
  isPlaying = true;
  score0El.textContent = 0;
  score1El.textContent = 0;

  document.getElementById(`current--${activePlayer}`).textContent = 0;

  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains("player--winner")
  ) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
  }

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");

  activePlayer = 0;

  playerEl[0].classList.add("player--active");
};

////
//......view.......
////

const displayDuo = () => {
  PlayersSection.classList.remove("player_sections_4");
  PlayersSection.classList.add("player_sections_2");

  playerEl.forEach((el) => {
    el.classList.remove("player_4");
    el.classList.add("player_2");
  });

  btnCheck.classList.remove("btn--roll--4");
  btnCheck.classList.add("btn--roll--2");

  btnHold.classList.remove("btn--hold--4");
  btnHold.classList.add("btn--hold--2");

  diceEl.classList.remove("dice--4");
  diceEl.classList.add("dice--2");
};

const displayGang = () => {
  PlayersSection.classList.remove("player_sections_2");
  PlayersSection.classList.add("player_sections_4");

  playerEl.forEach((el) => {
    el.classList.remove("player_2");
    el.classList.add("player_4");
  });

  btnCheck.classList.remove("btn--roll--2");
  btnCheck.classList.add("btn--roll--4");

  btnHold.classList.remove("btn--hold--2");
  btnHold.classList.add("btn--hold--4");

  diceEl.classList.remove("dice--2");
  diceEl.classList.add("dice--4");
};

/////

const resetMarkupDuo = (level) => {
  const html = ` <section class="player player_${level} player--0 player--active">
  <h2 class="name" id="name--0">Player-1</h2>
  <p class="score" id="score--0">43</p>

  <div class="current">
    <p class="current-label">Current</p>
    <p class="current-score" id="current--0">0</p>
  </div>
</section>

<section class="player player_${level} player--1">
  <h2 class="name" id="name--1">Player-2</h2>
  <p class="score" id="score--1">24</p>

  <div class="current">
    <p class="current-label">Current</p>
    <p class="current-score" id="current--1">0</p>
  </div>
</section>`;

  PlayersSection.insertAdjacentHTML("afterbegin", html);
};

//

const DisplayGameWindow = () => {
  containerNav.classList.add("hidden");
  containerApp.classList.remove("hidden");
};

//

const displayMarkupGang = (level) => {
  const html = `<section class="palyer player_${level} player--2">
  <h2 class="name" id="name--2">Player-3</h2>
  <p class="score" id="score--2">24</p>

  <div class="current">
    <p class="current-label">Current</p>
    <p class="current-score" id="current--2">0</p>
  </div>
</section>
<section class="player player_${level} player--3">
  <h2 class="name" id="name--3">Player-4</h2>
  <p class="score" id="score--3">24</p>

  <div class="current">
    <p class="current-label">Current</p>
    <p class="current-score" id="current--3">0</p>
  </div>
</section>
`;

  PlayersSection.insertAdjacentHTML("beforeend", html);
};
