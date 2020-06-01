for (let i of document.querySelectorAll(".cell")) {
    i.onclick = function() {
        click(i);
    };
}

let step = 0;
let move = true;
let story = [];
let count = 1;

if (localStorage.getItem("data")){  recover(); }

function click(el) {
    if (move) {
        if (!el.hasChildNodes()) {
            if (count != 1){
                for (let i = 1; i < count; i++) {
                    story.pop();
                }
                count = 1;
            }
              if (step % 2 === 0) {
                let X = document.createElement('div');
                X.className = 'ch';
                el.appendChild(X);
            }
              else {
                let O = document.createElement('div');
                O.className = 'r';
                el.appendChild(O);
            }
              step++;
            story.push(el.id);
            document.querySelector('.undo-btn').disabled = false;
            document.querySelector('.redo-btn').disabled = true;
            Check();
        }
    }
}

  document.querySelector('.undo-btn').onclick = function() {
    step--;
  document.getElementById(story[story.length - count])
    .removeChild(document.getElementById(story[story.length - count]).firstChild);
document.querySelector('.redo-btn').disabled = false;
if (story.length - count === 0) {
    document.querySelector('.undo-btn').disabled = true;
}
count++;
};

document.querySelector('.redo-btn').onclick = function() {
    document.querySelector('.undo-btn').disabled = false;
    count--;
    if (story.length - count > story.length - 2) {
        document.querySelector('.redo-btn').disabled = true;
    }
    if (step % 2 === 0) {
        let X = document.createElement('div');
        X.className = 'ch';
        document.getElementById(story[story.length - count]).appendChild(X);
    } else {
        let O = document.createElement('div');
        O.className = 'r';
        document.getElementById(story[story.length - count]).appendChild(O);
    }
    stepp++;
};

document.querySelector('.restart.btn').onclick = function() {
    step = 0;
    story = [];
    move = true;
    document.querySelector('.won-title').classList.add('hidden');
    RemoveMarkedCells();
};

function Check() {
    let size = document.querySelector('.field').childNodes.length;
    let MarkedCells = 0;
    for (let i = 0; i < size; i++) {
        for (let e = 0; e < size; e++) {
            if (!document.querySelector('.field').childNodes[i].childNodes[e].firstChild) {
                break;
            }
            MarkedCells++;
            if (e === size - 1) {
                let firstElement = document.querySelector('.field').childNodes[i].firstChild.firstChild.className;

                for (let el = 1; el < document.querySelector('.field').childNodes[i].childNodes.length; el++) {
                    if (firstElement !== document.querySelector('.field').childNodes[i].childNodes[el].firstChild.className) {
                        break;
                    }
                    if (el === size - 1) {
                        document.querySelector('.won-title').classList.remove('hidden');
                        if (document.querySelector('.field').childNodes[i].childNodes[el].firstChild.className === 'ch') {
                            document.querySelector('.won-message').textContent = "Crosses won!";
                        } else {
                            document.querySelector('.won-message').textContent = "Toes won!";
                        }
                        for (let winCell = 0; winCell < size; winCell++) {
                            document.querySelector('.field').childNodes[i].childNodes[winCell].classList.add('.win');
                            document.querySelector('.field').childNodes[i].childNodes[winCell].classList.add('horizontal');
                        }
                        document.querySelector('.undo-btn').disabled =true;
                        move = false;
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
                        move = false;
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
                    move = false;
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
                    move = false;
                }
            }
        }
    }
    if (document.querySelector('won-title').classList.contains('hidden')) {
        if (size * size === MarkedCells) {
            document.querySelector('.won-title').classList.remove('hidden');
            document.querySelector('.won-message').textContent = 'Draw';
            document.querySelector('.undo-btn').disabled = true;
        }
    }
}

function RemoveMarkedCells() {
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

function recover() {
    let size =  document.querySelector('.field').childNodes.length;
    let information = JSON.parse(this.localStorage.getItem('data'));
    step = information.Step;
    count = information.count;
    story = information.story;
    move = information.move;
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
                    RemoveMarkedCells();
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
    Check();
}
