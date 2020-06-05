let move = 0;
let undoArr = [];
let redoArr = [];
let cells = document.querySelectorAll('.cell');

if(localStorage.getItem('move')){
    move = localStorage.getItem('move');
}

if(localStorage.getItem('undoArr')){
    undoArr = JSON.parse(localStorage.getItem('undoArr'));
}

if(localStorage.getItem('redoArr')){
    redoArr = JSON.parse(localStorage.getItem('redoArr'));
}

if(localStorage.getItem('undoArr')){
    for(let q = 0; q < undoArr.length; q++){
        document.getElementById(undoArr[q].id).classList.add(undoArr[q].type);
    }
}

if(undoArr.length > 0){
    document.querySelector('.undo-btn').disabled = false;
}

if(redoArr.length > 0){
    document.querySelector('.redo-btn').disabled = false;
}

document.querySelector('.field').onclick = function ticTacToe(event){
    if(document.querySelector('.hidden')){
        if(event.target.className == 'cell'){
            if(move % 2 == 0){
                event.target.classList.add('ch');
                undoArr.push(new step(event.target.id,'ch'));
                redoArr = [];
                document.querySelector('.redo-btn').disabled = true;
            }
            else{
                event.target.classList.add('r');
                undoArr.push(new step(event.target.id,'r'));
                redoArr = [];
                document.querySelector('.redo-btn').disabled = true;
            }
        }
        if(undoArr.length > 0){
            document.querySelector('.undo-btn').disabled = false;
        }
        checkWin();
        move++;
    }
    localStorage.setItem('move', move);
    localStorage.setItem('undoArr', JSON.stringify(undoArr));
    localStorage.setItem('redoArr', JSON.stringify(redoArr));
}

function step(id, type) {
    this.id = id;
    this.type = type;
}

document.querySelector('.undo-btn').addEventListener('click', function(){
    let undoObj = undoArr.pop();
    redoArr.push(undoObj);
    document.querySelector('.redo-btn').disabled = false;
    document.getElementById(undoObj.id).classList.remove(undoObj.type);
    move--;
    if(undoArr.length == 0){
        document.querySelector('.undo-btn').disabled = true;
    }
    localStorage.setItem('move', move);
    localStorage.setItem('undoArr', JSON.stringify(undoArr));
    localStorage.setItem('redoArr', JSON.stringify(redoArr));
});

document.querySelector('.redo-btn').addEventListener('click', function(){
    let redoObj = redoArr.pop();
    undoArr.push(redoObj);
    document.getElementById(redoObj.id).classList.add(redoObj.type);
    document.querySelector('.undo-btn').disabled = false;
    checkWin();
    move++;
    if(redoArr.length == 0){
        document.querySelector('.redo-btn').disabled = true;
    }
    localStorage.setItem('move', move);
    localStorage.setItem('undoArr', JSON.stringify(undoArr));
    localStorage.setItem('redoArr', JSON.stringify(redoArr));
});


let size = Math.sqrt(document.querySelectorAll('.cell').length);
let arr = new Array(), rows, cols;
let c = 0;
for (rows = 0; rows < size; rows++) {
    arr[rows] = new Array();
    for (cols = 0; cols < size; cols++) {
        arr[rows][cols] = c;
        c++;
    }
}


function checkWin(){
    let player = (move % 2 == 0) ? 'ch' : 'r';
    let winCells = [];
    //vertical
    for (rows = 0; rows < size; rows++) {
        matches = 0;
        for (cols = 0; cols < size; cols++) {
            if (document.getElementById(`c-${arr[cols][rows]}`).classList.contains(player)) {
                matches++;
                winCells.push(arr[cols][rows]);
                if (matches >= size) {
                    win(1, winCells);
                }
            } 
            else {
                matches = 0;
                winCells = [];
            }
        }
    }
    //horizontal
    for (rows = 0; rows < size; rows++) {
        matches = 0;
        for (cols = 0; cols < size; cols++) {
            if (document.getElementById(`c-${arr[rows][cols]}`).classList.contains(player)) {
                matches++;
                winCells.push(arr[rows][cols]);
                if (matches >= size) {
                    win(2, winCells);
                }
            } 
            else {
                matches = 0;
                winCells = [];
            }
        }
    }
    //diagonal-right
    matches = 0;
    winCells = [];
    for (rows = 0; rows < size; rows++) {
        if(document.getElementById(`c-${arr[rows][rows]}`).classList.contains(player)){
            winCells.push(arr[rows][rows]);
            matches++;
            if (matches >= size) {
                win(3, winCells);
            }
        } 
        else {
            winCells = [];
            matches = 0;
        }
    }
    //diagonal-left
    matches = 0;
    winCells = [];
    for (rows = size-1; rows >= 0; rows--) {
        if(document.getElementById(`c-${arr[rows][Math.abs((size - 1) - rows)]}`).classList.contains(player)){
            winCells.push(arr[rows][Math.abs((size - 1) - rows)]);
            matches++;
            if (matches >= size) {
                win(4, winCells);
            }
        } 
        else {
            winCells = [];
            matches = 0;
        }
    }
    if(undoArr.length >= cells.length && document.querySelector('.hidden')){
        draw();  
    }
}

function win(number, winCells){
    document.querySelector('.won-title').classList.remove('hidden');
    if(move % 2 == 0){
        document.querySelector('.won-message').innerHTML = 'Crosses won!';
    }
    else{
        document.querySelector('.won-message').innerHTML = 'Toes won!';
    }

    switch(number){
        case 1:
            winCells.forEach(function(e){document.getElementById(`c-${e}`).classList.add('win', 'vertical')});
        break;
        case 2:
            winCells.forEach(function(e){document.getElementById(`c-${e}`).classList.add('win', 'horizontal')});
        break;
        case 3:
            winCells.forEach(function(e){document.getElementById(`c-${e}`).classList.add('win', 'diagonal-right')});
        break;
        case 4:
            winCells.forEach(function(e){document.getElementById(`c-${e}`).classList.add('win', 'diagonal-left')});
        break;
    }
    document.querySelector('.undo-btn').disabled = true;
    document.querySelector('.redo-btn').disabled = true;
    undoArr = [];
}
function draw(){
    document.querySelector('.won-title').classList.remove('hidden');
    document.querySelector('.won-message').innerHTML = 'It is a draw!';
    document.querySelector('.undo-btn').disabled = true;
    document.querySelector('.redo-btn').disabled = true;
    undoArr = [];
}
document.querySelector('.restart-btn').onclick = function reset(){
    for (x = 0; x < cells.length; x++) {
        cells[x].classList.remove('ch', 'r', 'win', 'vertical', 'horizontal', 'diagonal-right', 'diagonal-left');
    }
    document.querySelector('.won-title').classList.add('hidden');
    move = 0;
    undoArr = [];
    document.querySelector('.undo-btn').disabled = true;
    localStorage.clear();
}
