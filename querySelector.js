/*
    QUERY LISTENERS FOR
    SETUP GRID / UPDATE GRID DIMENSIONS WITH SNAKE ATTACHED
    START GAME
    EXIT GAME
    PAUSE GAME
    UNPAUSE GAME
    parameter in_game for not running functions while in game
*/

document.querySelector('#pause').click = function() { 
  if(in_game === false) { 
    return;
  }
  paused = true;
  document.querySelector('#pause_avitar').innerText = 'paused'
}

document.querySelector('#unpause').click = function(){ 
  if(in_game === false) { 
    return;
  }
 paused = false;
 document.querySelector('#pause_avitar').innerText = 'playing';
};

document.querySelector('#start_game').click(function() { 
  if(in_game === true) { 
    return;
  }
  start_game();
})

document.querySelector('#setup_grid').click(function() { 
 if(
  !typeof(document.querySelector('#dimensions').value) === 'number' || 
  in_game === true
 ) { 
  return;
 }
 setup_grid(dimensions);
}); 

document.querySelector('#exit_game').click(function() { 
  if(in_game === false) { 
    return;
  }
  end_();
})
