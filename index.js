let go = 0;
let undo = [];
let redo = [];
let match = document.querySelectorAll('.cell');

if(localStorage.getItem('go')){
    go = localStorage.getItem('go');
}

if(localStorage.getItem('undo')){
    undo = JSON.parse(localStorage.getItem('undo'));
}

if(localStorage.getItem('redo')){
    redo = JSON.parse(localStorage.getItem('redo'));
}

if(localStorage.getItem('undo')){
    for(let q = 0; q < undo.length; q++){
        document.getElementById(undo[q].id).classList.add(undo[q].type);
    }
}

if(undo.length > 0){
    document.querySelector('.undo-btn').disabled = false;
}

if(redo.length > 0){
    document.querySelector('.redo-btn').disabled = false;
}

document.querySelector('.field').onclick = function ticTacToe(event){
    if(document.querySelector('.hidden')){
        if(event.target.className == 'cell'){
            if(go % 2 == 0){
                event.target.classList.add('ch');
                undo.push(new step(event.target.id,'ch'));
                redo = [];
                document.querySelector('.redo-btn').disabled = true;
            }
            else{
                event.target.classList.add('r');
                undo.push(new step(event.target.id,'r'));
                redo = [];
                document.querySelector('.redo-btn').disabled = true;
            }
        }
        if(undo.length > 0){
            document.querySelector('.undo-btn').disabled = false;
        }
        checkWin();
        go++;
    }
    localStorage.setItem('go', go);
    localStorage.setItem('undo', JSON.stringify(undo));
    localStorage.setItem('redo', JSON.stringify(redo));
}

function step(id, type) {
    this.id = id;
    this.type = type;
}

document.querySelector('.undo-btn').addEventListener('click', function(){
    let undoObj = undo.pop();
    redo.push(undoObj);
    document.querySelector('.redo-btn').disabled = false;
    document.getElementById(undoObj.id).classList.rego(undoObj.type);
    go--;
    if(undo.length == 0){
        document.querySelector('.undo-btn').disabled = true;
    }
    localStorage.setItem('go', go);
    localStorage.setItem('undo', JSON.stringify(undo));
    localStorage.setItem('redo', JSON.stringify(redo));
});

document.querySelector('.redo-btn').addEventListener('click', function(){
    let redoObj = redo.pop();
    undo.push(redoObj);
    document.getElementById(redoObj.id).classList.add(redoObj.type);
    document.querySelector('.undo-btn').disabled = false;
    checkWin();
    go++;
    if(redo.length == 0){
        document.querySelector('.redo-btn').disabled = true;
    }
    localStorage.setItem('go', go);
    localStorage.setItem('undo', JSON.stringify(undo));
    localStorage.setItem('redo', JSON.stringify(redo));
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
    let player = (go % 2 == 0) ? 'ch' : 'r';
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
    if(undo.length >= cells.length && document.querySelector('.hidden')){
        draw();  
    }
}

function win(number, winCells){
    document.querySelector('.won-title').classList.rego('hidden');
    if(go % 2 == 0){
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
    undo = [];
}
function draw(){
    document.querySelector('.won-title').classList.rego('hidden');
    document.querySelector('.won-message').innerHTML = 'It is a draw!';
    document.querySelector('.undo-btn').disabled = true;
    document.querySelector('.redo-btn').disabled = true;
    undo = [];
}
document.querySelector('.restart-btn').onclick = function reset(){
    for (x = 0; x < cells.length; x++) {
        cells[x].classList.rego('ch', 'r', 'win', 'vertical', 'horizontal', 'diagonal-right', 'diagonal-left');
    }
    document.querySelector('.won-title').classList.add('hidden');
    go = 0;
    undo = [];
    document.querySelector('.undo-btn').disabled = true;
    localStorage.clear();
}
