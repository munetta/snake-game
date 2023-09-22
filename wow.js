not done yet
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
<div id = 'grid'></div>
</body>
<script>

let grid = [
  [0,0,0,0,0,0,0,0,0,0], 
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
]; 

let grid_space = [];

let apple_count = 0;

let snake = [{ 
  x: 0, 
  y: 0, 
  direction: 's', 
  type_: 'leading_node', 
  turns: []
}]; 

let level = 0; 

let level_difficulty_apple_amount_percentage = 10; //-= 0.1

let level_difficulty_speed = 600; // -= 6

let in_game = false;

function setup_grid() {

  for(let i = 0; i < grid.length; i++) { 
    for(let j = 0; j < grid[i].length; j++) { 
      let r = Math.floor(Math.random() * level_difficulty_apple_amount_percentage)
      if(r === 4) { 
        grid[i][j] = 2;
        apple_count += 1;
      }
    }
  }

  grid[snake[0].x][snake[0].y] = 1;

  let div_element = `<div style = "border-radius: 50%">`;
  for(let i = 0; i < grid.length; i++) { 
    for(let j = 0; j < grid[i].length; j++) { 
      let color;
      if(grid[i][j] === 1) { 
        color = 'red';
      } else if(grid[i][j] === 2) { 
        color = 'purple'
      } else { 
        color = 'black';
      }                 
      div_element += `<span id = '${i}-${j}' style = 'border-color: 1px solid ${color}; float: left; height: 20px; width: 20px; display: in-line-block; background-color: ${color}'> </span>`;
    }
    div_element += `<br>`; 
  }
  div_element += '</div>';
  document.getElementById('grid').innerHTML = div_element;

}

document.addEventListener('keydown', (event) => {

    let direction_one_conditional_parameter_for_returning_out; 
    let direction_two_conditional_parameter_for_returning_out; 
    let going_in_direction_parameter_for_adding_turn;

    if(event.key ===  'ArrowRight') { 
     direction_one_conditional_parameter_for_returning_out = 'e';
     direction_two_conditional_parameter_for_returning_out = 'w';
     going_in_direction_parameter_for_adding_turn = 'e';
    } else if(event.key ===  'ArrowLeft') { 
     direction_one_conditional_parameter_for_returning_out = 'e';
     direction_two_conditional_parameter_for_returning_out = 'w';
     going_in_direction_parameter_for_adding_turn = 'w';
    } else if(event.key ===  'ArrowUp') { 
     direction_one_conditional_parameter_for_returning_out = 'n';
     direction_two_conditional_parameter_for_returning_out = 's';
     going_in_direction_parameter_for_adding_turn = 'n';
    } else if(event.key === 'ArrowDown') { 
     direction_one_conditional_parameter_for_returning_out = 'n';
     direction_two_conditional_parameter_for_returning_out = 's';
     going_in_direction_parameter_for_adding_turn = 's';
    }

    if(
     snake[0].direction === direction_one_conditional_parameter_for_returning_out || 
     snake[0].direction === direction_two_conditional_parameter_for_returning_out
    ) { 
     return;
    }

    for(let i = 0; i < snake.length; i++) { 
     snake[i].turns.push({ 
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction_for_node_to_turn_in: going_in_direction_parameter_for_adding_turn
     })
    } 
  
});

function move_snake() { 

  if(in_game === false) { 
    return setTimeout(function() { 
      return move_snake()
    }, 1000)
  }

  let add_snake_after_all_has_moved = false;

  for(let i = 0; i < snake.length; i++) {

    grid[snake[i].x][snake[i].y] = 0;
    document.getElementById(`${snake[i].x}-${snake[i].y}`).style.backgroundColor = 'black'; 

    if(
      snake[i].turns.length > 0 && 
      snake[i].x === snake[i].turns[0].turn_at_x_coordinate && 
      snake[i].y === snake[i].turns[0].turn_at_y_coordinate 
    ) { 
      snake[i].direction = snake[i].turns[0].direction_for_node_to_turn_in;
      snake[i].turns.shift();
    }

    if(snake[i].direction === 'n') {
      snake[i].x -= 1;
    } else if(snake[i].direction === 's') { 
      snake[i].x += 1;
    } else if(snake[i].direction === 'e') { 
      snake[i].y += 1;
    } else if(snake[i].direction === 'w') { 
      snake[i].y -= 1;
    }

    if(i === 0 && typeof grid[snake[i].x][snake[i].y] === 'undefined') { 
     return end_game('new snake node off the grid');
    }

    if(i === 0 && grid[snake[i].x][snake[i].y] === 2) { 
      add_snake_after_all_has_moved = true;
    }

    grid[snake[i].x][snake[i].y] = 1;
    document.getElementById(`${snake[i].x}-${snake[i].y}`).style.backgroundColor = 'red';
    document.getElementById(`${snake[i].x}-${snake[i].y}`).innerText = i;

  }

  if(add_snake_after_all_has_moved === true) {

    let last_node = snake[snake.length - 1];

    snake.push({ 
      x: last_node.direction === 'n' ? last_node.x + 1 : last_node.direction === 's' ? last_node.x - 1 : last_node.x,  
      direction: last_node.direction,
      y: last_node.direction === 'e' ? last_node.y - 1 : last_node.direction === 'w' ? last_node.y + 1 : last_node.y, 
      type_: 'trailing_node', 
      turns: [...snake[snake.length - 1].turns] 
    })
  
    if(typeof grid[snake[snake.length - 1].x][snake[snake.length - 1].y] === 'undefined') { 
     return end_game('added snake node off the grid');
    }

    if(snake.length === grid[0].length * grid[0][0].length) { 
      return end_game('won game the grid has been traversed')
    }

    if(snake.length === apple_count) { 
      return end_game('won game found all apples');
    }

    grid[snake[snake.length - 1].x][snake[snake.length - 1].y] = 1;
    document.getElementById(`${snake[snake.length - 1].x}-${snake[snake.length - 1].y}`).style.backgroundColor = 'red';

  }

  for(let i = snake.length - 1; i > 0; i--) { 
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) { 
      return end_game('snake went into itself');
    }
  }

  return setTimeout(function() { 
    return move_snake()
  }, level_difficulty_speed)

}

function end_game(reason) { 
  if(reason === 'snake went into itself') { 
    end_game();
  } else if(reason === 'added snake node off the grid') { 
    end_game();
  } else if(reason === 'new snake node off the grid') { 
    end_game();
  } else if(reason === 'won game snake off grid') {

  } else if(reason === 'won game found all apples') { 
    //below
  } else if(reason === 'won game the grid has been successfully') { 

  }
}

function next_level() { 
  if(in_game) { 
    return;
  }
  in_game = true;
  levels += 1; 
  if(
   levels === 100 && 
   level_difficulty_apple_amount_percentage === 0 && 
   level_difficulty_speed === 0
  ) { 
   return end_game();
  }
  level_difficulty_apple_amount -= 0.1;
  level_difficulty_level_speed -= 6; 
  display_level_data(
    level, 
    level_difficulty_apple_amount, 
    level_difficulty_level_speed
  );
}

function start_game() {
  setup_grid(); 
  move_snake();
}

function pause() { 
  in_game = false;
  document.getElementById('pause_avitar').innerHTML = 'paused'
} 

function unpause() { 
 in_game = true;
 document.getElementById('pause_avitar') = 'playing';
}

function exit_game() { 
  end_game();
} 

function display_level_data() { 
  document.getElementById('level').innerText = a; 
  document.getElementById('parameter_a_increase').innerText = b;
  document.getElementById('parameter_b_increase').innerText = c; 
}

function end_game() { 
 document.getElementById('level').innerText = 'play now'; 
 document.getElementById('parameter_a_increase').innerText = 'play now';
 document.getElementById('parameter_b_increase').innerText = 'play now'; 
 level_difficulty_apple_amount = 10; 
 level_difficulty_level_speed = 600;
 level = 0;
 in_game = false;
}

setup_grid();
move_snake();

</script>
</html>
