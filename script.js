let fieldLength = null;
let fieldWidth = null;
let emptyСell = null;
let arrElem = null;
let counterTurn = null;

let timer = null;
let sec = 0;
let min = 0;
let hour = 0;



(function DrawMenu() {
    let body = document.getElementsByTagName('body')[0];


    let button_box_menu = document.createElement('div');

    button_box_menu.classList.add('wrapper');
    body.append(button_box_menu);

    let button_start = document.createElement('button');
    button_start.classList.add('button');
    button_start.classList.add('start');
    button_start.innerText = "Начать и перемешать";
    button_box_menu.append(button_start);

    let button_stop = document.createElement('button');
    button_stop.classList.add('button');
    button_stop.innerText = "Стоп";
    button_box_menu.append(button_stop);

    let button_save = document.createElement('button');
    button_save.classList.add('button');
    button_save.innerText = "Сохранить";
    button_box_menu.append(button_save);

    let button_results = document.createElement('button');
    button_results.classList.add('button');
    button_results.innerText = "Результат";
    button_box_menu.append(button_results);

    let size_box_menu = document.createElement('div');
    size_box_menu.classList.add('size-selection');
    body.append(size_box_menu);

    let field_size_min = document.createElement('span');
    field_size_min.classList.add('size');
    field_size_min.innerText = "3x3";
    field_size_min.onclick = () => {
        Draw(3, 3);
        timer && clearInterval(timer)
    };
    size_box_menu.append(field_size_min);

    let field_size_four = document.createElement('span');
    field_size_four.classList.add('size');
    field_size_four.innerText = "4x4";
    field_size_four.onclick = () => {
        Draw(4, 4);
        timer && clearInterval(timer)
    };
    size_box_menu.append(field_size_four);

    let field_size_five = document.createElement('span');
    field_size_five.classList.add('size');
    field_size_five.innerText = "5x5";
    field_size_five.onclick = () => {
        Draw(5, 5);
        timer && clearInterval(timer)

    };
    size_box_menu.append(field_size_five);

    let field_size_six = document.createElement('span');
    field_size_six.classList.add('size');
    field_size_six.innerText = "6x6";
    field_size_six.onclick = () => {
        Draw(6, 6);
        timer && clearInterval(timer)
    };
    size_box_menu.append(field_size_six);

    let field_size_seven = document.createElement('span');
    field_size_seven.classList.add('size');
    field_size_seven.innerText = "7x7";
    field_size_seven.onclick = () => {
        Draw(7, 7);
        timer && clearInterval(timer)
    };
    size_box_menu.append(field_size_seven);

    let field_size_max = document.createElement('span');
    field_size_max.classList.add('size');
    field_size_max.innerText = "8x8";
    field_size_max.onclick = () => {
        Draw(8, 8);
        timer && clearInterval(timer)
    };
    size_box_menu.append(field_size_max);

    let stopwatch = document.createElement('span')
    stopwatch.classList.add('size');
    stopwatch.classList.add('stopwatch');
    stopwatch.onclick = Stopwatch;
    size_box_menu.append(stopwatch);

    let turn = document.createElement('span');
    turn.classList.add('size');
    turn.classList.add('turn');
    turn.innerText = counterTurn;
    size_box_menu.append(turn);
}())


function Draw(length, width) {
    document.getElementsByClassName('start')[0].onclick = () => {
        Draw(length, width)
        InitTick();
    };
    fieldLength = length;
    fieldWidth = width;
    emptyСell = {
        x: fieldLength - 1,
        y: fieldWidth - 1
    }
    let oldTable = document.getElementsByTagName('table');
    if (oldTable.length) {
        oldTable[0].remove();
    }

    let arrNumbersLength = width * length - 1;
    let newArrNumb = [];
    arrElem = newArrNumb;
    for (i = 1; i <= arrNumbersLength; i++) {
        newArrNumb.push(i);
    }
    newArrNumb = ReshuffleArrElements(newArrNumb);

    let counter = 0;
    let table = document.createElement('table');
    table.classList.add('table');
    for (let i = 0; i < width; i++) {
        let row = document.createElement('tr');
        row.classList.add('row');
        for (let j = 0; j < length; j++) {
            let cell = document.createElement('td');
            cell.classList.add('cell');
            cell.onclick = CellClick;
            if (counter < arrNumbersLength) {
                cell.innerHTML = newArrNumb[counter];
            }
            row.append(cell);
            counter++;
        }
        table.append(row);
    }
    document.body.append(table);
}

function ReshuffleArrElements(arrElem) {
    let random;
    let temp;
    for (let i = arrElem.length - 1; i > 0; i--) {
        random = Math.floor(Math.random() * (i + 1));
        temp = arrElem[random];
        arrElem[random] = arrElem[i];
        arrElem[i] = temp;
    }
    return arrElem;
}


function CheckWin() {
    let counter = 1;
    counterTurn = counter;
    for (let i = 0; i < fieldWidth; i++) {
        for (let j = 0; j < fieldLength; j++) {
            let el = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[j];
            if (counter >= fieldWidth * fieldLength) {
                return true;
            }
            if (Number(el.innerText) !== counter) {
                counterTurn++;
                console.log("false")
                return false;
            }
            counter++;
        }
    }
    console.log("true")
    return true;
}


function CellClick(event) {
    let coorXEmptyCell = emptyСell.x;
    let coorYEmptyCell = emptyСell.y;

    let pressedEl = event.target;
    let emptyEl = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[coorYEmptyCell].getElementsByTagName('td')[coorXEmptyCell];
    let pressedCell = {
        x: pressedEl.cellIndex,
        y: pressedEl.parentElement.rowIndex
    }


    function CheckCellsCoordinates(emptyСell, pressedCell) {
        return (pressedCell.y + 1 == emptyСell.y && pressedCell.x == emptyСell.x) ||
            (pressedCell.y - 1 == emptyСell.y && pressedCell.x == emptyСell.x) ||
            (pressedCell.x + 1 == emptyСell.x && pressedCell.y == emptyСell.y) ||
            (pressedCell.x - 1 == emptyСell.x && pressedCell.y == emptyСell.y)
    }

    if (CheckCellsCoordinates(emptyСell, pressedCell)) {

        emptyСell.x = pressedCell.x;
        emptyСell.y = pressedCell.y;

        emptyEl.innerHTML = pressedEl.innerHTML;
        pressedEl.innerHTML = "";
    }

    if (CheckWin()) {
        Victory();
    }
}

function InitTick() {
    timer && clearInterval(timer);
    sec = 0;
    min = 0;
    hour = 0;
    timer = setInterval(Stopwatch, 1000);
}

function Stopwatch() {
    sec++;
    if (sec >= 60) {
        min++;
        sec = sec - 60;
    }

    if (min >= 60) {
        hour++;
        min -= 60;
    }

    if (sec < 10) {
        if (min < 10) {
            if (hour < 10) {
                document.getElementsByClassName('stopwatch')[0].innerHTML = '0' + hour + ':0' + min + ':0' + sec;
            } else {
                document.getElementsByClassName('stopwatch')[0].innerHTML = hour + ':0' + min + ':0' + sec;
            }
        } else {
            if (hour < 10) {
                document.getElementsByClassName('stopwatch')[0].innerHTML = '0' + hour + ':' + min + ':0' + sec;
            } else {
                document.getElementsByClassName('stopwatch')[0].innerHTML = hour + ':' + min + ':0' + sec;
            }
        }
    } else {
        if (min < 10) {
            if (hour < 10) {
                document.getElementsByClassName('stopwatch')[0].innerHTML = '0' + hour + ':0' + min + ':' + sec;
            } else {
                document.getElementsByClassName('stopwatch')[0].innerHTML = hour + ':0' + min + ':' + sec;
            }
        } else {
            if (hour < 10) {
                document.getElementsByClassName('stopwatch')[0].innerHTML = '0' + hour + ':' + min + ':' + sec;
            } else {
                document.getElementsByClassName('stopwatch')[0].innerHTML = hour + ':' + min + ':' + sec;
            }
        }
    }
}

function Victory() {
    timer && clearInterval(timer);
    let userName = prompt("Введите ваше имя");
    let playTime = document.getElementsByClassName('stopwatch')[0].innerHTML;
    alert(`Ура! игра завершена! ${userName} завершил игру за ${playTime}`)
}
