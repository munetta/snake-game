/*
    START GAME
    EXIT GAME
    PAUSE GAME
    UNPAUSE GAME
*/

document.querySelector('#pause').click = function() { 
  pause();
}

document.querySelector('#unpause').click = function(){ 
  unpause();
};

document.querySelector('#start_game').click(function() { 
  start_game();
})

document.querySelector('#exit_game').click(function() { 
  end_game('user decided to click end');
})
