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
//snake game one version. array of nodes with turning points - other is just copying into
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

let level = 1; 

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

  let div_element = `<div style = "border-radius: 50%; width: 100%; height: 100%">`;
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

    let conditional_a; 
    let conditional_b; 
    let new_direction;

    if(event.key ===  'ArrowRight') { 
     conditional_a = 'e';
     conditional_b = 'w';
     new_direction = 'e';
    } else if(event.key ===  'ArrowLeft') { 
     conditional_a = 'e';
     conditional_b = 'w';
     new_direction = 'w';
    } else if(event.key ===  'ArrowUp') { 
     conditional_a = 'n';
     conditional_b = 's';
     new_direction = 'n';
    } else if(event.key === 'ArrowDown') { 
     conditional_a = 'n';
     conditional_b = 's';
     new_direction = 's';
    }

    if(
     snake[0].direction === conditional_a || 
     snake[0].direction === conditional_b
    ) { 
     return;
    }

    for(let i = 0; i < snake.length; i++) { 
     snake[i].turns.push({ 
      turn_at_x_coordinate: snake[0].x, 
      turn_at_y_coordinate: snake[0].y, 
      direction_for_node_to_turn_in: new_direction
     })
    } 
  
});

function move_snake() { 

  if(paused === true) { 
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

    try {
     if(i === 0 && typeof grid[snake[i].x][snake[i].y] === 'undefined') {
      return end_game('new snake node off the grid');
     }
    } catch(err) { 
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
  
    try {
     if(typeof grid[snake[snake.length - 1].x][snake[snake.length - 1].y] === 'undefined') {
      return end_game('added snake node off the grid');
     }
    } catch(err) { 
      return end_game('added snake node off the grid');
    }

    if(snake.length - 1 >= apple_count) {
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
    alert('s')
    end_();
  } else if(reason === 'added snake node off the grid') { 
    alert('c')
    end_();
  } else if(reason === 'new snake node off the grid') { 
    alert('r')
    end_();
  } else if(reason === 'won game the grid has been traversed') {
    alert('x')
    end_();
  } else if(reason === 'won game found all apples') { 
    //below
    alert('q')
    next_level();
  }
}

function next_level() { 
  level += 1; 
  if(
   level === 101) { 
   return end_game();
  }
  level_difficulty_apple_amount_percentage -= 0.1;
  level_difficulty_speed -= 6; 
  display_level_data(
    level, 
    level_difficulty_apple_amount_percentage, 
    level_difficulty_speed
  );
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if(grid[i][j] === 1) { 
        grid[i][j] = 0;
      }
    } 
  }
  snake = [{ 
   x: 0, 
   y: 0, 
   direction: 's', 
   type_: 'leading_node', 
   turns: []
  }];
  apple_count = 0;
  in_game = false; 
  start_game();
}

document.query_selector('#start_game').click(function() { 
  if(in_game === true) { 
    return;
  }
  start_game();
})

function start_game() {
  if(in_game === true) { 
    return;
  }
  in_game = true;
  setup_grid(); 
  move_snake();
}

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

function exit_game() { 
  end_game();
} 

function display_level_data(a, b, c) { 
  document.getElementById('level').innerText = a; 
  document.getElementById('parameter_a_increase').innerText = b;
  document.getElementById('parameter_b_increase').innerText = c; 
}

function end_() { 
 level_difficulty_apple_amount_percentage = 10; 
 level_difficulty_speed = 600;
 level = 1;
 in_game = false;
 snake = [{ 
   x: 0, 
   y: 0, 
   direction: 's', 
   type_: 'leading_node', 
   turns: []
  }];
 apple_count = 0;
 display_level_data(
  level, 
  level_difficulty_apple_amount_percentage, 
  level_difficulty_speed
 ); 
}

display_level_data(
  level, 
  level_difficulty_apple_amount_percentage, 
  level_difficulty_speed
); 

</script>
</html>
