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

let snake = [{ 
  x: 0, 
  y: 0, 
  direction: 's', 
  type_: 'leading_node', 
  turns: []
}]; 

function setup_grid() {

  for(let i = 0; i < grid.length; i++) { 
    for(let j = 0; j < grid[i].length; j++) { 
      let r = Math.floor(Math.random() * 5)
      if(r === 4) { 
        grid[i][j] = 2;
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
     move_snake();
     return;
    }

    for(let i = 0; i < snake.length; i++) { 
     snake[i].turns.push({ 
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction_for_node_to_turn_in: going_in_direction_parameter_for_adding_turn
     })
    } 

    move_snake();
  
});

function move_snake() { 

  let add_snake_after_all_has_moved = false;
  let previous_last_node_turns_in_case_deleted = Object.assign({}, snake[snake.length - 1]); //ERROR - SOMEHTING GETS REMOVES IN THIS SOMEWHERE
  let did_last_node_change_turn = false;

  for(let i = 0; i < snake.length; i++) {

    grid[snake[i].x][snake[i].y] = 0;
    document.getElementById(`${snake[i].x}-${snake[i].y}`).style.backgroundColor = 'black';

    if(
      snake[i].turns.length > 0 && 
      snake[i].x === snake[i].turns[0].turn_at_x_coordinate && 
      snake[i].y === snake[i].turns[0].turn_at_y_coordinate 
    ) { 
      did_last_node_change_turn = i === snake.length - 1 ? { } : false;
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
     return 'END GAME BECAUSE SNAKE WENT OUT OF BOUNDS';
    }

    if(i === 0 && grid[snake[i].x][snake[i].y] === 2) { 
      add_snake_after_all_has_moved = true;
      // snake.push(last_node);
    }

    grid[snake[i].x][snake[i].y] = 1;
    document.getElementById(`${snake[i].x}-${snake[i].y}`).style.backgroundColor = 'red';
    document.getElementById(`${snake[i].x}-${snake[i].y}`).innerText = i;

  }

  //ADD A SNAKE NODE WHEN RAN INTO -- OBJECT MUTATION ERROR --- 
  if(add_snake_after_all_has_moved === true) {

    let last_node = snake[snake.length - 1];

    snake.push({ 
      x: last_node.direction === 'n' ? last_node.x + 1 : last_node.direction === 's' ? last_node.x - 1 : last_node.x,  
      direction: last_node.direction,
      y: last_node.direction === 'e' ? last_node.y - 1 : last_node.direction === 'w' ? last_node.y + 1 : last_node.y, 
      type_: 'trailing_node', 
      turns: [...snake[snake.length - 1].turns] //YOU NEED THE FUCKING SPREAD OPERATOR BECAUSE ARRAYS DONT COPY OVER. THAT WAS THE ONLY BUG IN THIS CODE AND AFTER FUCKING AROUND FOR A FEW DAYS, REALIZED. SHUT THE FUCK UP STEVE. YOU ARE NOT NEARLY AS GOOD AS ME.
    })
  
    if(typeof grid[snake[snake.length - 1].x][snake[snake.length - 1].y] === 'undefined') { 
     return 'END GAME BECAUSE SNAKE WENT OUT OF BOUNDS';
    }

    document.getElementById(`${snake[snake.length - 1].x}-${snake[snake.length - 1].y}`).style.backgroundColor = 'red';

  }

  for(let i = snake.length - 1; i > 0; i--) { 
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) { 
      return 'END GAME BECAUSE THE SNAKE SLITHERED INTO ITSELF';
    }
  }

  return setTimeout(function() { 
       snake_updating = false;
    return move_snake()
  }, 250)

}

setup_grid();
//move_snake();

</script>
</html>
