const prompt = require('prompt-sync')({sigint: true});




const rover = [{
    direction: 'N',
    x: 0,
    y: 0,
    path: [{ x: 0, y: 0 }]
  },
  {
    direction: 'W',
    x: 1,
    y: 1,
    path: [{ x: 1, y: 1 }]
  },
  {
    direction: 'W',
    x: 8,
    y: 8,
    path: [{ x: 8, y: 8}]
  }];
  console.log('We are sending 3 rovers to Mars');
  for (let f = 0; f < 3; f++) {
    console.log(`Rover #${(f + 1)} has such specification as:
            1.direction: ${rover[f].direction},
            2.coordinates: x = ${rover[f].x}, y = ${rover[f].y},
            3.path: x: ${rover[f].x}, y: ${rover[f].y}
            `);
  }

  console.log('Pay attention! There are obstacles on your way!');
  let amount = prompt('What is the exact amount of obstacles? The amount can not exceed 97', '');
  let barrier = [];
  for (let b = 0; b < amount; b++) {
    console.log(`Determine the exact locotion of obstacle #${b}, use XY coordinates`);
    let x = parseInt(prompt("X:", ''));
    let y = parseInt(prompt("Y", ''));
    while (!x || !y) {
      console.log("Empty input, add values of x and y");
      x = prompt("X:", '');
      y = prompt("Y", '');
    }
    while (isNaN(x) || isNaN(y)) {
      console.log('Please, add a numeric value only!');
      x = prompt("X:", '');
      y = prompt("Y", '');
    }
    while (x >= 10 || x < 0 || y >= 10 || y < 0 || (x === rover[0].path.x && y === rover[0].path.y) || (x == rover[1].path.x && y == rover[1].path.y) || (x === rover[2].path.x && y === rover[2].path.y)) {
      console.log('Please, provide valid value, where 0 < x, y < 10 or x, y = 0');
      x = prompt("X:", '');
      y = prompt("Y", '');
    }
    let barrierPosition = { x, y };
    barrier.push(barrierPosition);
  }
console.log('===OBSTACLES===');
barrier.forEach(key => {console.log(`x = ${key.x}, y = ${key.y}`);
});

  let orders = prompt('Provide Rover with the direction', '');
  command(rover, orders);


  function turnLeft(obj, barrier, arr = new Array(10), mainPath) {
    for (let z = 0; z < amount; z++) {
      if (((obj.y == barrier[z].y) && ((obj.x - 1) == barrier[z].x)) || (((obj.y - 1) == barrier[z].y) && (obj.x == barrier[z].x)) || ((obj.y == barrier[z].y) && ((obj.x + 1) == barrier[z].x)) || (((obj.y + 1) == barrier[z].y) && (obj.x == barrier[z].x))) {
        console.log("The obstacle is on your way, choose the different path!");
        let newPosition = { x: obj.x, y: obj.y };
        obj.path.push(newPosition);
        return;
      }
    }
    
    for(let k = 0; k < mainPath.length; k++) {
     if (((obj.y == mainPath[k].y) && ((obj.x - 1) == mainPath[k].x)) || (((obj.y - 1) == mainPath[k].y) && (obj.x == mainPath[k].x)) || ((obj.y == mainPath[k].y) && ((obj.x + 1) == mainPath[k].x)) || (((obj.y + 1) == mainPath[k].y) && (obj.x == mainPath[k].x))) {
     console.log("Another rover is on your way, choose the different path!");
        let newPosition = { x: obj.x, y: obj.y };
        obj.path.push(newPosition);
       return;
      } 
   }
    if ((obj.x >= 0 && obj.x < 10) && (obj.y >= 0 && obj.y < 10)) {
      switch (obj.direction) {
        case 'N':

          if (obj.x - 1 >= 0) {
            obj.x--;
            obj.direction = 'W';
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'E':
          if (obj.y - 1 >= 0) {
            obj.y--;
            obj.direction = 'N';
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }

        case 'S':
          if (obj.x + 1 < 10) {
            obj.x++;
            obj.direction = 'E';
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }

        case 'W':
          if (obj.y + 1 < 10) {
            obj.y++;
            obj.direction = 'S';
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
      }
      newPosition = { x: obj.x, y: obj.y };
      obj.path.push(newPosition);
      /*field(newPosition, barrier, amount, arr);*/
    }
    else {
      console.log('You can not place Rover outside of the field!');
    }

  }


  function turnRight(obj, barrier, arr = new Array(10), mainPath) {
    for (let z = 0; z < amount; z++) {
      if (((obj.y == barrier[z].y) && ((obj.x - 1) == barrier[z].x)) || (((obj.y - 1) == barrier[z].y) && (obj.x == barrier[z].x)) || ((obj.y == barrier[z].y) && ((obj.x + 1) == barrier[z].x)) || (((obj.y + 1) == barrier[z].y) && (obj.x == barrier[z].x))) {
        console.log("The obstacle is on your way, choose the different path!");
        let newPosition = { x: obj.x, y: obj.y };
        obj.path.push(newPosition);
        return
      }
    }
    
  for(let k = 0; k < mainPath.length; k++) {
     if (((obj.y == mainPath[k].y) && ((obj.x - 1) == mainPath[k].x)) || (((obj.y - 1) == mainPath[k].y) && (obj.x == mainPath[k].x)) || ((obj.y == mainPath[k].y) && ((obj.x + 1) == mainPath[k].x)) || (((obj.y + 1) == mainPath[k].y) && (obj.x == mainPath[k].x))) {
     console.log("Another rover is on your way, choose the different path!");
        let newPosition = { x: obj.x, y: obj.y };
        obj.path.push(newPosition);
       return;
      } 
   }
     
    
    if ((obj.x >= 0 && obj.x < 10) && (obj.y >= 0 && obj.y < 10)) {
      switch (obj.direction) {
        case 'N':
          if (obj.x + 1 < 10) {
            obj.x++;
            obj.direction = 'E';
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'E':
          if (obj.y + 1 < 10) {
            obj.y++;
            obj.direction = 'S';
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'S':
          if (obj.x - 1 >= 0) {
            obj.x--;
            obj.direction = 'W';
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'W':
          if (obj.y - 1 >= 0) {
            obj.y--;
            obj.direction = 'N';
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
      }
      newPosition = { x: obj.x, y: obj.y };
      obj.path.push(newPosition);
      /*field(newPosition, barrier, amount, arr);*/
    }
    else {
      console.log('You can not place Rover outside of the field!');
    }
  }


  function moveForward(obj, barrier, arr = new Array(10), mainPath) {
    for (let z = 0; z < amount; z++) {
      if (((obj.y == barrier[z].y) && ((obj.x - 1) == barrier[z].x)) || (((obj.y - 1) == barrier[z].y) && (obj.x == barrier[z].x)) || ((obj.y == barrier[z].y) && ((obj.x + 1) == barrier[z].x)) || (((obj.y + 1) == barrier[z].y) && (obj.x == barrier[z].x))) {
        console.log("The obstacle is on your way, choose the different path!");
        let newPosition = { x: obj.x, y: obj.y };
        obj.path.push(newPosition);
        return;
      }
    }
    for(let k = 0; k < mainPath.length; k++) {
     if (((obj.y == mainPath[k].y) && ((obj.x - 1) == mainPath[k].x)) || (((obj.y - 1) == mainPath[k].y) && (obj.x == mainPath[k].x)) || ((obj.y == mainPath[k].y) && ((obj.x + 1) == mainPath[k].x)) || (((obj.y + 1) == mainPath[k].y) && (obj.x == mainPath[k].x))) {
     console.log("Another rover is on your way, choose the different path!");
        let newPosition = { x: obj.x, y: obj.y };
        obj.path.push(newPosition);
       return;
      } 
   }
    if ((obj.x >= 0 && obj.x < 10) && (obj.y >= 0 && obj.y < 10)) {
      switch (obj.direction) {
        case 'N':
          if (obj.y - 1 >= 0) {
            obj.y--;
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'E':
          if (obj.x + 1 < 10) {
            obj.x++;
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'S':
          if (obj.y + 1 < 10) {
            obj.y++;
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'W':
          if (obj.x - 1 >= 0) {
            obj.x--;
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
      }
      newPosition = { x: obj.x, y: obj.y };
      obj.path.push(newPosition);
      /*field(newPosition, barrier, amount, arr);*/
    }
    else {
      console.log('You can not place Rover outside of the field!');
    }
  }



  function moveBackward(obj, barrier, arr = new Array(10), mainPath) {
    for (let z = 0; z < amount; z++) {
      if (((obj.y == barrier[z].y) && ((obj.x - 1) == barrier[z].x)) || (((obj.y - 1) == barrier[z].y) && (obj.x == barrier[z].x)) || ((obj.y == barrier[z].y) && ((obj.x + 1) == barrier[z].x)) || (((obj.y + 1) == barrier[z].y) && (obj.x == barrier[z].x))) {
        console.log("The obstacle is on your way, choose the different path!");
        let newPosition = { x: obj.x, y: obj.y };
        obj.path.push(newPosition);
        return;
      }
    }
    for(let k = 0; k < mainPath.length; k++) {
     if (((obj.y == mainPath[k].y) && ((obj.x - 1) == mainPath[k].x)) || (((obj.y - 1) == mainPath[k].y) && (obj.x == mainPath[k].x)) || ((obj.y == mainPath[k].y) && ((obj.x + 1) == mainPath[k].x)) || (((obj.y + 1) == mainPath[k].y) && (obj.x == mainPath[k].x))) {
     console.log("Another rover is on your way, choose the different path!");
        let newPosition = { x: obj.x, y: obj.y };
        obj.path.push(newPosition);
       return;
      } 
   }
    if ((obj.x >= 0 && obj.x < 10) && (obj.y >= 0 && obj.y < 10)) {
      switch (obj.direction) {
        case 'N':
          if (obj.y + 1 < 10) {
            obj.y++;
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'E':
          if (obj.x - 1 >= 0) {
            rover.x--;
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'S':
          if (obj.y - 1 >= 0) {
            rover.y--;
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
        case 'W':
          if (obj.x + 1 < 10) {
            obj.x++;
            console.log(`Rover has position: x=${obj.x}, y=${obj.y}, ${obj.direction}`);
            break;
          }
          else {
            console.log('You can not place Rover outside of the field!');
            break;
          }
      }
      newPosition = { x: obj.x, y: obj.y };
      obj.path.push(newPosition);
      /*field(newPosition, barrier, amount, arr);*/
    }
    else {
      console.log('You can not place Rover outside of the field!');
    }
  }

  function command(obj, orders) {
    const arr = new Array(10);
    for (let k = 0; k < arr.length; k++) {
      arr[k] = new Array(10);
    }
    for (let k = 0; k < arr.length; k++) {
      for (let j = 0; j < arr.length; j++) {
        arr[j][k] = `(${k},${j})`;
      }
    }
     let mainPath = [];
    for (let s = 0; s < obj.length; s++) {
      console.log(`Provide rover #${(s + 1)} with direction`);
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        switch (order) {
          case 'l':
            turnLeft(obj[s], barrier, arr, mainPath);
            break;
          case 'r':
            turnRight(obj[s], barrier, arr, mainPath);
            break;
          case 'f':
            moveForward(obj[s], barrier, arr, mainPath);
            break;
          case 'b':
            moveBackward(obj[s], barrier, arr, mainPath);
            break;
        }
      }
      console.log('____PATH____');
      
      obj[s].path.forEach(key => {
        console.log(`x: ${key.x}, y: ${key.y}`);
      });
      mainPath.push(obj[s].path[obj[s].path.length - 1]);
      field(obj[s].path[obj[s].path.length - 1], barrier, amount, arr, obj[s].direction)
    }
  }
  function field(val, barrier, amount, arr = new Array(10), direction) {
    for (let t = 0; t < amount; t++) {
      arr[barrier[t].y][barrier[t].x] = '😱😱';
    }
    if(direction === "N") {
      arr[val.y][val.x] = '⬆R⬆';
    }
    else if(direction === "S") {
      arr[val.y][val.x] = '⬇R⬇';
    }
    else if(direction === "W") {
      arr[val.y][val.x] = '⬅R⬅';
    }
    else {
      arr[val.y][val.x] = '➡R➡';
    }
    console.log(arr.join('\n'));
  }
