'use strict';

function randomizeColor() {
    let numberRed = Math.floor(Math.random() * 256);
    let numberGreen = Math.floor(Math.random() * 256);
    let numberBlue = Math.floor(Math.random() * 256);
    return `rgb(${numberRed},${numberGreen},${numberBlue})`;
}

function retrieveNumber(word) {
    let regex = /\d(\.\d+)?/;
    return word.match(regex)[0];
}

function changeBrightness(brightness) {
    let number = retrieveNumber(brightness);
    let result;
    if (number > 0) {
        number -= 0.1;
        result = `brightness(${number})`;
    }
    else {
        result = brightness;
    }
    return result;
}

function createGrid(number, container) {
    let brightness;
    for (let i = 1; i <= number * number; i++) {
        let div = document.createElement('div');
        div.className = 'grid';
        div.style.width = (960 / number).toString() + "px";
        div.style.height = (960 / number).toString() + "px";
        div.style.filter = "brightness(1)";
        div.addEventListener('mouseover', function (e) {
            e.target.style.backgroundColor = randomizeColor();
            brightness = e.target.style.filter;
            e.target.style.filter = changeBrightness(brightness);
        }, false);
        container.appendChild(div);
    }
    console.log(parseFloat("brightness(1)"));
}

function createFirstGrid(container) {
    window.addEventListener('load', function (e) {
        createGrid(16, container);
    }, false);
}

function removeGrid(container) {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    console.log('I am removed');
}

function testNumber(number) {
    let numberToTest = parseInt(number, 10);
    let result;
    if (numberToTest > 0 && numberToTest <= 100) {
        result = true;
    }
    else {
        result = false;
    }
    return result;
}

function clearGrid(button, container) {
    button.addEventListener('click', function (e) {
        let number = prompt('Number of squares by side');
        if (testNumber(number)) {
            removeGrid(container);
            createGrid(number, container);
        }
        else {
            number = prompt('This must be a number between 1 and 100');
        }
    }, false);
}

let button = document.querySelector('button');
let container = document.querySelector('#container');

createFirstGrid(container);
clearGrid(button, container);


