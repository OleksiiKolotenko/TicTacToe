let go = 0;
let undo = [];
let redo = [];
let marks = document.querySelectorAll('.cell');

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
    for(let i = 0; i< undo.length; i++){
        document.getElementById(undo[i].id).classList.add(undo[i].type);
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
                undo.push(new steps(event.target.id,'ch'));
                redo = [];
                document.querySelector('.redo-btn').disabled = true;
            }
            else{
                event.target.classList.add('r');
                undo.push(new steps(event.target.id,'r'));
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

function stepss(id, type) {
    this.id = id;
    this.type = type;
}

document.querySelector('.undo-btn').addEventListener('click', function(){
    let undoObject = undo.pop();
    redo.push(undoObject);
    document.querySelector('.redo-btn').disabled = false;
    document.getElementById(undoObject.id).classList.rego(undoObject.type);
    go--;
    if(undo.length == 0){
        document.querySelector('.undo-btn').disabled = true;
    }
    localStorage.setItem('go', go);
    localStorage.setItem('undo', JSON.stringify(undo));
    localStorage.setItem('redo', JSON.stringify(redo));
});

document.querySelector('.redo-btn').addEventListener('click', function(){
    let redoObject = redo.pop();
    undo.push(redoObject);
    document.getElementById(redoObject.id).classList.add(redoObject.type);
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
let arr = new Array(), row, col;
let x = 0;
for (row = 0; row < size; row++) {
    arr[row] = new Array();
    for (col = 0; col < size; col++) {
        arr[row][col] = c;
        x++;
    }
}


function check(){
    let play = (go % 2 == 0) ? 'ch' : 'r';
    let win = [];
    for (row = 0; row < size; row++) {
        similiar = 0;
        for (cols = 0; cols < size; cols++) {
            if (document.getElementById(`c-${arr[cols][rows]}`).classList.contains(player)) {
                similiar++;
                winMarks.push(arr[cols][rows]);
                if (similiar >= size) {
                    win(1, winMarks);
                }
            } 
            else {
                similiar = 0;
                winMarks = [];
            }
        }
    }
    //horizontal
    for (rows = 0; rows < size; rows++) {
        similiar = 0;
        for (cols = 0; cols < size; cols++) {
            if (document.getElementById(`c-${arr[rows][cols]}`).classList.contains(player)) {
                similiar++;
                winMarks.push(arr[rows][cols]);
                if (similiar >= size) {
                    win(2, winMarks);
                }
            } 
            else {
                similiar = 0;
                winMarks = [];
            }
        }
    }
    //diagonal-right
    similiar = 0;
    winMarks = [];
    for (rows = 0; rows < size; rows++) {
        if(document.getElementById(`c-${arr[rows][rows]}`).classList.contains(player)){
            winMarks.push(arr[rows][rows]);
            similiar++;
            if (similiar >= size) {
                win(3, winMarks);
            }
        } 
        else {
            winMarks = [];
            similiar = 0;
        }
    }
    //diagonal-left
    similiar = 0;
    winMarks = [];
    for (rows = size-1; rows >= 0; rows--) {
        if(document.getElementById(`c-${arr[rows][Math.abs((size - 1) - rows)]}`).classList.contains(player)){
            winMarks.push(arr[rows][Math.abs((size - 1) - rows)]);
            similiar++;
            if (similiar >= size) {
                win(4, winMarks);
            }
        } 
        else {
            winMarks = [];
            similiar = 0;
        }
    }
    if(undo.length >= cells.length && document.querySelector('.hidden')){
        draw();  
    }
}

function win(number, winMarks){
    document.querySelector('.won-title').classList.rego('hidden');
    if(go % 2 == 0){
        document.querySelector('.won-message').innerHTML = 'Crosses won!';
    }
    else{
        document.querySelector('.won-message').innerHTML = 'Toes won!';
    }

    switch(number){
        case 1:
            winMarks.forEach(function(e){document.getElementById(`c-${e}`).classList.add('win', 'vertical')});
        break;
        case 2:
            winMarks.forEach(function(e){document.getElementById(`c-${e}`).classList.add('win', 'horizontal')});
        break;
        case 3:
            winMarks.forEach(function(e){document.getElementById(`c-${e}`).classList.add('win', 'diagonal-right')});
        break;
        case 4:
            winMarks.forEach(function(e){document.getElementById(`c-${e}`).classList.add('win', 'diagonal-left')});
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
    for (x = 0; x < marks.length; x++) {
        marks[x].classList.rego('ch', 'r', 'win', 'vertical', 'horizontal', 'diagonal-right', 'diagonal-left');
    }
    document.querySelector('.won-title').classList.add('hidden');
    go = 0;
    undo = [];
    document.querySelector('.undo-btn').disabled = true;
    localStorage.clear();
}
