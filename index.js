for (let i of document.querySelectorAll(".cell")) {
    i.onclick = function() {
        click(i);
    };
}

let move = 0;
let actions = [];
let ifCan = true;
let count = 1;

if (localStorage.getItem("data")){
    again();
}

function click(el) {
    if (ifCan) {
        if (!el.hasChildNodes()) {
            if (count != 1){
                for (let i = 1; i < count; i++) {
                    actions.pop();
                }
                count = 1;
            }
            if (move % 2 === 0) {
                let X = document.createElement('div');
                X.className = 'ch';
                el.appendChild(X);
            }else {
                let O = document.createElement('div');
                O.className = 'r';
                el.appendChild(O);
            }
            move++;
            actions.push(el.id);
            document.querySelector('.undo-btn').disabled = false;
            document.querySelector('.redo-btn').disabled = true;
            IfWorks();
        }
    }
}

document.querySelector('.undo-btn').onclick = function() {
    move--;
    document
    .getElementById(actions[actions.length - count])
    .removeChild(document.getElementById(actions[actions.length - count]).firstChild);
document.querySelector('.redo-btn').disabled = false;
if (actions.length - count === 0) {
    document.querySelector('.undo-btn').disabled = true;
}
count++;
};

document.querySelector('.redo-btn').onclick = function() {
    document.querySelector('.undo-btn').disabled = false;
    count--;
    if (actions.length - count > actions.length - 2) {
        document.querySelector('.redo-btn').disabled = true;
    }
    if (move % 2 === 0) {
        let X = document.createElement('div');
        X.className = 'ch';
        document.getElementById(actions[actions.length - count]).appendChild(X);
    } else {
        let O = document.createElement('div');
        O.className = 'r';
        document.getElementById(actions[actions.length - count]).appendChild(O);
    }
    move++;
};
document.querySelector('.restart-btn').addEventListener('click', function restart() {
    move = 0;
    actions = [];
    ifCan = true;
    DeleteCells()

  for (let i = 0; i < Math.pow(size,2); i++) {
    document.getElementById('c-'+i).classList.remove('ch', 'r', 'win', 'horizontal', 'vertical', 'diagonal-right', 'diagonal-left');
  }
  document.querySelector('.won-title').classList.add('hidden');

  document.querySelector('.undo-btn').disabled = true;
  document.querySelector('.redo-btn').disabled = true;

});

function IfWorks() {
    let size = document.querySelector('.field').childNodes.length;
    let SelectedCells = 0;
    for (let i = 0; i < size; i++) {
        for (let e = 0; e < size; e++) {
            if (!document.querySelector('.field').childNodes[i].childNodes[e].firstChild) {
                break;
            }
            SelectedCells++;
            if (e === size - 1) {
                let firstElement = document.querySelector('.field').childNodes[i].firstChild.firstChild.className;

                for (let el = 1; el < document.querySelector('.field').childNodes[i].childNodes.length; el++) {
                    if (firstElement !== document.querySelector('.field').childNodes[i].childNodes[el].firstChild.className) {
                        break;
                    }
                    if (el === size - 1) {
                        document.querySelector('.won-title').classList.remove('hidden');
                  if (document.querySelector('.field').childNodes[i].childNodes[el].firstChild.className === 'ch') {
                            document.querySelector('.won-message').textContent = "Win of crosses!";
                        } else {
                            document.querySelector('.won-message').textContent = "Win of toes!";
                        }
                        for (let winCell = 0; winCell < size; winCell++) {
                            document.querySelector('.field').childNodes[i].childNodes[winCell].classList.add('.win');
                            document.querySelector('.field').childNodes[i].childNodes[winCell].classList.add('horizontal');
                        }
                        document.querySelector('.undo-btn').disabled =true;
                        ifCan = false;
                    }
                }
            }
        }
        for (let e = 0; e < size; e++) {
            if (!document.querySelector(".field").childNodes[e].childNodes[i].firstChild){
                break;
            }
            if(e=== size - 1) {
                let firstElement = document.querySelector(".field").firstChild.childNodes[i].firstChild.className;

                for (let el =1; el < size; el++) {
                    if (firstElement !== document.querySelector('.field').childNodes[el].childNodes[i].firstChild.className) {
                        break;
                    }
                    if (el === size - 1) {
                        document.querySelector(".won-title").classList.remove('hidden');
                        if (document.querySelector('.field').childNodes[el].childNodes[i].firstChild.className === 'ch') {
                            document.querySelector('.won-message').textContent = 'Crosses won!';
                        } else {
                            document.querySelector('.won-message').textContent = "Toes won!"
                        }
                        for (let winCell = 0; winCell < size; winCell++) {
                            document.querySelector('.field').childNodes[winCell].childNodes[i].classList.add("win");
                            document.querySelector('.field').childNodes[winCell].childNodes[i].classList.add('vertical');
                        }
                        document.querySelector('.undo-btn').disabled = true;
                        ifCan = false;
                    }
                }
            }
        }
    }
    for (let i = 0; i < size; i++) {
        if (!document.querySelector('.field').childNodes[i].firstChild) {
            break;
        }
        if (i === size - 1) {
            let firstElement = document.querySelector('.field').firstChild.firstChild.firstChild.className;
            for (let el = 1; el < size; el++) {
                if (firstElement !== document.querySelector('.field').childNodes[el].childNodes[el].firstChild.className) {
                    break;
                }
                if (el === size - 1) {
                    document.querySelector('.won-title').classList.remove('hidden');
                    if (document.querySelector('.field').childNodes[el].childNodes[el].firstChild.className === 'ch') {
                        document.querySelector('.won-message').textContent = 'Crosses won!';
                    } else {
                        document.querySelector('.won-message').textContent = 'Toes won!';
                    }
                    for (let winCell = 0; winCell < size; winCell++) {
                        document.querySelector('.field').childNodes[winCell].childNodes[winCell].classList.add('win');
                        document.querySelector('.field').childNodes[winCell].childNodes[winCell].classList.add('diagonal-right');
                    }
                    document.querySelector('.undo-btn').disabled = true;
                    ifCan = false;
                }
            }
        }
    }
    for (let i = 0; i < size; i++) {
        if (!document.querySelector('.field').childNodes[i].childNodes[size - 1 - i].firstChild) {
            break;
        }
        if (i === size - 1) {
            let firstElement = document.querySelector('.field').firstChild.lastChild.firstChild.className;
            for (let el = 1; el < size; el++ ) {
                if (
                    firstElement !==
                    document.querySelector('.field').childNodes[el].childNodes[size -1 - el].firstChild.className
                ) {
                    break;
                }
                if (el === size - 1) {
                    document.querySelector('.won-title').classList.remove('hidden');
                    if (document.querySelector('.field').childNodes[el].childNodes[size - 1 - el].firstChild.className === 'ch') {
                        document.querySelector('won-message').textContent = 'Crosses won!';
                    } else {
                        document.querySelector('won-message').textContent = 'Toes won!';
                    }
                    for (let winCell = 0; winCell < size; winCell++) {
                        document.querySelector('.field').childNodes[winCell].childNodes[size - 1 - winCell].classList.add('win');
                        document
                            .querySelector('.field')
                            .childNodes[winCell].childNodes[size - 1 - winCell].classList.add('diagonal-left');
                    }
                    document.querySelector('.field')
                    ifCan = false;
                }
            }
        }
    }
    if (document.querySelector('won-title').classList.contains('hidden')) {
        if (size * size === SelectedCells) {
            document.querySelector('.won-title').classList.remove('hidden');
            document.querySelector('.won-message').textContent = 'Draw';
            document.querySelector('.undo-btn').disabled = true;
        }
    }
}

function DeleteCells() {
    let size = document.querySelector('.field').childNodes.length;
    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            if (document.querySelector('field').childNodes[row].childNodes[column].firstChild) {
                document.querySelector('field').childNodes[row].childNodes[column].firstChild.remove();
                document.querySelector('field').childNodes[row].childNodes[column].firstChild.toggle('win', false);
                document.querySelector('field').childNodes[row].childNodes[column].firstChild.toggle('horizontal', false);
                document.querySelector('field').childNodes[row].childNodes[column].firstChild.toggle('vertical', false);
                document.querySelector('field').childNodes[row].childNodes[column].firstChild.toggle('diagonal-right', false);
                document.querySelector('field').childNodes[row].childNodes[column].firstChild.toggle('diagonal-left', false);
            }
        }
    }
}

function again() {
    let size =  document.querySelector('.field').childNodes.length;
    let information = JSON.parse(this.localStorage.getItem('data'));
    move = information.Move;
    count = information.Count;
    actions = information.Actions;
    ifCan = information.ifCan;
    if (information.UndoButton !== document.querySelector('undo-btn').disabled) {
        document.querySelector('.undo-btn').disabled = !document.querySelector('.undo-btn').disabled;
    }
    if (information.RedoButton !== document.querySelector('.redo-btn').disabled) {
        document.querySelector('redo-btn').disabled = !document.querySelector('.redo-btn').disabled;
    }
    if (information.State !== document.querySelector('.won-title').classList.contains('hidden')) {
        document.querySelector('.won-title').classList.toggle('hidden');
    }
    document.querySelector('.won-message').textContent = information.WinMessage;
    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++ ){
            if (information.cells[row][column] === 0) {
                if (document.querySelector('.field'),childNodes[row].childNodes[column].firstChild) {
                    DeleteCells();
                } 
            } else {
                if (!document.querySelector('.field').childNodes[row].childNodes[column].firstChild) {
                    let cell = document.createElement('div');
                    cell.className = information.cells[row][column];
                    document.querySelector('.field').childNodes[row].childNodes[column].appendChild(cell);
                }
            }
        }
    }
    IfWorks();
}
