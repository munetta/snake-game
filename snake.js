
  let grid = []; 
  let apple_count = 0;
  let found_apple_count = 0;
  let snake = [{ 
    x: 0, 
    y: 0, 
    direction: 's', 
    type_: 'leading_node', 
    turns: []
  }]; 
  let level = 1; 
  let level_difficulty_apple_amount_percentage = 10;
  let level_difficulty_speed = 100;
  let in_game = false;
  let paused = true;
  
  function setup_grid(dimensions, pixel_to_grid_ratio) {
  
    if(dimensions === null) { 
      dimensions = 20;
    } 
  
    if(pixel_to_grid_ratio === null) { 
      pixel_to_grid_ratio = 20
    }
  
    if(dimensions < 10) { 
      return;
    }
  
    for(let i = 0; i < dimensions; i++) {
      grid[i] = [];
      for(let j = 0; j < dimensions; j++) { 
        grid[i][j] = 0;
      }
    }
  
    for(let i = 0; i < grid.length; i++) { 
      for(let j = 0; j < grid[i].length; j++) { 
        let r = Math.floor(
          Math.random() * 
          level_difficulty_apple_amount_percentage
        )
        if(r === 1) { 
          //ignore first
          if(i === 0 && j === 0) { 
            continue;
          }
          grid[i][j] = 2;
          apple_count += 1;
        }
      }
    }
  
    grid[snake[0].x][snake[0].y] = 1;
  
    let div_element = `<div style = "width: ${dimensions * pixel_to_grid_ratio}px; height: ${dimensions * pixel_to_grid_ratio}px; margin-top: 100px; margin-left: auto; margin-right: auto"> <h1 id = 'append_level'>Snake Game</h1>`;
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
        div_element += `<span id = '${i}-${j}' style = 'height: ${1 * pixel_to_grid_ratio}px; width: ${1 * pixel_to_grid_ratio}px; display: in-line-block; background-color: ${color}; float: left'></span>`;
      }
    }
    div_element += '<p style = "text-align: center;";>Space Bar to Play/Stop</p></div>';
    document.getElementById('grid').innerHTML = div_element;

    display_level_data(); 
  
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
    } else if(event.key === ' ') { 
      if(paused === true) { 
        paused = false;
        move_snake();
        return;
      } else { 
        paused = true;
        return;
      }
    } else { 
      return;
    }
  
    if(
      snake[0].direction === conditional_a || 
      snake[0].direction === conditional_b
    ) { 
      return;
    }

    //yikes? why not copy.
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
      return;
    }

    let add_snake_node_after_all_has_moved = false;
  
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
        //Purposeful redundancy - will change to something else 
       if(i === 0 && typeof grid[snake[i].x][snake[i].y] === 'undefined') {
        end_('front snake node off the grid');
        return;
       }
      } catch(err) { 
        end_('front snake node off the grid');
        return;
      }
  
      if(i === 0 && grid[snake[i].x][snake[i].y] === 2) { 
        add_snake_node_after_all_has_moved = true;
      }
  
      grid[snake[i].x][snake[i].y] = 1;
      document.getElementById(`${snake[i].x}-${snake[i].y}`).style.backgroundColor = 'red';
  
    }
  
    if(add_snake_node_after_all_has_moved === true) {
      if(!add_node_to_end()) { 
        return;
      }
    }
  
    for(let i = snake.length - 1; i > 0; i--) { 
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) { 
        end_('snake went into itself');
        return;
      }
    }
  
    return setTimeout(function() { 
      return move_snake()
    }, level_difficulty_speed)
  
  }
  
  function add_node_to_end() { 
  
    let last_node = snake[snake.length - 1];
  
    snake.push({ 
      x: last_node.direction === 'n' ? last_node.x + 1 : 
       last_node.direction === 's' ? last_node.x - 1 : 
       last_node.x,  
      y: last_node.direction === 'e' ? last_node.y - 1 : 
       last_node.direction === 'w' ? last_node.y + 1 : 
       last_node.y, 
      direction: last_node.direction,
      type_: 'trailing_node', 
      turns: [...snake[snake.length - 1].turns]
    })
    
    //should not hit
    try {
      if(typeof grid[snake[snake.length - 1].x][snake[snake.length - 1].y] === 'undefined') {
       end_('added snake node off the grid');
       return false;
      }
    } catch(err) { 
       end_('added snake node off the grid');
       return false;
    }

    found_apple_count += 1;
  
    if(found_apple_count === apple_count) {
      next_level();
      return false;
    }
  
    grid[snake[snake.length - 1].x][snake[snake.length - 1].y] = 1;
    document.getElementById(`${snake[snake.length - 1].x}-${snake[snake.length - 1].y}`).style.backgroundColor = 'red';
  
    return true;
  
  }
  
  function next_level() {
    level += 1; 
    if(level === 11) {
     end_('you won');
     return;
    }
    level_difficulty_apple_amount_percentage -= 1;
    level_difficulty_speed -= 10; 
    display_level_data();
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
    found_apple_count = 0;
    in_game = false; 
    paused = false;
    start_game();
  }
  
  function start_game() {
    if(in_game === true) { 
      return;
    }
    in_game = true;
    setup_grid(null, null); 
    move_snake();
  }
  
  function end_(reason) { 
   if(in_game === false) { 
    return;
   }
   if(reason) { 
    alert(reason);
   }
   level_difficulty_apple_amount_percentage = 10; 
   level_difficulty_speed = 100;
   level = 1;
   in_game = false;
   snake = [{ 
     x: 0, 
     y: 0, 
     direction: 's', 
     type_: 'leading_node', 
     turns: []
    }];
   found_apple_count = 0;
   apple_count = 0;
   paused = false;
   start_game()
  }
  
  function display_level_data() { 
    document.getElementById(`append_level`).innerHTML = `Snake Game <small> Level ${level} </small?`
  }
    
  start_game();
  
