(function() {
  
  const Player = (function() {
     let choice;
     let played = false;
     
      getChoice = () => choice;
      setChoice = (value) => choice = value;
      togglePlayedStatus = () => { 
        played = (played) ? false : true;
      };
      getPlayedStatus = () => played;
      
      return {
        getChoice,
        setChoice,
        togglePlayedStatus,
        getPlayedStatus
      };
  })();
  
  
  const AI = (function() {
    let choice;
    
    const play = function(player, element, end) {

      if (player.getPlayedStatus() && !end) {
        chooseASquare(element);
        player.togglePlayedStatus();
      }
    }
     
    const chooseASquare = (element) => {
      let index;
      do {
        index = Math.floor(Math.random() * 9);
      } while(element[index].textContent);
      element[index].textContent = getChoice();
    };
     
     const getChoice = () => choice;
     
     const setChoice = (player) => {
       choice = (player === 'X') ? 'O' : 'X';
     };
    
    return {play, getChoice, setChoice};
  })();
  
  
  
  const Game = (function(player, ai) {
    const ChoiceMenuContainer = document.querySelector('#first-absolute-container');
    const choiceMenu = document.querySelector('#X-or-O');
    const gameboard = document.querySelectorAll('li');
    const playAgainMenu = document.querySelector('#second-absolute-container');
    const playAgainButton = playAgainMenu.lastElementChild;
    let won = false;
    let arr = [...gameboard];
    
    const init = function() {
      addListeners();
      addGameboardListeners();
      
      
    };
    
    const addListeners = function() {
      choiceMenu.addEventListener('click', (e) => {
        if (e.target.id === 'x' || e.target.id === 'o') {
          
          player.setChoice(e.target.textContent);
          ai.setChoice(player.getChoice());
          won = false;
          
          
          ChoiceMenuContainer.classList.add('hidden');
          
          if (document.querySelector('#first-absolute-container').classList.contains('hidden')){
                  setInterval(checkWinner, 400);
                  setInterval(draw, 400);
          };
        };
      });
    };
    
    const addGameboardListeners = function() {
      gameboard.forEach((element) => {
        element.addEventListener('click', () => {
          if (!element.textContent) {
          element.textContent = player.getChoice();
          player.togglePlayedStatus();
          ai.play(player, gameboard, endgame());
        };
        });
      });
    };
    
    
    playAgainButton.addEventListener('click', () => {
      playAgainMenu.classList.add('hidden');
      ChoiceMenuContainer.classList.remove('hidden');
    });
    
    const checkWinner = function() {
      const checkerArr = arr.map((element) => element.textContent);
          //Horizontal
        if (checkerArr[0] && checkerArr[0] === checkerArr[1] && checkerArr[1] === checkerArr[2]) {
            reset();
            win(player, checkerArr[0]);
            won = true;
        } else if (checkerArr[3] && checkerArr[3] === checkerArr[4] && checkerArr[4] === checkerArr[5]) {
            reset();
            win(player, checkerArr[3]);
            won = true;
        } else if (checkerArr[6] && checkerArr[6] && checkerArr[6] === checkerArr[7] && checkerArr[7] === checkerArr[8]) {
            reset();
            win(player, checkerArr[6]);
            won = true;
          //Vertical
        } else if (checkerArr[0] && checkerArr[0] === checkerArr[3] && checkerArr[3] === checkerArr[6]) {
            reset();
            win(player, checkerArr[0])
            won = true;
        } else if (checkerArr[1] && checkerArr[1] === checkerArr[4] && checkerArr[4] === checkerArr[7]) {
            reset();
            win(player, checkerArr[1]);
            won = true;
        } else if (checkerArr[2] && checkerArr[2] === checkerArr[5] && checkerArr[5] === checkerArr[8]) {
            reset();
            win(player, checkerArr[2]);
            won = true
          //Diagonal
        } else if (checkerArr[0] && checkerArr[0] === checkerArr[4] && checkerArr[4] === checkerArr[8]) {
            reset();
            win(player, checkerArr[0]);
            won = true;
        } else if (checkerArr[2] && checkerArr[2] === checkerArr[4] && checkerArr[4] === checkerArr[6]) {
            reset();
            win(player, checkerArr[2]);
            won = true;
      };
    };
    
    const win = function(player, winner) {
      if (player.getChoice() === winner) {
        document.querySelector('#messenger').textContent = 'You Won';
      } else {
        document.querySelector('#messenger').textContent = 'You Lose';
      };
    };
    
    const draw = function() {
      if (allFilled() && !won) {
        reset();
        document.querySelector('#messenger').textContent = 'DRAW';
      };
    };
    
    const endgame = function() {
      console.log(won)
      if (allFilled() || won) return true;
      return false;
    };
    
    const allFilled = function() {
      for (let index = 0; index < arr.length; index++) {
        if (!arr[index].textContent) return false;
      };
      return true;
    };
    
    const reset = function() {
      playAgainMenu.classList.remove('hidden');
      gameboard.forEach((element) => {
        element.textContent = '';
      });
    };
    
    const isEmpty = function() {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].textContent) return false;
      };
      return true;
    };
    
    return {init};
    
  })(Player, AI);
  
  Game.init();
  
})();
