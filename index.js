for (let i of document.querySelectorAll('.cell')) {
    i.onclick = function() {
      click(i);
    };
  }
  
  let step = 0;
  let array = [];
  let count = 1;
  let ability = true;
  
  if (localStorage.getItem('data')) {
    restart();
  }
  // making undo
  document.querySelector('.undo-btn').onclick = function() {
    step--;
    document
      .getElementById(array[array.length - count])
      .removeChild(document.getElementById(array[array.length - count]).firstChild);
    document.querySelector('.redo-btn').disabled = false;
    if (array.length - count == 0) {
      document.querySelector('.undo-btn').disabled = true;
    }
    count++;
  };
  // making redo
  document.querySelector('.redo-btn').onclick = function() {
    document.querySelector('.undo-btn').disabled = false;
    count--;
    if (array.length - count > array.length - 2) {
      document.querySelector('.redo-btn').disabled = true;
    }
    if (step % 2 == 0) {
      let cross = document.createElement('div');
      cross.className = 'ch';
      document.getElementById(array[array.length - count]).appendChild(cross);
    } else {
      let toe = document.createElement('div');
      toe.className = 'r';
      document.getElementById(array[array.length - count]).appendChild(toe);
    }
    step++;
  };
  // doing restart
  document.querySelector('.restart-btn').onclick = function() {
    step = 0;
    array = [];
    ability = true;
    document.querySelector('.won-title').classList.add('hidden');
    removeMarkedCells();
  };
  
  window.addEventListener('storage', function() {
    restart();
  });
  window.addEventListener('click', function() {
    let cells = [];
    let size = document.querySelector('.field').childNodes.length;
    for (let row = 0; row < size; row++) {
      cells.push([]);
      for (let column = 0; column < size; column++) {
        if (document.querySelector('.field').childNodes[row].childNodes[column].firstChild) {
          if (document.querySelector('.field').childNodes[row].childNodes[column].firstChild.className == 'ch') {
            cells[row].push('ch');
          } else {
            cells[row].push('r');
          }
        } else {
          cells[row].push(0);
        }
      }
    }
  // info about every let
    let inform = {
      Step: step,
      Count: count,
      Array: array,
      Ability: ability,
      UndoButton: document.querySelector('.undo-btn').disabled,
      RedoButton: document.querySelector('.redo-btn').disabled,
      State: document.querySelector('.won-title').classList.contains('hidden'),
      WinMessage: document.querySelector('.won-message').textContent,
      Cells: cells,
    };
    let StrInf = JSON.stringify(inform);
    this.localStorage.setItem('data', StrInf);
  });
  // reaction on clicks
  function click(element) {
    if (ability) {
      if (!element.hasChildNodes()) {
        if (count != 1) {
          for (let i = 1; i < count; i++) {
            array.pop();
          }
          count = 1;
        }
        if (step % 2 == 0) {
          let cross = document.createElement('div');
          cross.className = 'ch';
          element.appendChild(cross);
        } else {
          let toe = document.createElement('div');
          toe.className = 'r';
          element.appendChild(toe);
        }
        step++;
        array.push(element.id);
        document.querySelector('.undo-btn').disabled = false;
        document.querySelector('.redo-btn').disabled = true;
        check();
      }
    }
  }
  // checking the win
  function check() {
    let size = document.querySelector('.field').childNodes.length;
    let markedCells = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!document.querySelector('.field').childNodes[i].childNodes[j].firstChild) {
          break;
        }
        markedCells++;
        if (j == size - 1) {
          let firstElement = document.querySelector('.field').childNodes[i].firstChild.firstChild.className;
  
          for (let element = 1; element < document.querySelector('.field').childNodes[i].childNodes.length; element++) {
            if (firstElement != document.querySelector('.field').childNodes[i].childNodes[element].firstChild.className) {
              break;
            }
            if (element == size - 1) {
              document.querySelector('.won-title').classList.remove('hidden');
              // win messages
              if (document.querySelector('.field').childNodes[i].childNodes[element].firstChild.className == 'ch') {
                document.querySelector('.won-message').textContent = 'Win of crosses!';
              } else {
                document.querySelector('.won-message').textContent = 'Win of toes!';
              }
              for (let WinCell = 0; WinCell < size; WinCell++) {
                document.querySelector('.field').childNodes[i].childNodes[WinCell].classList.add('win');
                document.querySelector('.field').childNodes[i].childNodes[WinCell].classList.add('horizontal');
              }
              document.querySelector('.undo-btn').disabled = true;
              ability = false;
            }
          }
        }
      }
      for (let j = 0; j < size; j++) {
        if (!document.querySelector('.field').childNodes[j].childNodes[i].firstChild) {
          break;
        }
        
        if (j == size - 1) {
          let firstElement = document.querySelector('.field').firstChild.childNodes[i].firstChild.className;
  
          for (let element = 1; element < size; element++) {
            if (firstElement != document.querySelector('.field').childNodes[element].childNodes[i].firstChild.className) {
              break;
            }
            // checking win
            if (element == size - 1) {
              document.querySelector('.won-title').classList.remove('hidden');
              if (document.querySelector('.field').childNodes[element].childNodes[i].firstChild.className == 'ch') {
                document.querySelector('.won-message').textContent = 'Win of crosses!';
              } else {
                document.querySelector('.won-message').textContent = 'Win of toes!';
              }
              for (let WinCell = 0; WinCell < size; WinCell++) {
                document.querySelector('.field').childNodes[WinCell].childNodes[i].classList.add('win');
                document.querySelector('.field').childNodes[WinCell].childNodes[i].classList.add('vertical');
              }
              document.querySelector('.undo-btn').disabled = true;
              ability = false;
            }
          }
        }
      }
    }
    for (let i = 0; i < size; i++) {
      if (!document.querySelector('.field').childNodes[i].childNodes[i].firstChild) {
        break;
      }
      if (i == size - 1) {
        let firstElement = document.querySelector('.field').firstChild.firstChild.firstChild.className;
        for (let element = 1; element < size; element++) {
          if (
            firstElement != document.querySelector('.field').childNodes[element].childNodes[element].firstChild.className
          ) {
            break;
          }
          if (element == size - 1) {
            document.querySelector('.won-title').classList.remove('hidden');
            if (document.querySelector('.field').childNodes[element].childNodes[element].firstChild.className == 'ch') {
              document.querySelector('.won-message').textContent = 'Crosses won!';
            } else {
              document.querySelector('.won-message').textContent = 'Toes won!';
            }
            for (let WinCell = 0; WinCell < size; WinCell++) {
              document.querySelector('.field').childNodes[WinCell].childNodes[WinCell].classList.add('win');
              document.querySelector('.field').childNodes[WinCell].childNodes[WinCell].classList.add('diagonal-right');
            }
            document.querySelector('.undo-btn').disabled = true;
            ability = false;
          }
        }
      }
    }
    for (let i = 0; i < size; i++) {
      if (!document.querySelector('.field').childNodes[i].childNodes[size - 1 - i].firstChild) {
        break;
      }
      if (i == size - 1) {
        let firstElement = document.querySelector('.field').firstChild.lastChild.firstChild.className;
        for (let element = 1; element < size; element++) {
          if (
            firstElement !=
            document.querySelector('.field').childNodes[element].childNodes[size - 1 - element].firstChild.className
          ) {
            break;
          }
          if (element == size - 1) {
            document.querySelector('.won-title').classList.remove('hidden');
            if (
              document.querySelector('.field').childNodes[element].childNodes[size - 1 - element].firstChild.className ==
              'ch'
            ) {
              document.querySelector('.won-message').textContent = 'Crosses won!';
            } else {
              document.querySelector('.won-message').textContent = 'Toes won!';
            }
            for (let WinCell = 0; WinCell < size; WinCell++) {
              document.querySelector('.field').childNodes[WinCell].childNodes[size - 1 - WinCell].classList.add('win');
              document
                .querySelector('.field')
                .childNodes[WinCell].childNodes[size - 1 - WinCell].classList.add('diagonal-left');
            }
            document.querySelector('.undo-btn').disabled = true;
            ability = false;
          }
        }
      }
    }
    // draw case
    if (document.querySelector('.won-title').classList.contains('hidden')) {
      if (size * size == markedCells) {
        document.querySelector('.won-title').classList.remove('hidden');
        document.querySelector('.won-message').textContent = "Oops! Draw!";
        document.querySelector('.undo-btn').disabled = true;
      }
    }
  }
  // removing marked cells
  function removeMarkedCells() {
    let size = document.querySelector('.field').childNodes.length;
    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        if (document.querySelector('.field').childNodes[row].childNodes[column].firstChild) {
          document.querySelector('.field').childNodes[row].childNodes[column].firstChild.remove();
          document.querySelector('.field').childNodes[row].childNodes[column].classList.toggle('win', false);
          document.querySelector('.field').childNodes[row].childNodes[column].classList.toggle('horizontal', false);
          document.querySelector('.field').childNodes[row].childNodes[column].classList.toggle('vertical', false);
          document.querySelector('.field').childNodes[row].childNodes[column].classList.toggle('diagonal-right', false);
          document.querySelector('.field').childNodes[row].childNodes[column].classList.toggle('diagonal-left', false);
        }
      }
    }
  }
  // restarting everything
  function restart() {
    let size = document.querySelector('.field').childNodes.length;
    let data = JSON.parse(this.localStorage.getItem('data'));
    step = data.Step;
    count = data.Count;
    array = data.Array;
    ability = data.Ability;
    if (data.UndoButton != document.querySelector('.undo-btn').disabled) {
      document.querySelector('.undo-btn').disabled = !document.querySelector('.undo-btn').disabled;
    }
    if (data.RedoButton != document.querySelector('.redo-btn').disabled) {
      document.querySelector('.redo-btn').disabled = !document.querySelector('.redo-btn').disabled;
    }
    if (data.State != document.querySelector('.won-title').classList.contains('hidden')) {
      document.querySelector('.won-title').classList.toggle('hidden');
    }
    document.querySelector('.won-message').textContent = data.WinMessage;
    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        if (data.Cells[row][column] == 0) {
          if (document.querySelector('.field').childNodes[row].childNodes[column].firstChild) {
            removeMarkedCells();
          }
        } else {
          if (!document.querySelector('.field').childNodes[row].childNodes[column].firstChild) {
            let cell = document.createElement('div');
            cell.className = data.Cells[row][column];
            document.querySelector('.field').childNodes[row].childNodes[column].appendChild(cell);
          }
        }
      }
    }
    check();
  }
  
