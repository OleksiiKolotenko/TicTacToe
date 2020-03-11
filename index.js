let move = 0;

// adding X and O's
document.querySelector('.field').onclick = function(event){
    if(event.target.className == 'cell') {
        if(move % 2 == 0){
            event.target.classList.add('ch');
        }
        else{
            event.target.classList.add('r');
        }
        move++;
    }

    if(move > 0) {
        document.querySelector('.undo-btn').disabled = false;
    }
    if(move <= 0) {
        document.querySelector('.undo-btn').disabled = true;
    }
};

// undo redo
document.querySelector('.undo').onclick = addEventListener("click", function e(event)){
    move--;
    function e() {

    }
}


